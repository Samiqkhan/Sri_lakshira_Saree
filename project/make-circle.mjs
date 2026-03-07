import sharp from 'sharp';

async function makeCircleFavicon() {
  try {
    const size = 512;
    const circleSvg = `<svg width="${size}" height="${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="white" />
    </svg>`;

    const imageBuffer = await sharp('public/images/logo.webp')
      .resize(size, size, { fit: 'cover' })
      .composite([{
        input: Buffer.from(circleSvg),
        blend: 'dest-in'
      }])
      .webp()
      .toFile('public/images/favicon-circle.webp');

    console.log('Successfully created circular favicon.');
  } catch (err) {
    console.error('Error creating circular favicon:', err);
  }
}

makeCircleFavicon();
