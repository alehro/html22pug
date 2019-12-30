
import * as fs from 'fs';
import * as program from "commander";
import * as parser from 'htmlparser2';
import { DomHandler, DomHandlerOptions, Node, Element, DataNode } from "domhandler";
import * as _ from "underscore"

export class Html2Pug {

  static convertString(html: string) {
    var dom = parser.parseDOM(html, { lowerCaseAttributeNames: false, lowerCaseTags: false });
    let res = new Html2Pug().traverseDom(dom, 0);
    return res;
  }
  convertElement(el: Element) {
    let res = el.name; 

    if (Object.keys(el.attribs).length) {
      let all = _.map(el.attribs, (value, key) => {
        return `${key}="${value}"`;
      }).join(", ");
      res += `(${all})`;

    }
    //if(el.name=="style") res+=".\n" // pug line continuation

    return res;
  }
  textNodeIsSibling(node: Node) {
    if (node.parent) {
      let chs = node.parent.children;
      let id = chs.indexOf(node);
      let previous = chs.slice(0, id);

      if (previous.some(n => {
        return n instanceof Element;
      })) return true;
    }
    return false;

  }
  cleanNewLines(text: string){
    let res = text.trim().replace("\n", "");
    res = res.replace("\r", "");
    return res;
  }
  traverseDom(nodes: Node[], depth: number) {
    let indent = "";
    for (let i = 0; i < depth; i++) indent += "  ";
    let res = "";
    nodes.forEach(node => {

      if (node instanceof DataNode) {

        //if(node.type!="text") throw "Unexpected case";
        if (node.type == "text") {

          if (!node.data.trim()) return; //empty text, end of line etc.
          //res += indent +"| " + node.data;
          if (node.parent && (node.parent as Element).name == "style") {
            res += ".\n" + indent + node.data.trim();// pug line continuation
          } else {    
            let text = this.cleanNewLines(node.data.trim());        
            if (this.textNodeIsSibling(node)) {
              //just raw text in html              
              res += "\n" + indent +"span "+ text;
            }else{
              res += " " + text;
            }
          }
        } else if (node.type == "comment") {
          //remove new lines from multiline comments otherwise we have pug error: Unexpected token.
          let comment = this.cleanNewLines(node.data.trim());
          res += "\n" + indent + `<!--${comment}-->`;
        } else if (node.type == "directive") {
          //res += "UNHANDLED ELEMENT TYPE. Please convert it manually."
          res += "\n" + indent + `<${node.data}/>`;
        } else {
          res += "UNHANDLED ELEMENT TYPE. Please convert it manually."
        }
      } else if (node instanceof Element) {
        res += "\n" + indent + this.convertElement(node);
        if (node.children.length) res += this.traverseDom(node.children, depth + 1);

      } else {
        throw "Unexpected case";
      }


    });
    return res;

  }
  convertFile(hPath, pPath) {

    {
      let html = fs.readFileSync(hPath, 'utf-8');

      fs.writeFileSync(pPath, Html2Pug.convertString(html));

      //let pug = fs.readFileSync(`C:\\work\\my\\Pug\\html2pugPostprocessor\\test\\inputFiles\\f1.pug`, 'utf-8');
      console.log("File converted successfully");
    }

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










