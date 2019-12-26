
import * as fs from 'fs';
import * as program from "commander";
import * as parser from 'htmlparser2';
import { DomHandler, DomHandlerOptions, Node, Element } from "domhandler";

export class Html2Pug {

  convertString(html: string){
    var dom = parser.parseDOM(html, { lowerCaseAttributeNames: false, lowerCaseTags: false });
    let res = this.traverseDom(dom, 0);
    return res;
  }
  traverseDom(nodes: Node[], depth: number) {
    let indent = "";
    for (let i = 0; i < depth; i++) indent += "  ";
    let res = "";
    nodes.forEach(node => {

      if (!(node instanceof Element)) return; //ignore others for now
      res += indent + node.name + "\n";
      if (node.children.length) res += this.traverseDom(node.children, depth + 1);


    });
    return res;

  }
  convertFile (hPath, pPath)  {
    //console.log('Hiiiiii');
    //let htmlPath = `C:\\work\\my\\Pug\\html2pugPostprocessor\\test\\inputFiles\\f1.html`;
    {
      let html = fs.readFileSync(hPath, 'utf-8');
      // let rss = html.match(/[\w,\d,-]+/g);
      // rss.forEach((i) => {
      //   if (!uniqueHtml.find(j => {
      //     return j == i;
      //   })) {
      //     uniqueHtml.push(i);
      //   }
      // })
      //var dom = parser.parseDOM(html, {xmlMode: true, lowerCaseTags: false});
      var dom = parser.parseDOM(html, { lowerCaseAttributeNames: false, lowerCaseTags: false });
      let res = this.traverseDom(dom, 0);
      //   const psr = new parser.Parser(
      //     {
      //         onopentag(name, attribs) {
      //             if (name === "script" && attribs.type === "text/javascript") {
      //                 console.log("JS! Hooray!");
      //             }
      //         },
      //         ontext(text) {
      //             console.log("-->", text);
      //         },
      //         onclosetag(tagname) {
      //             if (tagname === "script") {
      //                 console.log("That's it?!");
      //             }
      //         }
      //     },
      //     { decodeEntities: true }
      // );
      // psr.write(
      //     "Xyz <script type='text/javascript'>var foo = '<<bar>>';</ script>"
      // );
      // psr.end();

      //let pug = fs.readFileSync(`C:\\work\\my\\Pug\\html2pugPostprocessor\\test\\inputFiles\\f1.pug`, 'utf-8');
      console.log("Finished successfully");
    }

    //fs.writeFileSync(pPath, res);
    //console.log("Corrected content: \n" + res);
  }
  convert(argv: string[]) {
    //var program = require('commander');  

    if (argv.length < 4) {
      console.log("Please specify html file as first argument and pug file to output as second argument");
      throw "Invalid arguments";   
    }

    let inPath = argv[2];
    let outPath = argv[3];

    this.convertFile(inPath, outPath);
  }
}










