const {Collection} = require("discord.js");
const config = require("../../config/main.js");
const fs = require("fs");
const path = require("path");
const {debugEnable} = require("../index.js");

const devCommands = new Collection();

const devCommandsPath = path.join(__dirname, "..", "commands", "developer");
const devCommandFiles = fs.readdirSync(devCommandsPath).filter((file) => file.endsWith(".js"));

for (const file of devCommandFiles) {
	const filePath = path.join(devCommandsPath, file);
	const command = require(filePath);

	if ("data" in command && "execute" in command) {
		devCommands.set(command.data.name, command);
		if (debugEnable) {
			console.log(`Text command "${command.data.name}" registered.`);
			devCommands.set(command.data.name, command);
		} else {
			devCommands.set(command.data.name, command);
		}
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

function isDeveloper(userId) {
const developerIds = require(path.join(__dirname, '..', '..', 'config', 'developers'));
  return developerIds.includes(userId);
}

module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot || !message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = devCommands.get(commandName);

    if (!command) return;

    if (isDeveloper(message.author.id)) {
      try {
        await command.execute(message, args);
      } catch (error) {
        console.error(`Error executing ${commandName}`);
        console.error(error);
      }
    } else {
      message.reply("You do not have permission to use this command.");
    }
  },
};
