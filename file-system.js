/////////////////////////////////////////////////////////////////////////////////////////////
//
// allume.request.file-system
//
//    PKX request module for fetching releases from file system locations.
//
// License
//    Apache License Version 2.0
//
// Copyright Nick Verlinden (info@createconform.com)
//
/////////////////////////////////////////////////////////////////////////////////////////////

(function() {
    var REQUEST_PROC_NAME = "file-system";
    var URI_PATH_FILESYSTEM_TEMPLATE = "$NAME/";

    function PKXRequestGitHub() {
        var self = this;

        this.process = function(selector) {
            if (selector.uri.scheme != "file" || 
                selector.uri.path.lastIndexOf("/") == selector.uri.path.length -1 ||
                selector.uri.path.lastIndexOf(".pkx") == selector.uri.path.length - 4) {
                return;
            }

            return new Promise(function (resolve, reject) {
                selector.uri = selector.uri.toString() + "/" + URI_PATH_FILESYSTEM_TEMPLATE;
                resolve();
            });
        };

        // register request processor
        define.Loader.waitFor("pkx", function(loader) {
            loader.addRequestProcessor(REQUEST_PROC_NAME, self.process);
        });
    }

    var processor = new PKXRequestGitHub();
    define(function () {
        return processor;
    });

    var version = require("./cc.version");
    var string = require("./cc.string");
})();