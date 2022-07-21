import GLib from 'gi://GLib';
import { dirname } from '../../dist/esm/index.mjs';
import { exit } from 'system';
const byteArray = imports.byteArray;

const getOriginalDirname = (path) => {
    let [res, out, err, status] = GLib.spawn_command_line_sync(`node ${path}/get-original-dirname.js`);
    err = err ? byteArray.toString(err) : err;
    const __dirname = out ? byteArray.toString(out).trim() : undefined;
    if (err) {
        console.error(err);
    }
    return __dirname;
}

const crossDirname = dirname();
const __dirname = getOriginalDirname(crossDirname);

console.log("GJS");
console.log(`\tdirname() \t-> "${crossDirname}"`);
console.log(`\t__dirname \t-> "${__dirname}"`);

if (crossDirname === __dirname) {
    console.log("✔ dirname() should return the same string as __dirname")
} else {
    console.log("failed");
    exit(1);
}

exit(0);