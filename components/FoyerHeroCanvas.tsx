'use client';

import React, { useEffect, useRef, useState } from 'react';

interface FoyerHeroCanvasProps {
  imageSrc?: string;
}

export default function FoyerHeroCanvas({
  imageSrc = '/images/foyer/hero.png',
}: FoyerHeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [glReady, setGlReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext('webgl2', { alpha: false, antialias: true }) as WebGL2RenderingContext) ||
      (canvas.getContext('webgl', { alpha: false, antialias: true }) as WebGLRenderingContext);

    if (!gl) return;

    let animId: number;
    let isDestroyed = false;

    // Vertex Shader
    const vsSource = `#version 300 es
    in vec2 a_position;
    out vec2 v_uv;
    void main() {
      v_uv = (a_position + 1.0) * 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }`;

    // Fragment Shader with Cover Fit, Ambient Wave, Mouse Trail, Click Shockwaves & Chromatic Dispersion
    const fsSource = `#version 300 es
    precision highp float;

    in vec2 v_uv;
    out vec4 fragColor;

    uniform sampler2D u_texture;
    uniform vec2 u_resolution;
    uniform vec2 u_imageSize;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform float u_mouseSpeed;
    uniform vec4 u_ripples[6]; // x, y, startTime, strength
    uniform float u_dispersion;

    vec2 coverFit(vec2 uv) {
      vec2 flipped = vec2(uv.x, 1.0 - uv.y);
      vec2 ratio = u_resolution / u_imageSize;
      float maxRatio = max(ratio.x, ratio.y);
      return (flipped - 0.5) * (ratio / maxRatio) + 0.5;
    }

    void main() {
      vec2 uv = v_uv;
      vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);

      // 1. Ambient gentle organic breathing
      vec2 ambientWave = vec2(
        sin(uv.y * 5.0 + u_time * 0.9) * 0.002,
        cos(uv.x * 4.0 + u_time * 0.7) * 0.002
      );

      // 2. Mouse proximity ripple / wake
      vec2 mouseDiff = (uv - u_mouse) * aspect;
      float mouseDist = length(mouseDiff);
      float mouseInfluence = smoothstep(0.35, 0.0, mouseDist);
      vec2 mouseOffset = vec2(0.0);
      if (mouseDist > 0.001) {
        vec2 dir = normalize(mouseDiff);
        float wave = sin(mouseDist * 28.0 - u_time * 4.0);
        mouseOffset = dir * wave * mouseInfluence * (0.004 + u_mouseSpeed * 0.012);
      }

      // 3. Click ripples (expanding rings)
      vec2 clickOffset = vec2(0.0);
      for (int i = 0; i < 6; i++) {
        vec4 r = u_ripples[i];
        float age = u_time - r.z;
        if (age > 0.0 && age < 2.5) {
          vec2 rDiff = (uv - r.xy) * aspect;
          float d = length(rDiff);
          float progress = age * 0.65;
          float ringDist = abs(d - progress);
          float envelope = exp(-ringDist * 32.0);
          float fade = 1.0 - smoothstep(0.0, 2.5, age);
          if (d > 0.0001) {
            vec2 rDir = normalize(rDiff);
            float wave = cos(d * 40.0 - age * 16.0);
            clickOffset += rDir * wave * envelope * fade * (r.w * 0.025);
          }
        }
      }

      vec2 totalOffset = ambientWave + mouseOffset + clickOffset;

      // Chromatic dispersion (RGB wavelength split)
      vec2 offR = totalOffset * (1.0 + u_dispersion * 0.6);
      vec2 offG = totalOffset;
      vec2 offB = totalOffset * (1.0 - u_dispersion * 0.6);

      vec2 uvR = clamp(coverFit(uv + offR), 0.0, 1.0);
      vec2 uvG = clamp(coverFit(uv + offG), 0.0, 1.0);
      vec2 uvB = clamp(coverFit(uv + offB), 0.0, 1.0);

      float r = texture(u_texture, uvR).r;
      float g = texture(u_texture, uvG).g;
      float b = texture(u_texture, uvB).b;

      fragColor = vec4(r, g, b, 1.0);
    }`;

    function createShader(type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('Shader compile failed:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('Program link failed:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResLoc = gl.getUniformLocation(program, 'u_resolution');
    const uImgSizeLoc = gl.getUniformLocation(program, 'u_imageSize');
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const uMouseSpeedLoc = gl.getUniformLocation(program, 'u_mouseSpeed');
    const uRipplesLoc = gl.getUniformLocation(program, 'u_ripples');
    const uDispersionLoc = gl.getUniformLocation(program, 'u_dispersion');

    // Texture
    const texture = gl.createTexture();
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageSrc;

    let imgWidth = 960;
    let imgHeight = 1200;

    image.onload = () => {
      if (isDestroyed) return;
      imgWidth = image.naturalWidth || 960;
      imgHeight = image.naturalHeight || 1200;

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      setGlReady(true);
    };

    // State
    const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, speed: 0, lastX: 0.5, lastY: 0.5 };
    const ripples: { x: number; y: number; time: number; strength: number }[] = [];
    let rippleIndex = 0;

    for (let i = 0; i < 6; i++) {
      ripples.push({ x: 0, y: 0, time: -100, strength: 0 });
    }

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      mouse.targetX = Math.max(0, Math.min(1, x));
      mouse.targetY = Math.max(0, Math.min(1, 1.0 - y)); // webgl y-flip
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;

      ripples[rippleIndex] = {
        x,
        y,
        time: performance.now() * 0.001,
        strength: 1.0,
      };
      rippleIndex = (rippleIndex + 1) % 6;
    };

    window.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('click', handleClick);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const startTime = performance.now();

    const render = () => {
      if (isDestroyed) return;

      const currentTime = (performance.now() - startTime) * 0.001;

      // Mouse smoothing & speed
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const dx = mouse.targetX - mouse.lastX;
      const dy = mouse.targetY - mouse.lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      mouse.speed = mouse.speed * 0.88 + dist * 0.12;
      mouse.lastX = mouse.targetX;
      mouse.lastY = mouse.targetY;

      gl.useProgram(program);

      gl.uniform2f(uResLoc, canvas.width, canvas.height);
      gl.uniform2f(uImgSizeLoc, imgWidth, imgHeight);
      gl.uniform1f(uTimeLoc, currentTime);
      gl.uniform2f(uMouseLoc, mouse.x, mouse.y);
      gl.uniform1f(uMouseSpeedLoc, Math.min(mouse.speed * 10, 1.5));
      gl.uniform1f(uDispersionLoc, 0.55);

      // Pack ripples: 6 * 4 floats
      const rippleData = new Float32Array(24);
      for (let i = 0; i < 6; i++) {
        rippleData[i * 4 + 0] = ripples[i].x;
        rippleData[i * 4 + 1] = ripples[i].y;
        rippleData[i * 4 + 2] = ripples[i].time;
        rippleData[i * 4 + 3] = ripples[i].strength;
      }
      gl.uniform4fv(uRipplesLoc, rippleData);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleClick);

      if (texture) gl.deleteTexture(texture);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (program) gl.deleteProgram(program);
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
    };
  }, [imageSrc]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Background Static Image (instant sharp render) */}
      <img
        src={imageSrc}
        alt="Visual editorial artwork"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: glReady ? 0 : 1,
          transition: 'opacity 0.6s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Interactive WebGL Ripple Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          opacity: glReady ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      />
    </div>
  );
}
