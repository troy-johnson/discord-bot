const ytdl = require('ytdl-core');

module.exports = {
	name: 'play',
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
	aliases: ['music', 'song'],
	execute(message) {
		if (message.content === '!play') {
			if (message.channel.type !== 'text') return;

      // Search for video
      // Return top 10 results to channel and ask user to pick the option to stream
      // Play the picked option

			const { voiceChannel } = message.member;

			if (!voiceChannel) {
				return message.reply('please join a voice channel first!');
      }

			voiceChannel.join().then(connection => {
				const stream = ytdl('https://www.youtube.com/watch?v=D57Y1PruTlw', {
					filter: 'audioonly',
				});
				const dispatcher = connection.playStream(stream);

				dispatcher.on('end', () => voiceChannel.leave());
			});
		}
	},
};
