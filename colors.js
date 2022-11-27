const chalk = require('chalk');

const redBright = (message) => {
  console.log(chalk.redBright.inverse.bold(`${message}`));
};

const blueBright = (message) => {
  console.log(chalk.blueBright.inverse.bold(`${message}`));
};

const greenBright = (message) => {
  console.log(chalk.greenBright.inverse.bold(`${message}`));
};

module.exports = { redBright, blueBright, greenBright };
