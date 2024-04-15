import * as MarkdownIt from "markdown-it";
const typograms = require("./typograms/src/typograms.js");

export default function(context) {
	return {
		plugin: function(markdownIt: MarkdownIt, _options) {
			const defaultRender = markdownIt.renderer.rules.fence || function (tokens, idx, options, env, self) {
				return self.renderToken(tokens, idx, options)
			}

			markdownIt.renderer.rules.fence = function(tokens, idx, options, env, self) {
				const token = tokens[idx];
				if (token.info != 'typogram' && token.info != 'typograms') return defaultRender(tokens, idx, options, env, self);

				const diagram = typograms(`\n${token.content}`, 0.3, false);
				//console.log(diagram.outerHTML)

				// Rich text editor support:
				// The joplin-editable and joplin-source CSS classes mark the generated div
				// as a region that needs special processing when converting back to markdown.
				// This element helps Joplin reconstruct the original markdown.
				const richTextEditorMetadata = `
					<pre
						class="joplin-source"
						data-joplin-language="typogram"
						data-joplin-source-open="\`\`\`typogram\n"
						data-joplin-source-close="\`\`\`"
					>${markdownIt.utils.escapeHtml(token.content)}</pre>
				`;

				return `
				<div class="typogram-container joplin-editable" style="background-color:white">
					${richTextEditorMetadata}
					${diagram.outerHTML}
				</div>
				`;
			}
		},
		assets: function () {
			return []
		},
	}
}
