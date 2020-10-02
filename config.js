const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	discordToken: process.env.DISCORD_TOKEN,
	googleApiKey: process.env.GOOGLE_API_KEY,
	prefix: process.env.PREFIX,
	generalRoleId: process.env.GENERAL_ROLE_ID
};