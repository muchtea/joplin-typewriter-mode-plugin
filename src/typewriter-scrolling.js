/*
 *
 * Credits: 
 * https://github.com/azu/codemirror-typewriter-scrolling 
 * https://discuss.codemirror.net/t/modified-typewriter-scrolling-addon-problem/452
 *
 */

module.exports = {
	default: function(context) {
		return {
			plugin: function (CodeMirror) {
			"use strict";
			let isTypewriterModeEnabled = false;

			CodeMirror.defineOption("typewriterScrolling", false, function(cm, val, old) {

				if (old && old != CodeMirror.Init) {
					cm.off("changes", onChanges);
				}
				if (val) {
					cm.on("changes", onChanges);
				}

			});

			CodeMirror.commands.scrollSelectionToCenter = function (cm) {

				if (cm.getOption("disableInput")) {
					return CodeMirror.Pass;
				}
						
				if (isTypewriterModeEnabled) {
				
					var cursor = cm.getCursor("from");
					var top = cm.charCoords({line: cursor.line, ch: cursor.ch}, "local").top;
					var halfWindowHeight = cm.getWrapperElement().offsetHeight / 2;
					var scrollTo = Math.round((top - halfWindowHeight));

					cm.scrollTo(null, scrollTo);
				}

			};

			var oldPos = 0;

			function onChanges(cm, changes) {
				
				if (cm.getSelection().length !== 0) {
					return;
				}
				
				var currentPos = cm.cursorCoords().top;
				if (currentPos !== oldPos) {
					cm.execCommand("scrollSelectionToCenter");
					oldPos = cm.cursorCoords().top;
					return;
				}
			}

			CodeMirror.defineExtension('toggleTypewriterMode', function() {
				console.log("toggle typewriter mode");
				isTypewriterModeEnabled = !isTypewriterModeEnabled;
			});

		},
			codeMirrorOptions: {'typewriterScrolling': true},
		}
	},
};