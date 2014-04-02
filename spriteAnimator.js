/*
 *  Project:
 *  Description:
 *  Author:
 *  License:
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window is passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).    
   
    var pluginName = "spriteAnimator",
    // the name of using in .data()
        dataPlugin = "plugin_" + pluginName,
    // default options
        defaults = {            
            currentFrame: 0,
            totalFrames: 0,
            fps: 0,
            loop: false,
            reverse:false,
            fromFrame : 1,
            onComplete: null
        };
   
    var privateMethod = function () {
        console.log("private method");
    };

    // The actual plugin constructor
    var Plugin = function ( element ) {
        /*
         * Plugin instantiation
         */
        this.options = $.extend( {}, defaults );
        // this.init();
    };

    Plugin.prototype = {

        init: function ( options ) {

            // extend options ( http://api.jquery.com/jQuery.extend/ )
            $.extend( this.options, options );
            
            var that = this
            /*
             * Place initialization logic here
             */
            
             this.currentFrame= options.currentFrame            
             this.totalFrames= options.totalFrames
             this.fromFrame = options.fromFrame           
             this.fps= options.fps
             this.reverse= options.reverse 
             this.onComplete= options.onComplete
             this.loop= options.loop            
             this.interval_obj = setInterval(function(){that.next_frame();},this.fps)
             //this.next_frame();
            
        },
         onComplete: function () {
            
        },
        stop: function () {
            // unset Plugin data instance
            //console.log("destroy");
            this.element.data( dataPlugin, null );
            clearInterval(this.interval_obj);
            //this.element.css("display","none");
        },
        destroy: function () {
            // unset Plugin data instance
            //console.log("destroy");
            this.element.data( dataPlugin, null );
            clearInterval(this.interval_obj);
            this.element.css("display","none");
        },

        // public get method      

        // public chaining method
        next_frame: function () {
                    
            if(!this.reverse)
            {
              if(this.currentFrame<this.totalFrames)
              {              
                this.element.removeClass("frame"+this.currentFrame);              
                this.currentFrame++;              
                this.element.addClass("frame"+this.currentFrame);             
              }
              else
              {
                if(this.loop)
                {
                  this.element.removeClass("frame"+this.currentFrame);
                  this.currentFrame=this.fromFrame;
                  this.element.addClass("frame"+this.currentFrame); 
                }
                else
                {
                  clearInterval(this.interval_obj);
                  if(this.onComplete!=null)
                    this.onComplete();
                }
              } 
            }
            else
            {
              if(this.currentFrame>this.fromFrame)
              {              
                this.element.removeClass("frame"+this.currentFrame);              
                this.currentFrame--;              
                this.element.addClass("frame"+this.currentFrame);             
              }
              else
              {
                if(this.loop)
                {
                  this.element.removeClass("frame"+this.currentFrame);
                  this.currentFrame=this.totalFrames;
                  this.element.addClass("frame"+this.currentFrame); 
                }
                else
                {
                  clearInterval(this.interval_obj);
                   if(this.onComplete!=null)
                    this.onComplete();
                }
              }
            }
            
        }
    }

    /*
     * Plugin wrapper, preventing against multiple instantiations and
     * allowing any public function to be called via the jQuery plugin,
     * e.g. $(element).pluginName('functionName', arg1, arg2, ...)
     */
    $.fn[ pluginName ] = function ( arg ) {

        var args, instance;

        // only allow the plugin to be instantiated once
        if (!( this.data( dataPlugin ) instanceof Plugin )) {

            // if no instance, create one
            this.data( dataPlugin, new Plugin( this ) );
        }

        instance = this.data( dataPlugin );

        instance.element = this;

        // Is the first parameter an object (arg), or was omitted,
        // call Plugin.init( arg )
        if ( typeof arg === 'undefined' || typeof arg === 'object' ) {

            if ( typeof instance['init'] === 'function' ) {
                instance.init( arg );
            }

        // checks that the requested public method exists
        } else if ( typeof arg === 'string' && typeof instance[arg] === 'function' ) {

            // copy arguments & remove function name
            args = Array.prototype.slice.call( arguments, 1 );

            // call the method
            return instance[arg].apply( instance, args );

        } else {

            $.error( 'Method ' + arg + ' does not exist on jQuery.' + pluginName );

        }
    };

}(jQuery, window, document));

/*
can be used 
    $("#comenzar_btn").spriteAnimator({currentFrame: 1,totalFrames:20,fps:20,es_loop: false});
to get ride of the object 
    $("#comenzar_btn").spriteAnimator("destroy");

*/
