const ytdl = require('ytdl-core');
const YouTube = require('youtube-node');
const { googleApiKey } = require('../../config');

const youTube = new YouTube();

youTube.setKey(googleApiKey);

module.exports = {
	name: 'play',
	description: 'Search for and play music on YouTube',
	aliases: ['music', 'song'],
	execute(message) {
		if (message.content.startsWith('!play')) {
			if (message.channel.type !== 'text') return;

			// Search for query string and add results to array to allow user to pick an option
			youTube.search('World War z Trailer', 5, (error, result) => {
				if (error) {
					console.log(error);
				}
				else {
					// console.log(JSON.stringify(result, null, 2));
					result.items.map(item => {
						message.reply(item.snippet.title);
					});
				}
			});

			// Return top 5 results to channel

			// Ask user to pick the option to stream

			// Play the picked option

			const { voiceChannel } = message.member;

			if (!voiceChannel) {
				return message.reply('please join a voice channel first!');
			}

			voiceChannel.join().then(connection => {
				const stream = ytdl('https://www.youtube.com/watch?v=D57Y1PruTlw', {
					filter: 'audioonly'
				});
				const dispatcher = connection.playStream(stream);

				dispatcher.on('end', () => voiceChannel.leave());
			});
		}
	}
};
