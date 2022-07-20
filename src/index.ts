const DIRNAME_REGEX = /^((?:\.(?![^\/]))|(?:(?:\/?|)(?:[\s\S]*?)))(?:\/+?|)(?:(?:\.{1,2}|[^\/]+?|)(?:\.[^.\/]*|))(?:[\/]*)$/;
const EXTRACT_PATH_REGEX = /(?<path>[^\(\s]+):[0-9]+:[0-9]+/;
const WIN_DRIVE_REGEX = /^\/[A-Z]:\/*/;

const pathDirname = (path: string) => {
  
  const dirname = DIRNAME_REGEX.exec(path)?.[1];

  if(dirname === undefined) {
    throw new Error(`Can't parse dirname from ${path}`);
  }

  return dirname;
}

/**
 * CJS and ESM compatible implementation for __dirname
 * @returns What `__dirname` would return in CJS
 * @see https://github.com/vdegenne/es-dirname/blob/master/es-dirname.js
 */
export const dirname = () => {

  let dirname = '';
  try {
    throw new Error();
  } catch (e: any) {
    const initiator = e.stack.split('\n').slice(2, 3)[0]

    console.debug("initiator", initiator);

    let path = EXTRACT_PATH_REGEX.exec(initiator)?.groups?.path

    console.debug("path", path);

    if(!path) {
      throw new Error("Can't get __dirname!");
    }

    const protocol = "file://";

    if (path.indexOf(protocol) >= 0) {
      path = path.slice(protocol.length);
    }
    dirname = pathDirname(path)

    if (WIN_DRIVE_REGEX.test(dirname)) {
      dirname = dirname.slice(1);
    }
  }
  return dirname
}

export default dirname;

// Default export for CJS
// @ts-ignore
export = dirname;