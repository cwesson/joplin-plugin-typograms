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
				if (token.info != 'typogram') return defaultRender(tokens, idx, options, env, self);

				const diagram = typograms(`\n${token.content}`, 0.3, false);
				console.log(diagram.outerHTML)
				return `
				<div class="typogram-container">
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
