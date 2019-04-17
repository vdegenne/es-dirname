const _dirname = require('path').dirname
const { platform } = require('os')

module.exports = () => {
  try {
    ShadowsAlwaysDieTwice
  } catch (e) {
    const initiator = e.stack.split('at').slice(2, 3)[0]
    let path = /(?<path>[^\(]+):[0-9]+:[0-9]+/.exec(initiator).groups.path
    if (path.indexOf('file') >= 0) {
      const url = new URL(
        /(?<path>[^\(]+):[0-9]+:[0-9]+/.exec(initiator).groups.path
      )
      path = url.pathname
    }
    let dirname = _dirname(path)
    if (dirname[0] === '/' && platform() === 'win32') {
      dirname = dirname.slice(1)
    }
    return dirname
  }
}
