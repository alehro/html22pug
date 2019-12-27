
import * as fs from 'fs';
import * as program from "commander";
import * as parser from 'htmlparser2';
import { DomHandler, DomHandlerOptions, Node, Element } from "domhandler";
import { Html2Pug } from './Html2Pug';
const gulp = require('gulp');
const through2 = require('through2');
const rename = require("gulp-rename");


let test1 = () => {
    //new Html2Pug().convertFile("C:\\work\\my\\Pug\\html22pug\\test\\inputFiles\\customers.component.html", "C:\\work\\my\\Pug\\html22pug\\test\\inputFiles\\customers.component.pug");

    // new Html2Pug().convertFile("C:\\work\\my\\Pug\\html22pug\\test\\inputFiles\\index1.html", "C:\\work\\my\\Pug\\html22pug\\test\\outputFiles\\index1.pug");

    //new Html2Pug().convertFile("C:\\work\\my\\Pug\\html22pug\\test\\inputFiles\\header.component.html", "C:\\work\\my\\Pug\\html22pug\\test\\outputFiles\\header.component.pug");

    new Html2Pug().convertFile("C:\\work\\my\\Pug\\html22pug\\test\\inputFiles\\app-table.component.html", "C:\\work\\my\\Pug\\html22pug\\test\\outputFiles\\app-table.component.pug");
}

let runJest = () => {
    const jest = require('jest');

    const defaultArgs = ["--config", "C:\\work\\my\\Pug\\html22pug\\jest.config.js"];

    //This works but breakpoints should be handled manually. 1. Set breakpoint somewhere in test. 2. Manually step in to the code we test. 3. Re-set breakpoint there - for some reason they are not get bound automtically.
    jest.run(defaultArgs);
}
let testGulp = () => {
    //TODO: get the glob from cli args
    gulp.src("./test/inputFiles3//**/*.html")
        //https://gist.github.com/CITguy/079c631ac5f181939e08
        .pipe(through2.obj((file, enc, cb) => {

            // 1. clone new vinyl file for manipulation
            // (See https://github.com/wearefractal/vinyl for vinyl attributes and functions)
            var transformedFile = file.clone();
            if(!(transformedFile.contents instanceof Buffer)) throw "Expected Buffer but got something else";
            
            // 2. set new contents
            // * contents can only be a Buffer, Stream, or null
            // * This allows us to modify the vinyl file in memory and prevents the need to write back to the file system.
            let html = transformedFile.contents.toString();
            var pug = Html2Pug.convertString(html);
            transformedFile.contents = new Buffer(pug);

            // // 3. pass along transformed file for use in next `pipe()`        
            cb(null, transformedFile);
        }))   
        .pipe(rename((path) => {           
            path.extname = ".pug"
        }))
        .pipe(gulp.dest("./test/inputFiles3"))
}
testGulp();
//runJest();
//test1();

