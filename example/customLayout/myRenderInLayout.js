module.exports = (content, options) => {
    return `
        <!DOCTYPE html>
            <html>
                <head>
                    <title>${options.pageTitle}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                    <meta name="description" content="This is an example of how to set a custom layout" />
                    <link rel="stylesheet" type="text/css" href="style.css">
                </head>
                <body class="${options.bodyClass}">
                    ${content}
                </body>
                <script>
                    console.log("Hi, this is your script");
                </script>
            </html>
        `;
}