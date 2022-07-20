
const pathDirname = (path: string) => {
  const regex = /^((?:\.(?![^\/]))|(?:(?:\/?|)(?:[\s\S]*?)))(?:\/+?|)(?:(?:\.{1,2}|[^\/]+?|)(?:\.[^.\/]*|))(?:[\/]*)$/;
  const dirname = regex.exec(path)?.[1];

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
      // @ts-ignore
      ShadowsAlwaysDieTwice
  } catch (e: any) {
      const initiator = e.stack.split('\n').slice(2, 3)[0]
      let path = /(?<path>[^\(\s]+):[0-9]+:[0-9]+/.exec(initiator)?.groups?.path
  
      if(!path) {
          throw new Error("Can't get __dirname!");
      }
  
      if (path.indexOf('file') >= 0) {
        path = new URL(path).pathname
      }
      dirname = pathDirname(path)

      // TODO
      // if (dirname[0] === '/' && platform() === 'win32') {
      //   dirname = dirname.slice(1)
      // }
  }
  return dirname
}

export default dirname;

// Default export for CJS
// @ts-ignore
export = dirname;