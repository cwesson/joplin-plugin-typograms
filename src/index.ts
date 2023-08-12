import joplin from 'api';
import { ContentScriptType } from 'api/types'

const Config = {
	MarkdownFenceId: 'typogram',
}

const Templates = {
	Fence: '```typogram\n\n```',
}

const CommandsId = {
	Fence: 'typograms-fenceTemplate',
}

joplin.plugins.register({
	onStart: async function() {
		// Register command
		await joplin.commands.register({
			name: CommandsId.Fence,
			label: 'Insert Typograms block template',
			iconName: 'fas fa-pencil',
			execute: async () => {
				await joplin.commands.execute('insertText', Templates.Fence)
			},
		})
		
		// Content Scripts
		await joplin.contentScripts.register(
			ContentScriptType.MarkdownItPlugin,
			Config.MarkdownFenceId,
			'./contentScript.js',
		)
	},
});
