define([
    "react",
    "jsx!Components/HelloMessage"
], function(
    React,
    HelloMessage
) {
    React.renderComponent(
        HelloMessage({name: "John Doe"}),
        document.getElementsByTagName("body")[0]
    );
});
