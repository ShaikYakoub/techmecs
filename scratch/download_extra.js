const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, 'public', 'images');
const FONTS_DIR = path.join(__dirname, 'public', 'fonts');
const MODULES_DIR = path.join(__dirname, 'public', 'modules');

const extraUrls = [
  "https://framerusercontent.com/images/LalpL607BiNxggcZ7QE3ZWQD5k.png",
  "https://framerusercontent.com/images/in8RtVYFPreOsUIEv6PjCRtQjk.png",
  "https://framerusercontent.com/images/XNKUBYWXrvpOQSLGsp9xsVbkQi0.png",
  "https://framerusercontent.com/images/3MKKyEDflFaSgbZ67UPmQfPV4U.svg",
  "https://framerusercontent.com/images/SEjko8sFzkZhR9ADnVem4dTbY0A.jpg",
  "https://framerusercontent.com/assets/eCX2l5CSlTjb9d7xevX1VTxpwWc.svg",
  "https://framerusercontent.com/assets/YYNAY2NX1AQEurN4JkOTy8TcZJw.png",
  "https://fonts.gstatic.com/s/publicsans/v21/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuJJm5xg0pX189fg.woff2",
  "https://fonts.gstatic.com/s/ptserif/v19/EJRQQgYoZZY2vCFuvAFT9gaQVyvVocNB6Iw.woff2",
  "https://framerusercontent.com/assets/5A3Ce6C9YYmCjpQx9M4inSaKU.woff2",
  "https://framerusercontent.com/assets/Qx95Xyt0Ka3SGhinnbXIGpEIyP4.woff2",
  "https://framerusercontent.com/assets/6mJuEAguuIuMog10gGvH5d3cl8.woff2",
  "https://framerusercontent.com/assets/xYYWaj7wCU5zSQH0eXvSaS19wo.woff2",
  "https://framerusercontent.com/assets/otTaNuNpVK4RbdlT7zDDdKvQBA.woff2",
  "https://framerusercontent.com/assets/DolVirEGb34pEXEp8t8FQBSK4.woff2",
  "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZ1rib2Bg-4.woff2",
  "https://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuJJm5xg0pX189fg.woff2",
  "https://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tpjgAcofVotfj7j.woff2",
  "https://fonts.gstatic.com/s/publicsans/v21/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymu8Z65xg0pX189fg.woff2",
  "https://framerusercontent.com/assets/vQyevYAyHtARFwPqUzQGpnDs.woff2",
  "https://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuv565xg0pX189fg.woff2",
  "https://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tr4hwcofVotfj7j.woff2",
  "https://framerusercontent.com/third-party-assets/fontshare/wf/C4UT54A5XYGOEXZXAWM5XZNSNM3VVMLH/3U7UJWG6VPA6HDJ62L5CSBBRUCTTHG3I/HUT36TIUMR6VZ6YKKXYTFW2QSMCKUXF4.woff2",
  "https://framerusercontent.com/third-party-assets/fontshare/wf/6F623VDCXKIQWJDOOR7MUU7C355VFFY6/WWG3CY5KG34AQBVN2OUAUHXNRTL47AVA/GDKOTCZ4SQDPR75LBVP7JSLM3MDN6HE6.woff2",
  "https://framerusercontent.com/assets/H89BbHkbHDzlxZzxi8uPzTsp90.woff2",
  "https://framerusercontent.com/assets/u6gJwDuwB143kpNK1T1MDKDWkMc.woff2",
  "https://framerusercontent.com/assets/43sJ6MfOPh1LCJt46OvyDuSbA6o.woff2",
  "https://framerusercontent.com/assets/wccHG0r4gBDAIRhfHiOlq6oEkqw.woff2",
  "https://framerusercontent.com/assets/WZ367JPwf9bRW6LdTHN8rXgSjw.woff2",
  "https://framerusercontent.com/assets/ia3uin3hQWqDrVloC1zEtYHWw.woff2",
  "https://framerusercontent.com/assets/2A4Xx7CngadFGlVV4xrO06OBHY.woff2",
  "https://framerusercontent.com/assets/CfMzU8w2e7tHgF4T4rATMPuWosA.woff2",
  "https://framerusercontent.com/assets/867QObYax8ANsfX4TGEVU9YiCM.woff2",
  "https://framerusercontent.com/assets/Oyn2ZbENFdnW7mt2Lzjk1h9Zb9k.woff2",
  "https://framerusercontent.com/assets/cdAe8hgZ1cMyLu9g005pAW3xMo.woff2",
  "https://framerusercontent.com/assets/DOfvtmE1UplCq161m6Hj8CSQYg.woff2",
  "https://framerusercontent.com/assets/pKRFNWFoZl77qYCAIp84lN1h944.woff2",
  "https://framerusercontent.com/assets/tKtBcDnBMevsEEJKdNGhhkLzYo.woff2",
  "https://fonts.gstatic.com/s/publicsans/v21/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuFpm5xg0pX189fg.woff2",
  "https://fonts.gstatic.com/s/onest/v9/gNMZW3F-SZuj7zOT0IfSjTS16cPh9R-ZtxFMQWXgSQ.woff2",
  "https://framerusercontent.com/modules/Tgc1wN37SYAeRtlZBafw/LGvl8nNt6Onc5mJDFpJW/kOgwlcBkr.js",
  "https://framerusercontent.com/modules/gdG40nRjwoAUVkWVzXF8/VJDOvfKks6MRrWPJrRAE/T0aOdsSzY.js"
];

async function run() {
  for (const url of extraUrls) {
    const filename = path.basename(url.split('?')[0]);
    let targetDir = IMAGES_DIR;
    if (url.includes('.woff2')) targetDir = FONTS_DIR;
    else if (url.endsWith('.js') || url.endsWith('.mjs')) targetDir = MODULES_DIR;

    const dest = path.join(targetDir, filename);
    if (!fs.existsSync(dest)) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
          console.log(`Saved: ${filename}`);
        } else {
          console.warn(`Status ${res.status} for ${url}`);
        }
      } catch (e) {
        console.error(`Failed ${url}:`, e.message);
      }
    }
  }
  console.log('Extra assets downloaded.');
}

run().catch(console.error);
