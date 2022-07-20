const dirname = require('../dist/cjs/index.cjs');
const { expect } = require('chai');

describe('CJS', () => {
    it('dirname() should return the same string as __dirname', function () {
        console.debug("\tdirname() \t->", dirname());
        console.debug("\t__dirname \t->", __dirname);
        expect(dirname()).to.equal(__dirname);
    });
});
