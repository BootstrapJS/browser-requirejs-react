/** @jsx React.DOM */
define([
    "react",
    "jsx!components/HelloMessage"
], function(
    React,
    HelloMessage
) {
    /*jshint ignore:start*/
    React.renderComponent(<HelloMessage name="John" />, document.getElementsByTagName("body")[0]);
    /*jshint ignore:end*/
});
