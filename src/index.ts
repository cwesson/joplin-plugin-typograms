import joplin from 'api';
import { ContentScriptType } from 'api/types'

const Config = {
	MarkdownFenceId: 'typogram',
}
const Templates = {
	Fence: '```typogram\n\n```',
}

joplin.plugins.register({
	onStart: async function() {
		// Content Scripts
		await joplin.contentScripts.register(
			ContentScriptType.MarkdownItPlugin,
			Config.MarkdownFenceId,
			'./contentScript.js',
		)
	},
});
