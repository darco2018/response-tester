/** @format */
const utils = require("./utils");

const wrongDir = "assets";
const correctDir = "..";
const file = `dist/${wrongDir}/css/index.css`;
console.log(`Fixing relative path of background image in ${file}`);
utils.replaceInFile(
  file,
  wrongDir,
  correctDir,
  `Successfully replaced background:url(${wrongDir}/img/ with background:url(${correctDir}/img/  in  ${file}`
);
