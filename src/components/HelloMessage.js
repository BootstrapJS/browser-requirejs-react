/** @jsx React.DOM */
define([
    "react"
], function(
    React
) {
    var HelloMessage = React.createClass({
        render: function() {
            /*jshint ignore:start*/
            return <div>Hello {this.props.name}</div>;
            /*jshint ignore:end*/
        }
    });

    return HelloMessage;
});
