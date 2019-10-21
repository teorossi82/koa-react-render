const Koa = require('koa');
const fs = require("fs");
const path = require("path");
const reactRender = require("../../index");
const component = require("../component");

const renderInLayout = require("./myRenderInLayout");

const app = new Koa();

app.use(reactRender({ renderInLayout, renderType: "markup" }));
app.use(async ctx => {
    if(ctx.request.url.indexOf("style") !== -1) {
        ctx.type = "text/css";
        ctx.body = fs.readFileSync(path.resolve(__dirname, "./style.css"), {'encoding': 'utf8'});
        return;
    }
    ctx.renderReact(component, { name: "Matteo" }, { pageTitle: "My custom title", bodyClass: "my-body-class" });
});

app.listen(3000);