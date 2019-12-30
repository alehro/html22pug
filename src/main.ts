#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { Html2Pug } from './Html2Pug';
// const gulp = require('gulp');
// const through2 = require('through2');
// const rename = require("gulp-rename");
const glob = require("glob");

//creates output directories if necessery
let ensureDirExists = (p:string)=>{
    let dirName = path.dirname(p);
    if(!fs.existsSync(dirName)){           
        ensureDirExists(dirName);     
        fs.mkdirSync(dirName);
    } 
}
let convertFiles = () => {
    if (process.argv.length < 3) {
        console.log("Please specify input folder with html files as first argument. Optionally output folder as second argument can be specified otherwise pug files will be placed near to html files.");
        throw "Invalid arguments";
    }
    let inputFolder = process.argv[2];//"./test/inputFiles3/**/*.html"
    let outputFolder = process.argv.length > 3 ? process.argv[3] : inputFolder;
    let inputGlob = inputFolder + "/**/*.html";

    let absInputFolder = path.resolve(inputFolder);
    
    glob(inputGlob, (err, res: Array<string>) => {
        if(err){
            console.error(err);
            return;
        }
        res.forEach((filePath) => {
            let absInputFile = path.resolve(filePath);
            let relativeOutputPath = path.relative(absInputFolder, absInputFile);
            console.log(filePath);
            //TODO: get the glob from cli args
            let html = fs.readFileSync(filePath).toString();

            var pug = Html2Pug.convertString(html);
            let outputPath = path.join(outputFolder, relativeOutputPath);
            let pugPath = outputPath.replace(/\.html$/, ".pug");
            ensureDirExists(pugPath);
            fs.writeFileSync(pugPath, pug);
          
        });
    });

}
//console.log("Beware this is test version! It is not ready for use! The good one will follow soon");
convertFiles();

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
//gulp adds about of 200 of deps comparing to 27 without it, so let's get rid of that
// let convertFilesWithPug = () => {
//     if(process.argv.length<2){
//         console.log("Please specify glob for input files as first argument (the format is the same as for gulp.src) and output directory as second argument. The output directory can be the same as input.");      
//         throw "Invalid arguments";
//       }
//     //TODO: get the glob from cli args
//     gulp.src("./test/inputFiles3//**/*.html")
//         //https://gist.github.com/CITguy/079c631ac5f181939e08
//         .pipe(through2.obj((file, enc, cb) => {

//             // 1. clone new vinyl file for manipulation
//             // (See https://github.com/wearefractal/vinyl for vinyl attributes and functions)
//             var transformedFile = file.clone();
//             if(!(transformedFile.contents instanceof Buffer)) throw "Expected Buffer but got something else";

//             // 2. set new contents
//             // * contents can only be a Buffer, Stream, or null
//             // * This allows us to modify the vinyl file in memory and prevents the need to write back to the file system.
//             let html = transformedFile.contents.toString();
//             var pug = Html2Pug.convertString(html);
//             transformedFile.contents = Buffer.from(pug);

//             // // 3. pass along transformed file for use in next `pipe()`        
//             cb(null, transformedFile);
//         }))   
//         .pipe(rename((path) => {           
//             path.extname = ".pug"
//         }))
//         .pipe(gulp.dest("./test/inputFiles3"))
// }

//runJest();
//test1();
//console.log("Test cli");

