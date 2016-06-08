(function ($) {
    $.fn.combo = function (eventList, options, callback) {
        // Shift our parameters to support the '', func and {}, func and '', {} overrides
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (typeof eventList === 'object') {
            options = eventList;
            eventList = null;
        }

        options = $.extend({
            events: eventList,
            timeout: 5000,
            callback: callback
        }, options);

        // Setup our instance variables for this combo
        var secretKey = null,
            uniqueEvents = {},
            current = [],
            timeout = 0;

        // Verify that the user provided a combo string for us to bind with
        if (options.events != null) {
            if (typeof options.events === 'string') {
                secretKey = options.events.split(' ');
            }
        }

        // Make sure we were able to load our secret combo key
        if (secretKey == null) {
            console.error('You must provide a list of events to bind a combo.');
            return;
        }

        // Use our secret key to generate a unique event list (prevent double triggers)
        for (var i = 0; i < secretKey.length; i++) {
            uniqueEvents[secretKey[i]] = null;
        }

        // Generate a binding string 
        var eventBinding = '';
        for (var x in uniqueEvents) {
            if (eventBinding != '') eventBinding += ' ';
            eventBinding += x;
        }

        // Resets our input
        function reset() {
            current.length = 0;
            clearTimeout(timeout);
        }

        // Gives the user a fresh timeout (options.timeout)
        function resetTimeout() {
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                reset();
            }, options.timeout);
        }

        this.on(eventBinding, function (e) {
            // Log this event
            current.push(e.type);
            
            resetTimeout();

            // Check to see if our input array is valid
            var invalid = false;
            for (var i = 0; i < secretKey.length; i++) {
                if (current.length <= i || current[i] != secretKey[i]) {
                    invalid = true;
                    break;
                }
            }

            // If our input was valid then we trigger our callback!
            if (invalid == false) {
                if (typeof options.callback === 'function')
                    options.callback(this);

                reset();
            }
        });

        return this;
    }    
})(jQuery);