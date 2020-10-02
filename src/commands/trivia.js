// command -> 'bottrivia' for a true/false style question.

const { prefix } = require('../../config');
const fetch = require('node-fetch');

const TRIVIA_URL = 'https://opentdb.com/api.php?amount=1&category=9&type=boolean';

module.exports = {
	name: 'trivia',
	description: 'Start a trivia for users of the server',
	aliases: ['trivia', 'quiz'],
	async execute(message) {
		console.log(message.content.slice(prefix.length));
		if (message.content.slice(prefix.length) === this.name) {
			const resp = await fetch(TRIVIA_URL);
			if (resp.ok) {
				const data = await resp.json();
				// Send the question
				const question = ` Here's your trivia question:\n${data['results'][0]['question']}\n(True/False)`;
				message.channel.send(question);
			}
		}
	}
};
