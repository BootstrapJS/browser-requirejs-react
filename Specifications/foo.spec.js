/* jshint jasmine:true */
define([
    "react",
    "jsx!Components/HelloMessage"
],
function(
    React,
    HelloMessage
) {
    describe("blub", function() {
        it("should do something", function() {
            React.renderComponent(
                HelloMessage({name: "John Doe"}),
                document.body
            );

            var h1s = document.getElementsByTagName("h1");
            expect(h1s.length).toBe(1);
        });

        afterEach(function() {
            document.body.innerHTML = null;
        });
    });
});
