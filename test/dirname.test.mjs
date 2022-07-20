import { dirname } from '../dist/esm/index.mjs';
import { fileURLToPath } from "url";
import { dirname as pathDirname } from "path";
import { expect } from 'chai';

export const esmDirname = () => {
    if (import.meta) {
        return pathDirname(fileURLToPath(import.meta.url));
    }
};

describe('ESM', () => {
    it('dirname() should return the same string as esmDirname', function () {
        console.debug("\tdirname() \t->", dirname());
        console.debug("\tesmDirname() \t->", esmDirname());
        expect(dirname()).to.equal(esmDirname(import.meta));
    });

});
