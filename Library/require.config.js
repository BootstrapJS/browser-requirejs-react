/* global require */
require.config({
    "basePath": './',

    "paths": {
        "JSXTransformer": "../Vendor/jsx-requirejs-plugin/js/JSXTransformer-0.11.0",
        "jsx": "../Vendor/jsx-requirejs-plugin/js/jsx",
        "text": "../node_modules/text/text",
        "react": "../bower_components/react/react-with-addons",
    },

    "shim": {

    },

    jsx: {
        fileExtension: '.jsx'
    }
});
