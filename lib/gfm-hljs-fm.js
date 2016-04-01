'use strict';

const MARKED = require('marked');
const HLJS   = require('highlight.js');

MARKED.setOptions({
  langPrefix: '',
  highlight: (code, lang) => HLJS.highlightAuto(code, lang ? [lang] : HLJS.listLanguages()).value
});

var RENDERER = new MARKED.Renderer();

RENDERER.code = function (code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      code = out;
    }
  }

  if (!lang) {
    return '<pre class="pre-hljs"><code class="hljs">'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre class="pre-hljs"><code class="hljs '
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + code
    + '\n</code></pre>\n';
};

const frontMatter = require('front-matter')
const prettyjson  = require('prettyjson');

var fm2comment = (attributes) => '<!-- \n' + prettyjson.render(attributes, { noColor: true }) + '\n -->\n';

var render = (input, options) => {
  options       = options || {};
  options.style = options.style || 'html';

  let source = frontMatter(input);
  let output;

  switch (options.style) {
    case 'json':
      output = JSON.stringify(source);
      break;
    case 'js':
      output = source;
      break;
    case 'html':
    default:
      output = fm2comment(source.attributes) + MARKED(source.body, { renderer: RENDERER });
  }

  return output;
};

render.version = require('../package.json').version;

module.exports = render;
