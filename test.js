import path from 'path';

const ctx = {
	succeed: function(out) {
		console.log(out);
		console.log('SUCCESS');
	},
	fail: function(out) {
		console.error(out);
		console.error('FAILURE');
		process.exit(3);
	}
};

let input = '';

process.stdin.on('data', (buf) => {
	input += buf.toString();
});

process.stdin.on('end', () => {
	if (!input) {
		console.error('Must provide test input');
		process.exit(1);
	}

	let json;
	try {
		json = JSON.parse(input);
	} catch (e) {
		console.error('Input must be valid JSON');
		console.error(e);
		process.exit(2);
	}

	Lambda.default(json, ctx);
});
