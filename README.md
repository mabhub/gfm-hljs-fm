# gfm-hljs-fm
## An awful name for a simple thing

- [**G**ithub **F**lavored **M**arkdown](https://guides.github.com/features/mastering-markdown/)
- [**H**igh**L**ight.**JS**](https://highlightjs.org/)
- [**F**ront **M**atter](https://github.com/jxson/front-matter)

## Usage

```js
render(input_string, [options]);
```
or
```bash
gfm-hljs-fm markdownfile.md
```

### Examples

```js
var render = require('gfm-hljs-fm');

console.log(render(`---
custom: metadata
---
# My Markdown title

Markdown document`));
```

Will output:

```html
<!--
custom: metadata
 -->
<h1 id="my-markdown-title">My Markdown title</h1>
<p>Markdown document</p>
```

#### Options

With:
```js
  options = {
      style: 'js' // Default: 'html'
  };
```

Output will be:

```js
{ attributes: { custom: 'metadata' },
  body: '# My Markdown title\n\nMarkdown document' }
```

With:
```js
  options = {
      style: 'json' // Default: 'html'
  };
```

Output will be:

```js
{"attributes":{"custom":"metadata"},"body":"# My Markdown title\n\nMarkdown document"}
```
