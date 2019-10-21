const React = require("react");
const ReactDomServer = require("react-dom/server");

const _renderInLayout = (content, options = {}) => {
    return `
            <!DOCTYPE html>
                <html>
                    <head>
                        <title>${options.title || ""}</title>
                        <meta charset='utf-8'>
                    </head>
                    <body>
                        ${content}
                    </body>
                </html>
            `;
};

const _getOptions = ({
    renderType = "string", 
    renderInLayout } = {}
) => {
    const _options = {};
    _options.renderType = renderType === "string" ? "renderToString" : "renderToStaticMarkup";
    _options.renderFnc = renderInLayout || _renderInLayout;
    return _options;
}

module.exports = (middlewareOptions) => async (ctx, next) => {
    const runtimeOptions = _getOptions(middlewareOptions);

    ctx.renderReact = async (component, datas, pageOptions = {}) => {
        const content = await ReactDomServer[runtimeOptions.renderType](React.createElement(component, datas));
        ctx.body = runtimeOptions.renderFnc(content, pageOptions);
    };

    await next();
};
