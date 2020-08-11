/**
 * A Starship resource is a single transport craft that has hyperdrive capability.
 * @typedef {Object} Starship
 * @property {string} name The name of this starship. The common name, such as "Death Star".
 * @property {string} MGLT Numeric string: "10" -  The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth.
 * @property {string} consumables: String "3 years" The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.
 */

const compose = require('ramda/src/compose')
const curry = require('ramda/src/curry')
const split = require('ramda/src/split')
const moment = require('moment');

/**
 * 
 * @param {string} s 
 * @returns {string[]} Separates all words
 */
const words = split(' ')

/**
 * Normalizes units from SWAPI to Moment.js. 1 year -> [1, 'years']
 * @param {string} unit The unit of time for resupply length 
 * @returns {string} Normalized unit name for Moment.js
 */
const unitFix = unit => unit.endsWith('s') ? unit : `${unit}s`

/**
 * Duration to hours
 * @param {string[]} consumables
 * @returns {number} Duration in hours
 */
// @ts-ignore
const asHours = ([qty, unit]) => moment.duration(+qty, unitFix(unit)).asHours()

/**
 * @param {string} consumables - The maximum length of time without having to resupply. 
 * @returns {number} Duration in hours 
 */
const supplyDuration = compose(asHours, words)

/**
 * Calculates the number of resupplies of a startship that are needed to reach the distance
 * @param {number} distance 
 * @param {number} megalights 
 * @param {string} consumables 
 */
const resupplies = (distance, megalights, consumables) => 
    Math.round(distance / (megalights * supplyDuration(consumables)))

/**
 * @param {number} distance 
 * @param {Starship} starship 
 */
const starshipFormat = (distance, { name, MGLT, consumables }) => 
    `${name}: ${resupplies(distance, +MGLT, consumables)}`

/**
 * 
 * @param {number} distance The distance to calculate for each starship
 * @param {Starship[]} starships The startships to calculate
 * @returns {string} The formatted result
 */
const resupply = curry((distance, starships) => starships
    .filter(({ MGLT }) => MGLT !== 'unknown')
    .map(starship => starshipFormat(distance, starship))
    .join('\n'))

module.exports = resupply