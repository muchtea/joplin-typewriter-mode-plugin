import joplin from 'api';
import { ToolbarButtonLocation, ContentScriptType } from 'api/types';


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
