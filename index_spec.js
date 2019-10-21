const Koa = require("koa");
const React = require("react");
const request = require("supertest");
const reactRender = require("./index");


const Component = (props) => {
    return React.createElement("div", {
        className: "my-component"
      }, React.createElement("h1", null, "My name is ", props.name));
}

describe("Reacr render middleware", () => {
    let server;

    afterEach((done) => {
        server.close(done);
    });

    it("should return the component rendered inside the default layout", async () => {
        const app = new Koa();

        app.use(reactRender());

        app.use(async ctx => {
            ctx.renderReact(Component, { name: "Matteo" }, { title: "My page title" });
        });
          
        server = app.listen(3000);

        const response = await request(server).get("/");

        expect(response.text).toContain(`
            <!DOCTYPE html>
                <html>
                    <head>
                        <title>My page title</title>
                        <meta charset='utf-8'>
                    </head>
                    <body>
                        <div class="my-component" data-reactroot=""><h1>My name is <!-- -->Matteo</h1></div>
                    </body>
                </html>
        `);
    });

    it("should return the component rendered in the custom layout", async () => {
        const app = new Koa();
        
        const customRenderInLayout = (content) => {
            return `
            <!DOCTYPE html>
                <html>
                    <head>
                        <title>My custom layout</title>
                    </head>
                    <body>
                        ${content}
                    </body>
                </html>
            `;
        };

        app.use(reactRender({ renderInLayout: customRenderInLayout }));

        app.use(async ctx => {
            ctx.renderReact(Component, { name: "Matteo" });
        });
          
        server = app.listen(3000);

        const response = await request(server).get("/");

        expect(response.text).toContain(`
            <!DOCTYPE html>
                <html>
                    <head>
                        <title>My custom layout</title>
                    </head>
                    <body>
                        <div class="my-component" data-reactroot=""><h1>My name is <!-- -->Matteo</h1></div>
                    </body>
                </html>
        `);
    });

    it("should return the page rendered as a static markup", async () => {
        const app = new Koa();

        app.use(reactRender({ renderType: "markup" }));

        app.use(async ctx => {
            ctx.renderReact(Component, { name: "Matteo" }, { title: "My page title" });
        });
          
        server = app.listen(3000);

        const response = await request(server).get("/");

        expect(response.text).toContain(`
            <!DOCTYPE html>
                <html>
                    <head>
                        <title>My page title</title>
                        <meta charset='utf-8'>
                    </head>
                    <body>
                        <div class="my-component"><h1>My name is Matteo</h1></div>
                    </body>
                </html>
        `);
    });
});