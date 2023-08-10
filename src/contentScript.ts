import * as MarkdownIt from "markdown-it";

export default function(context) {
	return {
		plugin: function(markdownIt: MarkdownIt, _options) {
			const defaultRender = markdownIt.renderer.rules.fence || function (tokens, idx, options, env, self) {
				return self.renderToken(tokens, idx, options)
			}

			markdownIt.renderer.rules.fence = function(tokens, idx, options, env, self) {
				const token = tokens[idx];
				if (token.info != 'typogram') return defaultRender(tokens, idx, options, env, self);

				return `
				<div class="typogram-container">
					Typograms!<br/>
					${token.content}<br/>
					Typograms!
				</div>
				`;
			}
		},
		assets: function () {
			return []
		},
	}
}
