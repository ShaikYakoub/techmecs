// Cloudflare Pages Function
type PagesFunctionContext = {
  request: Request;
  env: { ASSETS: { fetch: (req: Request) => Promise<Response> } };
  next: () => Promise<Response>;
};

export const onRequest = async (context: PagesFunctionContext): Promise<Response> => {
  const url = new URL(context.request.url);

  // 1. Rewrite module alias
  if (url.pathname.startsWith('/sites/650ovdcXNrUyveRRfGW8Ip/')) {
    const rewrittenPath = url.pathname.replace('/sites/650ovdcXNrUyveRRfGW8Ip/', '/modules/');
    return context.env.ASSETS.fetch(new Request(new URL(rewrittenPath, url.origin), context.request));
  }

  // 2. Handle CMS range queries on .framercms files
  const rangeParam = url.searchParams.get('range');
  if (url.pathname.startsWith('/cms/') && rangeParam) {
    const assetResponse = await context.env.ASSETS.fetch(new Request(new URL(url.pathname, url.origin)));
    if (!assetResponse.ok) {
      return assetResponse;
    }

    const arrayBuffer = await assetResponse.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);

    const ranges = rangeParam.split(',');
    const chunks: Uint8Array[] = [];
    let totalLength = 0;

    for (const r of ranges) {
      const parts = r.trim().split('-');
      if (parts.length === 2) {
        const start = parseInt(parts[0], 10);
        const end = parseInt(parts[1], 10);
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          const chunk = data.subarray(start, end + 1);
          chunks.push(chunk);
          totalLength += chunk.length;
        }
      }
    }

    if (chunks.length > 0) {
      const merged = new Uint8Array(totalLength);
      let offset = 0;
      for (const c of chunks) {
        merged.set(c, offset);
        offset += c.length;
      }

      return new Response(merged, {
        status: 200,
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Length': totalLength.toString(),
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }
  }

  // 3. Default passthrough
  return context.next();
};
