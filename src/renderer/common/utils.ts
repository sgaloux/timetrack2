import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import convert from 'xml-js';

export const readFilePromisified = promisify(fs.readFile);
export const writeFilePromisified = promisify(fs.writeFile);

function getUserHome(suffixPath: string) {
  let p;
  if (process.platform === 'win32') {
    p = process.env.USERPROFILE;
  } else {
    p = process.env.HOME;
  }
  return path.join(p!, suffixPath);
}

function ensureDirectoryExistence(filePath: string) {
  let dirname = path.dirname(filePath);
  if (filePath.endsWith('/')) {
    dirname = filePath;
  }
  if (!fs.existsSync(dirname)) {
    if (!filePath.endsWith('/')) {
      ensureDirectoryExistence(dirname);
    }
    fs.mkdirSync(dirname);
  }
}

export function getRootFolder(suffixPath: string) {
  const rootPath = getUserHome('/Documents/Timetrack2');
  const finalPath = path.join(rootPath, suffixPath);
  ensureDirectoryExistence(finalPath);
  return finalPath;
}

export function convertXmlToJs(input: string) {
  return convert.xml2js(input, { compact: true, alwaysArray: true });
}

export const PATHS = {
  settingsFile: getRootFolder('settings.json'),
  dataPath: getRootFolder('/data/'),
  inflowTypesFile: getRootFolder('inflowTypes.json'),
  inflowNodesFile: getRootFolder('inflowNodes.json'),
};
