const DIRNAME_POSIX_REGEX = /^((?:\.(?![^\/]))|(?:(?:\/?|)(?:[\s\S]*?)))(?:\/+?|)(?:(?:\.{1,2}|[^\/]+?|)(?:\.[^.\/]*|))(?:[\/]*)$/;
const DIRNAME_WIN32_REGEX = /^((?:\.(?![^\\]))|(?:(?:\\?|)(?:[\s\S]*?)))(?:\\+?|)(?:(?:\.{1,2}|[^\\]+?|)(?:\.[^.\\]*|))(?:[\\]*)$/;
const EXTRACT_PATH_REGEX = /(?<path>[^\(\s]+):[0-9]+:[0-9]+/;
const WIN_POSIX_DRIVE_REGEX = /^\/[A-Z]:\/*/;

const pathDirname = (path: string) => {
  
  let dirname = DIRNAME_POSIX_REGEX.exec(path)?.[1];

  if (!dirname) {
    dirname = DIRNAME_WIN32_REGEX.exec(path)?.[1];
  }

  if(!dirname) {
    throw new Error(`Can't extract dirname from ${path}`);
  }

  return dirname;
}

/**
 * CJS and ESM compatible implementation for __dirname.
 * 
 * Works on
 * * Node.js + Windows / Linux / MacOS + ESM / CJS
 * 
 * Contributions for other environments like GJS or Deno are welcome
 * 
 * @returns What `__dirname` would return in CJS
 */
export const dirname = () => {

  let dirname = '';
  try {
    throw new Error();
  } catch (e: any) {
    const initiator = e.stack.split('\n').slice(2, 3)[0]

    let path = EXTRACT_PATH_REGEX.exec(initiator)?.groups?.path

    if(!path) {
      throw new Error("Can't get __dirname!");
    }

    const protocol = "file://";
    if (path.indexOf(protocol) >= 0) {
      path = path.slice(protocol.length);
    }

    if (WIN_POSIX_DRIVE_REGEX.test(path)) {
      path = path.slice(1).replace(/\//g, '\\');
    }

    dirname = pathDirname(path)

  }
  return dirname
}

export default dirname;

// Default export for CJS
// @ts-ignore
export = dirname;