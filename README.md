koa-react-render
---------------

A Koa middleware to render React component server side. It will add to the `Koa context` a new method `renderReact` that you can use to render a component inside a layout.

## Installation

```bash
$ npm install koa-react-render
```

## Usage

server.js
```js
const Koa = require('koa');
const reactRender = require("koa-react-render");
const component = require("path/to/my/component.js");
const app = new Koa();

// Initialize the middleware
app.use(reactRender());

app.use(async ctx => {
    // Use the renderReact method to render
    // the component and return the HTML
    ctx.renderReact(component, { name: "Steve" });
});

app.listen(3000);
```
component.js
```js
const React = require("react");

function Component (props) {
    return React.createElement("div", {
        className: "my-component"
      }, React.createElement("h1", null, "My name is ", props.name));
}

module.exports = Component;
```
This code will produce this HTML
```html
<!DOCTYPE html>
<html>
    <head>
        <title>My page title</title>
        <meta charset='utf-8'>
    </head>
    <body>
        <div class="my-component" data-reactroot=""><h1>My name is <!-- -->Steve</h1></div>
    </body>
</html>
```

If you'd like to use JSX, ES6, or other features that require transpiling, you can include Babel in your project directly. 

### General options

You can pass some options to the factory used to initialize the middleware:

option | values | default
-------|--------|--------
`renderType` | which `ReactDom` method you want to use to render the component. It can be `string` if you want to use [ReactDOMServer.renderToString](https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostring) method, or `markup` if you want to use [ReactDOMServer.renderToStaticMarkup](https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostaticmarkup) method.  | `string`
`renderInLayout`| It's a function that you can pass if you want to override the default `layout` used to wrap your component. The function will take 2 arguments: the first one is the `content` is the component that you will pass at runtime and you should put it between the tag `body` of your `layout`; the second one are `options` that you want to set at runtime inside your `layout` (for example the `title` of the page in the `title` tag). See [example](example/customLayout/index.js) | `null`

### [Examples](example)

### License

MIT