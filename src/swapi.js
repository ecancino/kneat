const got = require('got')

const getStarships = async (url) => {
    const { next, results } = await got.get(url).json()
    if (!next) {
        return results;
    }
    return results.concat(await getStarships(next))
}

module.exports = () => getStarships('https://swapi.dev/api/starships?page=1')