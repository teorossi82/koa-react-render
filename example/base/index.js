const Koa = require('koa');
const reactRender = require("../../index");
const component = require("../component");
const app = new Koa();

app.use(reactRender());
app.use(async ctx => {
  ctx.renderReact(component, { name: "Matteo" });
});

app.listen(3000);