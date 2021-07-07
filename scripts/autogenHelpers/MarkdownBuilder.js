const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const marked = require('marked');

const TMPL_PATH = path.join(__dirname, '..', 'templates');
const TMPL_FILE = fs.readFileSync(path.join(TMPL_PATH, 'component.md.ejs'), 'utf8');

class MarkdownBuilder {

  createTemplate() {
    const template = `<!DOCTYPE html>
    <html>
        <head>
        <meta charset="utf-8" >
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            .markdown-body {
                box-sizing: border-box;
                min-width: 200px;
                max-width: 980px;
                margin: 0 auto;
                padding: 45px;
            }
            @media (max-width: 767px) {
                .markdown-body {
                    padding: 15px;
                }
            }
            {{{style}}}
        </style>
        </head>
        <body>
            <article class="markdown-body">
                {{{content}}}
            </article>  
        </body>
    </html>`;
    return template;
  }

  getCss() {
    const css = fs.readFileSync(path.join(__dirname, '..', 'templates', 'github_markdown.css'), 'utf8');
    return css;
  }

  generateComponentFile(docJSON, componentName) {
    const tmpl = ejs.compile(TMPL_FILE, { strict: true });
    const fileContents = tmpl({ component: docJSON[componentName] });

    const html = marked(fileContents); //将md内容转为html内容
    let template = this.createTemplate();
    template = template.replace('{{{content}}}', html); //替换html内容占位标记
    let cssContent = this.getCss();
    template = template.replace('{{{style}}}', cssContent);

    fs.writeFileSync(path.join(__dirname, '..', '..', 'docs', `${componentName}.html`), template);
  }

  generate() {
    const docJSONFile = fs.readFileSync(path.join(__dirname, '..', '..', 'docs', 'docs.json'), 'utf8');
    const docJSON = JSON.parse(docJSONFile);
    const componentPaths = Object.keys(docJSON);

    for (let componentPath of componentPaths) {
      this.generateComponentFile(docJSON, componentPath);
    }

    console.log('Markdown is finish generating');
  }
}

module.exports = MarkdownBuilder;
