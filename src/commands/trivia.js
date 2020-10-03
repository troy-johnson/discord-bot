// command -> 'bottrivia' for a true/false style question.

const { prefix } = require('../../config');
const fetch = require('node-fetch');

const TRIVIA_URL = 'https://opentdb.com/api.php?amount=1&category=9&type=boolean';

module.exports = {
	name: 'trivia',
	description: 'Start a trivia for users of the server',
	aliases: ['trivia', 'quiz'],
	async execute(message, client) {
		// If this command was called
		if (message.content.slice(prefix.length) === this.name) {
			let questionSent = false;
			// Call API, startTyping() to indicate ongoing task
			message.channel.startTyping();
			const resp = await fetch(TRIVIA_URL);
			if (resp.ok) {
				const data = await resp.json();
				// Send the question
				const question = `Here is your trivia question:\n\n${data['results'][0]['question']}\n\n(True/False)`;
				const correctAnswer = data['results'][0]['correct_answer'];
				message.channel.stopTyping(true);
				if (!questionSent) {
					message.channel.send(question);
					questionSent = true;
				}
				client.on('message', msg => {
					if (msg.content.slice(prefix.length) !== this.name) {
						if (msg.isMentioned(client.user)) {
							const ans = msg.content.split(' ')[1];
							// console.log(ans);
							const target = msg.author;
							// console.log(target);
							if (ans === correctAnswer) {
								msg.channel.send(`${target} Correct answer!`);
								// msg.channel.send('Correct answer!');
							}
							else {
								msg.channel.send(`${target} Wrong answer!`);
							}
						}
					}
				});
			}
		}
	}
};
