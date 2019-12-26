
import * as fs from 'fs';
import * as program from "commander";
import * as parser from 'htmlparser2';
import { DomHandler, DomHandlerOptions, Node, Element } from "domhandler";
import { Html2Pug } from './Html2Pug';

let test1=()=>{
    //new Html2Pug().convertFile("C:\\work\\my\\Pug\\html22pug\\test\\inputFiles\\customers.component.html", "C:\\work\\my\\Pug\\html22pug\\test\\inputFiles\\customers.component.pug");
    new Html2Pug().convertFile("C:\\work\\my\\Pug\\html22pug\\test\\inputFiles\\index1.html", "C:\\work\\my\\Pug\\html22pug\\test\\inputFiles\\index1.pug");
}

let runJest=()=>{
    const jest = require('jest');

    const defaultArgs = ["--config", "C:\\work\\my\\Pug\\html22pug\\jest.config.js"];
    
    //This works but breakpoints should be handled manually. 1. Set breakpoint somewhere in test. 2. Manually step in to the code we test. 3. Re-set breakpoint there - for some reason they are not get bound automtically.
    jest.run(defaultArgs);
}

//runJest();
test1();
