/* 
 * Function to get GuildMember objects from a mention string
 * used in Kick and Ban commands
 
 * from discordjs.guide/miscellaneous/parsing-mention-arguments.html#using-regular-expressions
 * GuildMember: discord.js.org/#/docs/main/11.5.1/class/GuildMember
 */
function getMemberFromMention(message, mention) {
	const matches = mention.match(/^<@!?(\d+)>$/);
	if (!matches) return;
	const id = matches[1];
	return message.guild.members.get(id);
}

exports.getMemberFromMention = getMemberFromMention;