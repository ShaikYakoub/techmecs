const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, 'public', 'images');
const FONTS_DIR = path.join(__dirname, 'public', 'fonts');

fs.mkdirSync(IMAGES_DIR, { recursive: true });
fs.mkdirSync(FONTS_DIR, { recursive: true });

// List of all images from cohesion.framer.ai
const imageURLs = [
  "https://framerusercontent.com/images/um3bxT2WVFF4kr6enjXB8pntPlo.svg",
  "https://framerusercontent.com/images/lWoxjUfzID4I2CJ2EAGpp1BxXk.svg",
  "https://framerusercontent.com/images/LtSGTHttO0ZpuCVLNu4mPIpOuk.svg",
  "https://framerusercontent.com/images/CVICQI4s8tTiJBrNEN8nOXCzdK0.png",
  "https://framerusercontent.com/images/0f09LEy6qZK1Y9gL9T6AG622ZZ8.png",
  "https://framerusercontent.com/images/m3YA9HpmQG8c9ThSe5XusCzYw.png",
  "https://framerusercontent.com/images/lZLqIoLGAjMHHOlhOwugYSASrjc.png",
  "https://framerusercontent.com/images/l1KkpEI9tJzqQPgJDNKytRuxgeI.png",
  "https://framerusercontent.com/images/LUkmo3gFVQOfp5kvltA05Mc6K4.png",
  "https://framerusercontent.com/images/jaVohrUAKzleX6rjxEEOPrqeysw.png",
  "https://framerusercontent.com/images/53osOsH2OP7bAyFNQKbXOVwk.png",
  "https://framerusercontent.com/images/en9G6oaN8j6IT8H0gpgIS69gXg4.png",
  "https://framerusercontent.com/images/21y9kg3DMhOUBxbQ3y9CwHNPQO8.png",
  "https://framerusercontent.com/images/2JNdM2O0RnZg1BcZHNgDWoMrhKA.png",
  "https://framerusercontent.com/images/lQFJ89Y2vFBRt0WU8OFpJ3ZkPlA.png",
  "https://framerusercontent.com/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg",
  "https://framerusercontent.com/images/11KSGbIZoRSg4pjdnUoif6MKHI.svg",
  "https://framerusercontent.com/images/tLJlDufDxfRWX3e1UyLWQODdOaw.png",
  "https://framerusercontent.com/images/nSf6ya4FcQ5iCpFIBAboozmlgzA.png",
  "https://framerusercontent.com/images/fbDdTEyddMlUKyioryX3T3M3I.png",
  "https://framerusercontent.com/images/un1NlasO4xdJ3ogUjNzC5U3NsU.png",
  "https://framerusercontent.com/images/gshDWTLuPfNPn8ZUFpq49jhvIPk.png",
  "https://framerusercontent.com/images/2YMs3TUoFSk6OAJu3tquJSjY.png",
  "https://framerusercontent.com/images/eiTxkfpr6msnt5xKhves6aFLlTw.png",
  "https://framerusercontent.com/images/YnQwe4Efg37DiOr8IRYEfPzKE.png",
  "https://framerusercontent.com/images/snuvetWlg8kNNuH4rBY2aSQch5c.png",
  "https://framerusercontent.com/images/3YQ5k1hZdNkPRgquxbSfEunCE.png",
  "https://framerusercontent.com/images/5PoEhJTKleU3AaFM5T9aYtiqo.png",
  "https://framerusercontent.com/images/7Xrs4S6qdC6EyvyrM1EGw533im4.png",
  "https://framerusercontent.com/images/DzPnpdhCpUNilUZXTT2OZOvumWA.png",
  "https://framerusercontent.com/images/eZQ1X1Fpw11apl285CIeN8iEVI.png",
  "https://framerusercontent.com/images/pwnBF4uZrCSugu0a8ZiDdaD4A4.png",
  "https://framerusercontent.com/images/UFfz36PjDofFGqSVyD7dxLp6G4M.png",
  "https://framerusercontent.com/images/LAZePzksNGsqwC1vEotMzZH3EdE.png",
  "https://framerusercontent.com/images/JeMGptNvDtMI6CES89lQ0yjQ40.png",
  "https://framerusercontent.com/images/IJyQj0yIema8tFABogHMDHcP6M.png",
  "https://framerusercontent.com/images/eCX2l5CSlTjb9d7xevX1VTxpwWc.svg",
  "https://framerusercontent.com/images/CPPcnkZMxilv14OS93Qs7hyovnU.png",
  "https://framerusercontent.com/images/YYNAY2NX1AQEurN4JkOTy8TcZJw.png",
  "https://framerusercontent.com/images/lpBCQr5W4Ewj19l58acLZ2k3I4.png"
];

// List of all fonts
const fontURLs = [
  "https://fonts.gstatic.com/s/onest/v11/gNMZW3F-SZuj7zOT0IfSjTS16cPh9R-ptRtN.woff2",
  "https://fonts.gstatic.com/s/onest/v11/gNMZW3F-SZuj7zOT0IfSjTS16cPh9R-puxtNcWU.woff2",
  "https://fonts.gstatic.com/s/onest/v11/gNMZW3F-SZuj7zOT0IfSjTS16cPh9R-puBtNcWU.woff2",
  "https://fonts.gstatic.com/s/onest/v11/gNMZW3F-SZuj7zOT0IfSjTS16cPh9R-psRtNcWU.woff2",
  "https://fonts.gstatic.com/s/ptserif/v19/EJRQQgYoZZY2vCFuvAFT9gaQZynfoA.woff2",
  "https://fonts.gstatic.com/s/ptserif/v19/EJRQQgYoZZY2vCFuvAFT9gaQZyffoPNB.woff2",
  "https://fonts.gstatic.com/s/publicsans/v21/ijwRs572Xtc6ZYQws9YVwnNGfJ4.woff2",
  "https://fonts.gstatic.com/s/publicsans/v21/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuv56JxAco.woff2",
  "https://fonts.gstatic.com/s/publicsans/v21/ijwTs572Xtc6ZYQws9YVwnNDTJzaxw.woff2",
  "https://fonts.gstatic.com/s/publicsans/v21/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tr4hzcqd1s.woff2",
  "https://framerusercontent.com/third-party-assets/fontshare/wf/KEZHVBA7K5W2AK35YD2Q332ZH6JJYKPI/YSSJL3FZ55BIRNOPQ7IG2MVJBJEXVSQ4/4QGWO2XSJ47NHK4SEA7ZMAX2NY3M6FUV.woff2",
  "https://framerusercontent.com/assets/GrgcKwrN6d3Uz8EwcLHZxwEfC4.woff2",
  "https://framerusercontent.com/assets/UjlFhCnUjxhNfep4oYBPqnEssyo.woff2",
  "https://framerusercontent.com/assets/syRNPWzAMIrcJ3wIlPIP43KjQs.woff2",
  "https://app.framerstatic.com/Inter-Regular.latin-JLQMKCHE.woff2"
];

async function downloadAll() {
  console.log('--- Downloading Images ---');
  for (const url of imageURLs) {
    const filename = path.basename(url.split('?')[0]);
    const dest = path.join(IMAGES_DIR, filename);
    if (!fs.existsSync(dest)) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
          console.log(`Saved image: ${filename}`);
        }
      } catch (e) {
        console.error(`Failed ${url}:`, e.message);
      }
    }
  }

  console.log('--- Downloading Fonts ---');
  for (const url of fontURLs) {
    const filename = path.basename(url.split('?')[0]);
    const dest = path.join(FONTS_DIR, filename);
    if (!fs.existsSync(dest)) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
          console.log(`Saved font: ${filename}`);
        }
      } catch (e) {
        console.error(`Failed ${url}:`, e.message);
      }
    }
  }
  console.log('Assets download completed.');
}

downloadAll().catch(console.error);
