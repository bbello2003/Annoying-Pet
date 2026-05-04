import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const ASSETS_DIR = './src/assets';

function getAllPngs(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...getAllPngs(full));
    } else if (extname(entry).toLowerCase() === '.png') {
      results.push(full);
    }
  }
  return results;
}

const files = getAllPngs(ASSETS_DIR);
console.log(`Found ${files.length} PNG files. Converting...`);

let converted = 0;
for (const file of files) {
  const outFile = file.replace(/\.png$/i, '.webp');
  await sharp(file).webp({ quality: 85 }).toFile(outFile);
  converted++;
  if (converted % 20 === 0) console.log(`  ${converted}/${files.length}...`);
}

console.log(`Done. Converted ${converted} files to WebP.`);
