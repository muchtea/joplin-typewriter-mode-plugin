import joplin from 'api';
import { ToolbarButtonLocation, ContentScriptType } from 'api/types';
import { MenuItemLocation } from 'api/types';

/*
 *
 * !Important
 * 
 * This plugin doesn't play nice with the outline plugin, as in, this plugin doesn't work.
 * The contentscript seems to get reset to its standard setting constantly, which resets the on/off state.
 *
 * Bad Solution 1:
 * Using postMessage in the contentScript and onMessage in the index file, you can send the current "isTypewriterModeEnabled" from index to contentscript;
 *     it works with a lot of stuttering.
 * 
 * Bad solution 2:
 * Always have typewritermode activated by setting "isTypewriterModeEnabled" in the contentscript to true.
 *     To Disable, you have to disable the plugin in the options under the plugin tab.
 */

joplin.plugins.register({
	onStart: async function () {
		
		const contentScriptId = 'typewriterScrolling';

		await joplin.contentScripts.register(
			ContentScriptType.CodeMirrorPlugin,
			contentScriptId,
			"./typewriter-scrolling.js"
		);

		await joplin.commands.register({
					name: "toggleTypewriterMode",
					label: "Toggle Typewriter Mode",
					iconName: "fas fa-arrows-alt-v",
					execute: async () => {

						await joplin.commands.execute('editor.execCommand', {
							name: 'toggleTypewriterMode',
							args: []
						});

						await joplin.commands.execute('editor.focus');

					},
				});	

		await joplin.views.toolbarButtons.create("toggleTypewriterMode", "toggleTypewriterMode", ToolbarButtonLocation.NoteToolbar);
		await joplin.views.menus.create("TypewriterModeMenu", "Typewriter Mode", [
			{
				label: "Toggle Typewriter Mode On/Off",
				commandName: "toggleTypewriterMode",
			},
		]);

	},
});
