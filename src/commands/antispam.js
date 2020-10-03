/*
 * #7
 * Allows new server members to send a chat message to the bot with a specific
 * message. If received correctly, the bot gives them a general role which lets
 * them see any channels available to that role.
 */

const { prefix, generalRoleId } = require('../../config');

const specificMessage = 'I have read the rules';

module.exports = {
	name: 'verify',
	description: 'Verify command for anti-spam purposes.',
	execute(message) {
		// The only way for the bot to know which server to give roles in is
		// for the user to initiate the verification process in that server first.

		if (message.channel.type === 'dm') {
			// verification step 2/2 happens in the bot's dms

			const args = message.content.slice(prefix.length).trim().split(' ');
			const userMsg = args.slice(1).join(' ');

			if(userMsg.toLowerCase() == specificMessage.toLowerCase()) { // verify that the specific msg was sent
				const userGuildMember = message.client.expecting_verification[message.author.id];

				userGuildMember.addRole(generalRoleId)
					.then(() => {
						message.reply(`\`Verification [2/2]\`\nYou have successfully verified yourself and have been given the role`);
						delete message.client.expecting_verification[message.author.id];
					})
					.catch(err => {
						console.log('Make sure the role id is set in the config file. You can copy the id from the server settings.');
						console.error(err);
						message.channel.send(`Unable to give you the role: ${err}`);
					})
			}
			return;
		}

		// verification step 1 happens in the server
		const uid = message.author.id;

		if (!message.client.expecting_verification)
			message.client.expecting_verification = {};

		message.client.expecting_verification[uid] = message.member; // store GuildMember obj in client. Used as state storage here.

		message.reply(`\`Verification [1/2]\`\nNext, **DM** me with\n\`!verify ${specificMessage}\``)
			.then((m) => m.delete(15000)) // Clean up bot's message after 15s

		message.delete(3000); // Clean up user's message after 3s
	},
};
