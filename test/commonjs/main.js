var React = require('react');
var ReactDOM = require('react-dom');
var InlineSVG = require('react-inline-svg');

var HelloWorld = React.createClass({
    render: function() {
        return React.createElement(InlineSVG, {
            src: "https://dbd6j53uzcole.cloudfront.net/assets/images/website/logo-grey.4979e9f5.svg",
            className: "css-class"
        });
    }
});

ReactDOM.render(React.createElement(HelloWorld, null), document.getElementById('app'));