### Usage

```bash
# tested in windows cmd, on linux should be the same
npm install html22pug -g
# Specify input folder with html files. Output folder can be the same or separate. Input folder will be processed recursively.
html22pug c:\work\my\Pug\html22pug\test\inputFiles3
```
Also it can be used from JS/TypeScript
```ts
// In Typescript. In JS will be a bit different.
import { Html2Pug } from './Html2Pug';
//The main point of the utility is that it doesn't change things like ngIf to lower case breaking Angular code.
let pug = Html2Pug.convertString('<div *ngIf="true" class="ui-g" style="padding-bottom: 10px">       <span>Some text</span></div>');
```

### TODO:
- test the converter on decent project, e.g. the asp-core-angular.
- get first feedback from users
- ensure that it can work on single files, i.e. with bash pipes

### DONE: 
+ using gulp in release to iterate files leads to impossibility to publish as npm package:
html22pug>pakmanager -e node deps
gives:
Cannot find module 'internal/util/types'
at Object.<anonymous> (C:\Users\Alex\AppData\Roaming\npm\node_modules\pakmanager\node_modules\npm\node_modules\graceful-fs\fs.js:11:8)
Wich in turn is dependency of gulp. Also overall I think gulp is not good dependency for release.
So, let's get rid of gulp and use more lightweight tools to iterate files.
+ command line tool: https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e
+ Conversion of html to pug mostly works. Ready for use anyway.
