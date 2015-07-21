;(function ($, window, document, undefined) {

	"use strict";

		var pluginName = "pane",
			paneClass = "pane",
			defaults = {
				title: "My pane",
				dirty: false
		};

		// Plugin constructor.
		function Pane(element, options) {
			this.element = element;

			this.settings = $.extend({}, defaults, options);
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Business functions declaration.
		$.extend(Pane.prototype, {
				// Initialisation du plugin sur l'élément.
				init: function () {
					// dostuff
				},
				yourOtherFunction: function () {
					// noop
				}
		});

		// Wrapper to avoid multiple instantiations.
		$.fn[pluginName] = function (options) {
			var args = arguments;

			if (options === undefined || typeof options === 'object') {
				return this.each(function() {
					if (!$.data(this, "plugin_" + pluginName)) {
						$.data( this, "plugin_" + pluginName, new Pane(this, options));
					}
				});
			}
			else if (typeof options === 'string' && '_' !== options[0] && 'init' !== options) {
				var returns;

	            this.each(function () {
	                var instance = $.data(this, 'plugin_' + pluginName);

	                // Checking if any instance already exists.
	                if (instance instanceof Pane && typeof instance[options] === 'function') {

	                    // Calling instance's method.
	                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
	                }

	                // "destroy" method destroys the instance.
	                if (options === 'destroy') {
	                  $.data(this, 'plugin_' + pluginName, null);
	                }
	            });

	            // For chainability, returning "this" if no returned value.
	            return returns !== undefined ? returns : this;
			}
		};
})(jQuery, window, document);
