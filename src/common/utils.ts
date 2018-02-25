import fs, { exists, writeFile } from 'fs';
import path from 'path';

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
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
  }
}

export function getRootFolder(suffixPath: string) {
  const rootPath = getUserHome('/Documents/Timetrack2');
  const finalPath = path.join(rootPath, suffixPath);
  ensureDirectoryExistence(finalPath);
  return finalPath;
}

export async function touchFile(filePath: string, content: any = null) {
  return new Promise((res, rej) => {
    exists(filePath, (fileExists) => {
      if (fileExists) {
        res();
      } else {
        writeFile(filePath, content, (err) => {
          if (err) {
            rej(err);
          }
          res();
        });
      }
    });
  });
}

export const PATHS = {
  settingsFile: getRootFolder('settings.json'),
  dataPath: getRootFolder('/data/'),
};
