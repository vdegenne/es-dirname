const DIRNAME_POSIX_REGEX = /^((?:\.(?![^\/]))|(?:(?:\/?|)(?:[\s\S]*?)))(?:\/+?|)(?:(?:\.{1,2}|[^\/]+?|)(?:\.[^.\/]*|))(?:[\/]*)$/;
const DIRNAME_WIN32_REGEX = /^((?:\.(?![^\\]))|(?:(?:\\?|)(?:[\s\S]*?)))(?:\\+?|)(?:(?:\.{1,2}|[^\\]+?|)(?:\.[^.\\]*|))(?:[\\]*)$/;
const NODE_EXTRACT_PATH_REGEX = /(?<path>[^\(\s]+):[0-9]+:[0-9]+/;
const GJS_EXTRACT_PATH_REGEX = /@(?<path>file:\/\/[^\(\s]+):[0-9]+:[0-9]+/;
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

const getPathFromErrorStack = () => {

  let path: string | undefined;

  try {
    throw new Error();
  } catch (e: any) {

    // Node.js
    let initiator: string | undefined = e.stack.split('\n').slice(3, 4)[0]

    // GJS
    if(!initiator) {
      initiator = e.stack.split('\n').slice(2, 3)[0]
    }

    if (initiator) {

      // GJS
      path = GJS_EXTRACT_PATH_REGEX.exec(initiator)?.groups?.path

      // Node.js
      if(!path) {
        path = NODE_EXTRACT_PATH_REGEX.exec(initiator)?.groups?.path
      }
    }

    if(!initiator) {
      throw new Error("Can't get __dirname!");
    }
  }

  if(!path) {
    throw new Error("Can't get __dirname!");
  }

  return path;
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

  let path = getPathFromErrorStack();

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

  const dirname = pathDirname(path)

  return dirname
}

export default dirname;

// Default export for CJS
// @ts-ignore
export = dirname;