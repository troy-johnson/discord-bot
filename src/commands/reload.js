/*
 * From discord.js docs 
 * https://discordjs.guide/command-handling/
 */

module.exports = {
	name: 'reload',
	description: 'Reloads a command. Reloading saves you from having to restart the bot after updating a command.',
	args: true,
	guildOnly: true,
	execute(message, args) {
		if (!message.member.hasPermission(['ADMINISTRATOR'])) 
			return message.reply("You need to be an admin to do this")

		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) 
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}`);

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Command \`${command.name}\` was reloaded`);
		} catch (error) {
			console.error(error);
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};