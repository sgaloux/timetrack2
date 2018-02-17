import path from 'path';

export function getUserHome(suffixPath: string) {
  let p;
  if (process.platform === 'win32') {
    p = process.env.USERPROFILE;
  } else {
    p = process.env.HOME;
  }
  return path.join(p!, suffixPath);
}
