
const resupply = require('./src/helpers')

const startships = [
    { name: 'Y-wing', MGLT: '80', consumables: '1 week' },
    { name: 'Millennium Falcon', MGLT: '75', consumables: '2 months' },
    { name: 'Rebel Transport', MGLT: '20', consumables: '6 months' }
]

describe('resupply', () => {
    it('should return an empty string if the array is empty', async () => {
        expect(resupply(1000000, [])).toBe(``);
    });

    it('should return the name and resupplies message for each starship ', async () => {
        expect(resupply(1000000, startships)).toBe(`Y-wing: 74\nMillennium Falcon: 9\nRebel Transport: 11`);
    });
});