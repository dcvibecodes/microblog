const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const svgPath = path.join(publicDir, 'icon.svg');

async function generate() {
    let sharp;
    try {
        sharp = require('sharp');
    } catch (e) {
        console.log('sharp is not installed. Install it with: npm install sharp');
        console.log('Or open generate-icons.html in a browser to download PNG icons manually.');
        process.exit(1);
    }

    const svgBuffer = fs.readFileSync(svgPath);

    const sizes = [
        { name: 'icon-512.png', size: 512 },
        { name: 'icon-192.png', size: 192 },
        { name: 'apple-touch-icon.png', size: 180 },
        { name: 'favicon-32.png', size: 32 },
        { name: 'favicon-16.png', size: 16 }
    ];

    for (const { name, size } of sizes) {
        await sharp(svgBuffer)
            .resize(size, size)
            .png()
            .toFile(path.join(publicDir, name));
        console.log(`Created ${name} (${size}x${size})`);
    }

    console.log('\nAll PNG icons generated in public/');
}

generate().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
