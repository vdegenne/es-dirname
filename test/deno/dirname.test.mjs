import { fromFileUrl, dirname as pathDirname } from "https://deno.land/std/path/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { dirname } from '../../dist/esm/index.mjs';

export const esmDirname = () => {
    return pathDirname(fromFileUrl(import.meta.url));
};

Deno.test("Deno", () => {
    const crossDirname = dirname();
    const _esmDirname = esmDirname();
    
    console.log("Deno");
    console.log(`\tdirname() \t-> "${crossDirname}"`);
    console.log(`\tesmDirname() \t-> "${_esmDirname}"`);
    assertEquals(crossDirname, _esmDirname);
});