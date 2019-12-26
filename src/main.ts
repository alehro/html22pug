
import * as fs from 'fs';
import * as program from "commander";
import * as parser from 'htmlparser2';
import { DomHandler, DomHandlerOptions, Node, Element } from "domhandler";
import { Html2Pug } from './Html2Pug';

new Html2Pug().convert(process.argv);
// //var program = require('commander');

// if(process.argv.length<4){
//   console.log("Please specify html file as first argument and pug file to output as second argument");       
//   throw "Invalid arguments";
// }

// let inPath =process.argv[2];
// let outPath = process.argv[3];
// // program
// //   .version('0.0.1')
// //   .command('<in1> <out1>')
// //   .action(((in1, out1)=>{
// //     inPath = in1;
// //     outPath = out1;
// //   }))
// //   .parse(process.argv);

// var traverseDom = (nodes:  Node[], depth:number)=>{
//   let indent = "";
//   for(let i=0; i<depth; i++) indent+="  ";
//   let res = "";
//   nodes.forEach(node=>{
      
//     if(!(node instanceof Element)) return; //ignore others for now
//     res += indent + node.name+"\n";
//     if(node.children.length)    res+=traverseDom(node.children, depth+1);

    
//   });
//   return res;

// }

// var correctFiles = (hPath, pPath) => {
//   //console.log('Hiiiiii');
//   //let htmlPath = `C:\\work\\my\\Pug\\html2pugPostprocessor\\test\\inputFiles\\f1.html`;
//   {
//     let html = fs.readFileSync(hPath, 'utf-8');
//     // let rss = html.match(/[\w,\d,-]+/g);
//     // rss.forEach((i) => {
//     //   if (!uniqueHtml.find(j => {
//     //     return j == i;
//     //   })) {
//     //     uniqueHtml.push(i);
//     //   }
//     // })
//     //var dom = parser.parseDOM(html, {xmlMode: true, lowerCaseTags: false});
//     var dom = parser.parseDOM(html, {lowerCaseAttributeNames: false, lowerCaseTags: false});
//     let res = traverseDom(dom, 0);
//   //   const psr = new parser.Parser(
//   //     {
//   //         onopentag(name, attribs) {
//   //             if (name === "script" && attribs.type === "text/javascript") {
//   //                 console.log("JS! Hooray!");
//   //             }
//   //         },
//   //         ontext(text) {
//   //             console.log("-->", text);
//   //         },
//   //         onclosetag(tagname) {
//   //             if (tagname === "script") {
//   //                 console.log("That's it?!");
//   //             }
//   //         }
//   //     },
//   //     { decodeEntities: true }
//   // );
//   // psr.write(
//   //     "Xyz <script type='text/javascript'>var foo = '<<bar>>';</ script>"
//   // );
//   // psr.end();

//     //let pug = fs.readFileSync(`C:\\work\\my\\Pug\\html2pugPostprocessor\\test\\inputFiles\\f1.pug`, 'utf-8');
//     console.log("Finished successfully");
//   }
 
//   //fs.writeFileSync(pPath, res);
//   //console.log("Corrected content: \n" + res);
// }

// correctFiles(inPath, outPath);











// /**
//  * Some predefined delays (in milliseconds).
//  */
// export enum Delays {
//   Short = 500,
//   Medium = 2000,
//   Long = 5000,
// }

// /**
//  * Returns a Promise<string> that resolves after given time.
//  *
//  * @param {string} name - A name.
//  * @param {number=} [delay=Delays.Medium] - Number of milliseconds to delay resolution of the Promise.
//  * @returns {Promise<string>}
//  */
// function delayedHello(
//   name: string,
//   delay: number = Delays.Medium,
// ): Promise<string> {
//   return new Promise((resolve: (value?: string) => void) =>
//     setTimeout(() => resolve(`Hello, ${name}`), delay),
//   );
// }

// // Below are examples of using TSLint errors suppression
// // Here it is suppressing missing type definitions for greeter function

// // tslint:disable-next-line typedef
// export async function greeter(name) {
//   // tslint:disable-next-line no-unsafe-any no-return-await
//   return await delayedHello(name, Delays.Long);
// }

