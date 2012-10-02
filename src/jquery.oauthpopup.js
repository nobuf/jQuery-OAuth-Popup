/*!
 * jQuery OAuth via popup window plugin
 *
 * @author  Nobu Funaki @zuzara
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(factory) {
    // Support three module loading scenarios
    if (typeof define === 'function' && define['amd']) {
        // AMD anonymous module
        define(['jquery'], factory);
    } else {
        // No module loader (plain <script> tag) - put directly in global namespace
        factory(jQuery);
    }
})(function($){
    (function($,window){
        //  inspired by DISQUS
        $.oauthpopup = function(options)
        {
            if (!options || !options.path) {
                throw new Error("options.path must not be empty");
            }
            options = $.extend({
                windowName: 'ConnectWithOAuth' // should not include space for IE
              , windowOptions: 'location=0,status=0,width=800,height=400'
              , callback: function(){ window.location.reload(); }
            }, options);

            var oauthWindow = window.open(options.path, options.windowName, options.windowOptions),
                oauthInterval = 0;
            oauthCallback = function() {
                if (oauthInterval > 0) {
                    window.clearInterval(oauthInterval);
                }
                if (!oauthWindow.closed) {
                    oauthWindow.close();
                }
                //pass all arguments to callback
                options.callback.apply(null, arguments);
                window.oauthCallback = null;
            };
            oauthInterval = setInterval(function(){
                if (oauthWindow.closed) {
                    callback();
                }
            }, 1000);
        };
    })($,window)
});
