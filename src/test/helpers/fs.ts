import {
  FileSystem,
  readFile,
  writeFile,
  readdir,
  access,
  constants,
} from "../../filesystem";

export type MemoryFS = Record<string, string>;

export class TestFS implements FileSystem {

  constructor (
    public files: MemoryFS = {}
  ) {}

  public readFile: readFile = async (path) => {
    const strPath = path as string;
    if (!this.files[strPath]) throw new Error(`No such file ${strPath}`);
    return this.files[strPath] as any;
  };
  public writeFile: writeFile = async (path, data) => {
    const strPath = path as string;
    const strData = data as string;
    this.files[strPath] = strData;
  };
  public readdir: readdir = async (path) => {
    const strPath = path as string;
    const dirents = Object.keys(this.files)
      .filter(path => path.startsWith(strPath))
      .map(path => path.split('/')[0]);
    return dirents as any;
  };
  public access: access = async (path) => {
    const strPath = path as string;
    if (!this.files[strPath]) {
      throw new Error(`No such file or directory ${strPath}`);
    }
  };
  public constants? = undefined;

}