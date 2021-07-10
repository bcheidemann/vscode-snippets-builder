import { FileSystem } from "./filesystem";
import { resolve, join } from "path";
import { constants } from 'fs';

const SNIPPETS_EXTENSION = ".code-snippets";

export enum Verbosity {
  NONE,
  ERRORS_ONLY,
  WARNINGS_ONLY,
  ALL,
}

export interface ISnippetsBuilderOptions {
  fs: FileSystem;
  srcDir: string;
  outFile?: string;
  verbosity?: Verbosity;
}

export class SnippetsBuilder {
  constructor(private options: ISnippetsBuilderOptions) {
    // Set default verbosity
    if (this.options.verbosity === undefined)
      this.options.verbosity = Verbosity.ALL;

    // Resolve the srcDir
    this.options.srcDir = resolve(this.options.srcDir);

    // If no outFile is provided, use the default
    if (!this.options.outFile)
      this.options.outFile = `./output${SNIPPETS_EXTENSION}`;
    // Warn if outFile is missing the snippets extension
    else if (!this.options.outFile.startsWith(SNIPPETS_EXTENSION)) {
      this.warn(
        `WARNING: outFile is missing or has the wrong file extension. Did you mean ${
          this.options.outFile + SNIPPETS_EXTENSION
        }`
      );
    }

    // Resolve the outFile
    this.options.outFile = resolve(this.options.outFile);
  }

  /**
   * Returns the verbocity level
   */
  private get verbocity(): Verbosity {
    return this.options.verbosity as Verbosity;
  }

  /**
   * Logs messages if the verbocity level permitts logging of messages
   */
  private message(...message: any[]) {
    if (this.verbocity > Verbosity.WARNINGS_ONLY) {
      console.log(...message);
    }
  }

  /**
   * Logs warnings if the verbocity level permits logging of warnings
   */
  private warn(...warning: any[]) {
    if (this.verbocity > Verbosity.ERRORS_ONLY) {
      console.warn(...warning);
    }
  }

  /**
   * Logs errors if the verbocity level permitts logging of errors
   */
  private error(...error: any[]) {
    if (this.verbocity > Verbosity.NONE) {
      console.error(...error);
    }
  }

  /**
   * Checks if a file or folder exists
   */
  private async canAccess(path: string, mode: number): Promise<[boolean, any | null]> {
    try {
      await this.options.fs.access(path, mode);
      return [true, null];
    }
    catch (err) {
      return [false, err];
    }
  }

  public async build() {
    
  }
}
