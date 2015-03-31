// Create closure.
(function( $ ) {
 
    // Plugin definition.
    $.fn.truncate = function( options ) {
        
        // Extend our default options with those provided.
        // Note that the first argument to extend is an empty
        // object – this is to keep from overriding our "defaults" object.
        var settings = $.extend( {}, $.fn.truncate.defaults, options );

        //Iterates through the elements and applies on keyup listener
        return this.each(function() {

            // Wrap the element in jQuery
            var element = $(this);

            // Gets the element's data attributes
            var data = element.data();

            // If an attribute doesn't exist, fallback to the settings 
            for(var key in settings)
            {
                if(typeof data[key] === 'undefined')
                    data[key] = settings[key];
            }

            // Apply on keyup listener
            element.on('keyup', function(e){
                e.preventDefault();
                var $this = $(this);
                var text = truncate($this.val(), data);
                $this.val(text);
            });

            // Apply on change listener to prevent copy paste
            element.on('change', function(e){
                e.preventDefault();
                var $this = $(this);
                var text = truncate($this.val(), data);
                $this.val(text);
            });
      

        });

        function truncate (text, data) 
        {
            // Checks if it exceeds the maxsize
            if(text.length > data.maxsize)
            {
                // Truncates the text to "maxsize" chars
                text = text.substring(0,data.maxsize);

                // Checks if there is a msg and a target
                if(data.target !== 'none' && data.errormsg !== 'none')
                {
                    inject(data.target, data.errormsg);
                }               
            }
            else
            {
                //Clears the target
                if(data.target != 'none')
                    clear(data.target);
            }

            return text;            
        }

        function inject(target, message)
        {
            // Gets the target
            target = $(target);

            // Empties the target
            target.empty();

            // Appends an error msg to the target
            target.append(message);
        }

        function clear(target)
        {
            // Gets the target
            target = $(target);

            // Empty the target
            target.empty();            
        }



    };

    // Plugin defaults – added as a property on our plugin function.
    $.fn.truncate.defaults = {
        maxsize: 50,
        errormsg: 'none',
        target: 'none'
    };    
 

 
// End of closure.
 
})( jQuery );