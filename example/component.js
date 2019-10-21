const React = require("react");

function Component (props) {
    return React.createElement("div", {
        className: "my-component"
      }, React.createElement("h1", null, "My name is ", props.name));
}

module.exports = Component;