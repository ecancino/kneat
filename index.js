#!/usr/bin/env node

const args = require('./src/args')
const swapi = require('./src/swapi')
const resupply = require('./src/helpers')

const options = args()

swapi()
    .then(resupply(options.distance))
    .then(console.log)
    .catch(console.error)
