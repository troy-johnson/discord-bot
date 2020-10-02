// command -> 'bottrivia' for a true/false style question.

const { prefix } = require('../../config');
const fetch = require('node-fetch');

const TRIVIA_URL = 'https://opentdb.com/api.php?amount=1&category=9&type=boolean';

module.exports = {
	name: 'trivia',
	description: 'Start a trivia for users of the server',
	aliases: ['trivia', 'quiz'],
	async execute(message, client) {
		console.log(message.content.slice(prefix.length));
		if (message.content.slice(prefix.length) === this.name) {
			const resp = await fetch(TRIVIA_URL);
			if (resp.ok) {
				const data = await resp.json();
				// Send the question
				const question = ` Here's your trivia question:\n\n${data['results'][0]['question']}\n\n(True/False)`;
				const correctAnswer = data['results'][0]['correct_answer'];
				message.channel.send(question);
				client.on('message', msg => {
					if (msg.content.slice(prefix.length) !== this.name) {
						if (msg.isMentioned(client.user)) {
							const ans = msg.content.split(' ')[1];
							console.log(ans);
							if (ans === correctAnswer) {
								// const target = msg.mentions.members.first();
								// msg.channel.send(`<@${target.user.id}>Correct answer!`);
								msg.channel.send('Correct answer!');
							}
							else {
								msg.channel.send('Wrong answer!');
							}
						}
					}
				});
			}
		}
	}
};
