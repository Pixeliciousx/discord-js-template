module.exports = {
  data: {
    name: 'eval',
    description: 'Evaluate JavaScript code',
  },
  async execute(message, args) {
    if (!args || args.length === 0) {
      message.reply('Please provide code to evaluate.');
      return;
    }

    const code = args.join(' ');

    try {
      let result = eval(code);
      let resultString = String(JSON.stringify(result, null, 2));

      if (resultString.length <= 1987) {
        message.reply(`\`\`\`json\n${resultString}\n\`\`\``);
      } else {
        const resultChunks = [];
        while (resultString.length > 0) {
          resultChunks.push(resultString.substring(0, 1987));
          resultString = resultString.substring(1987);
        }

        for (const chunk of resultChunks) {
          message.reply(`\`\`\`json\n${chunk}\n\`\`\``);
        }
      }
    } catch (error) {
      let errorString = error.toString();

      if (errorString.length <= 1987) {
        message.reply(`\`\`\`json\n${errorString}\n\`\`\``);
      } else {
        const errorChunks = [];
        while (errorString.length > 0) {
          errorChunks.push(errorString.substring(0, 1987));
          errorString = errorString.substring(1987);
        }

        for (const chunk of errorChunks) {
          message.reply(`\`\`\`json\n${chunk}\n\`\`\``);
        }
      }
    }
  },
};
