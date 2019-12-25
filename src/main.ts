
import * as fs from 'fs';
import * as program from "commander";
//var program = require('commander');

if(process.argv.length<4){
  console.log("Please specify html file as first argument and pug file to correct as second argument");       
  throw "Invalid arguments";
}

let inPath =process.argv[2];
let outPath = process.argv[3];
// program
//   .version('0.0.1')
//   .command('<in1> <out1>')
//   .action(((in1, out1)=>{
//     inPath = in1;
//     outPath = out1;
//   }))
//   .parse(process.argv);


var correctFiles = (hPath, pPath) => {
  //console.log('Hiiiiii');
  let uniqueHtml = [];
  //let htmlPath = `C:\\work\\my\\Pug\\html2pugPostprocessor\\test\\inputFiles\\f1.html`;
  {
    let html = fs.readFileSync(hPath, 'utf-8');
    let rss = html.match(/[\w,\d,-]+/g);
    rss.forEach((i) => {
      if (!uniqueHtml.find(j => {
        return j == i;
      })) {
        uniqueHtml.push(i);
      }
    })
    //let pug = fs.readFileSync(`C:\\work\\my\\Pug\\html2pugPostprocessor\\test\\inputFiles\\f1.pug`, 'utf-8');
    //console.log("unique htmls: \n"+uniqueHtml)
  }
  let uniquePug = [];
  let pug = fs.readFileSync(pPath, 'utf-8');

  {
    let rss = pug.match(/[\w,\d,-]+/g);
    rss.forEach((i) => {
      if (!uniquePug.find(j => {
        return j == i;
      })) {
        uniquePug.push(i);
      }
    })
    //let pug = fs.readFileSync(`C:\\work\\my\\Pug\\html2pugPostprocessor\\test\\inputFiles\\f1.pug`, 'utf-8');
    //console.log("unique pugs: \n"+uniquePug)
  }
  let differentCase = [];
  uniqueHtml.forEach((htmlWithCase: string) => {
    let suspitiousPug = uniquePug.find(i => i == htmlWithCase.toLowerCase());
    if (suspitiousPug && suspitiousPug != htmlWithCase) {
      differentCase.push({ case: htmlWithCase, nocase: htmlWithCase.toLowerCase() });
    }
  });
  console.log("Words to be corrected: \n" + differentCase);

  let res = pug;
  differentCase.forEach((i) => {
    console.log(`Search ${i.nocase}, replace ${i.case}`)
    res = res.replace(i.nocase, i.case);
  })
  fs.writeFileSync(pPath, res);
  //console.log("Corrected content: \n" + res);
}

correctFiles(inPath, outPath);











/**
 * Some predefined delays (in milliseconds).
 */
export enum Delays {
  Short = 500,
  Medium = 2000,
  Long = 5000,
}

/**
 * Returns a Promise<string> that resolves after given time.
 *
 * @param {string} name - A name.
 * @param {number=} [delay=Delays.Medium] - Number of milliseconds to delay resolution of the Promise.
 * @returns {Promise<string>}
 */
function delayedHello(
  name: string,
  delay: number = Delays.Medium,
): Promise<string> {
  return new Promise((resolve: (value?: string) => void) =>
    setTimeout(() => resolve(`Hello, ${name}`), delay),
  );
}

// Below are examples of using TSLint errors suppression
// Here it is suppressing missing type definitions for greeter function

// tslint:disable-next-line typedef
export async function greeter(name) {
  // tslint:disable-next-line no-unsafe-any no-return-await
  return await delayedHello(name, Delays.Long);
}

