import * as handlers from './events';
import request from 'request';

function capitalize(word) {
	return word.slice(0,1).toUpperCase() + word.slice(1);
}

function camel(str, sep = /[\-:]/) {
	const words = str.toLowerCase().split(sep);
	return words.map((w, i) => i === 0 ? w : capitalize(w)).join("");
}

export default function(e, ctx) {
	const camelEvent = camel(e.event);
	const handler = handlers[camelEvent];
	if (!handler) {
		ctx.fail(`No handler for event type ${camelEvent}`);
	}
	const message = handler(e);

	request({
		url: process.env.SLACK_URL,
		method: "POST",
		json: true,
		body: {
			username: "npm-bot",
			icon_emoji: ":robot_face:",
			text: message
		}
	}, (error, resp, body) => {
		if (error) {
			return ctx.fail({ error });
		}
		return ctx.succeed();
	});
};
