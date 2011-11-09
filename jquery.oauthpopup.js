/*!
 * jQuery OAuth via popup window plugin
 *
 * @author  Nobu Funaki @zuzara
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($){
    //  inspired by DISQUS
    $.oauthpopup = function(options)
    {
        if (!options || !options.path) {
            throw new Error("options.path must not be empty");
        }
        $.extend({
            windowName: 'ConnectWithOAuth' // should not include space for IE
          , windowOptions: 'location=0,status=0,width=800,height=400'
          , callback: function(){ window.location.reload(); }
        }, options);

        var that = this;

        that.oauthWindow   = window.open(options.path, options.windowName, options.windowOptions);
        that.oauthInterval = window.setInterval(function(){
            if (that.oauthWindow.closed) {
                window.clearInterval(that.oauthInterval);
                options.callback();
            }
        }, 1000);
    };
})(jQuery);
