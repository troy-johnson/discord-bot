const { prefix } = require('../../config');
const UserHelper = require('./helpers/UserHelper');

module.exports = {
	name: 'ban',
	description: 'Ban a member.',
	guildOnly: true,
	execute(message) {
		/* Invoking user needs to have the BAN_MEMBERS perm. Admin perm overrides this by default.
		 * https://discordjs.guide/popular-topics/permissions.html#checking-for-permissions
		 */
		if (!message.member.hasPermission(['BAN_MEMBERS']))
			return message.reply("You don't have the permission to do this");
		if (!message.mentions.users.size)
			return message.reply('You need to tag a user to ban');

		const args = message.content.slice(prefix.length).trim().split(' ');
		const taggedUser = UserHelper.getMemberFromMention(message, args[1]);
		const username = taggedUser.user.username;
		const reason = args.slice(2).join(' ');
		
		taggedUser.ban(`${message.author.username}: ${reason}`) // add executing user to reason (to know who did it in the audit log)
		.then(() => {
			let output = reason ? `You banned ${username} for ${reason}` : `You banned ${username}`;
			message.channel.send(output);
		})
		.catch((err) => {
			console.error(err);
			message.channel.send(`Failed to banned: ${err}`);
		})
	},
};

