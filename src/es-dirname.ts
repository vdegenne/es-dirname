import {dirname} from 'path';
import {platform} from 'os';

class __ {
	static get dirname() {
		try {
			// @ts-ignore
			ShadowsAlwaysDieTwice;
		} catch (event: any) {
			const initiator = event.stack.split('\n').slice(2, 3)[0];
			let path = /(?<path>[^\(\s]+):[0-9]+:[0-9]+/.exec(initiator).groups.path;
			if (path.indexOf('file') >= 0) {
				path = new URL(path).pathname;
			}
			let _dirname = dirname(path);
			if (_dirname[0] === '/' && platform() === 'win32') {
				_dirname = _dirname.slice(1);
			}
			return _dirname;
		}
	}
}

export {__};
