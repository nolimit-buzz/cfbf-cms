const sharp = require('sharp');
const dir = 'C:/Users/HomePC/AppData/Local/Temp/claude/c--Users-HomePC-Documents-Projects-climate-facility/38409115-35e7-438d-bf61-efbc4b5c4f7f/scratchpad/logo-check';
(async () => {
  const big = await sharp(dir + '/afdb-candidate.svg', { density: 600 }).png().toBuffer();
  const meta = await sharp(big).metadata();
  const halfW = Math.floor(meta.width / 2);
  await sharp(big).extract({ left: 0, top: 0, width: halfW, height: meta.height }).trim().toFile(dir + '/afdb-cropped.png');
  console.log('done', meta.width, meta.height);
})();
