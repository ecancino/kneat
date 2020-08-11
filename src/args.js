const yargs = require("yargs");

/**
 * @returns {Object} CLI arguments
 */
const parseArgs = () => yargs
    .usage("Usage: -d <distance>")
    .option("d", {
        alias: "distance",
        describe: "Enter the distance to calculate",
        type: "number",
        demandOption: true
    })
    .argv;

module.exports = parseArgs