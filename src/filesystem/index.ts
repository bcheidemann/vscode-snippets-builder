import fsPromises from 'fs/promises';
import fs from 'fs';

export type readFile = typeof fsPromises.readFile;
export type writeFile = typeof fsPromises.writeFile;
export type readdir = typeof fsPromises.readdir;
export type access = typeof fsPromises.access;
export type constants = typeof fs.constants;

export interface FileSystem {
  readFile: readFile;
  writeFile: writeFile;
  readdir: readdir;
  access: access;
  constants?: constants;
}
