process.env.dataDir = 'test/data';

const assert = require('assert');
const gatherSearch = require('../src/gatherSearchInfo');
const search = require('../src/performSearch');
const promts = require('prompts');

describe('Gather Search Information', () => {
    describe('#gatherSearchInfo()', () => {
        it('should return {file: "users.json", term: "_id", value: "1"}', async () => {
            promts.inject(["1", '_id', "1"]);
            var result = await gatherSearch();
            var expectedResult = {file: "users.json", term: "_id", value: "1"};
            assert.deepEqual(result, expectedResult);
        });
    });

    describe('#performSearch(file, term, value)', () => {
        it('should return user with id 1 & ticket_0 = "A Catastrophe in Korea (North)"', async () => {
            var result = await search('users.json', '_id', '1');
            assert.equal(result[0]._id, 1);
            assert.equal(result[0].ticket_0, 'A Catastrophe in Korea (North)');
        });

        it('should return ticket with id "436bf9b0-1147-4c0a-8439-6f79833bff5b" & organization = "Enthaze" & assignee and submitter = "Francisca Rasmussen"', async () => {
            var result = await search('tickets.json', '_id', '436bf9b0-1147-4c0a-8439-6f79833bff5b');
            assert.equal(result[0]._id, '436bf9b0-1147-4c0a-8439-6f79833bff5b');
            assert.equal(result[0].organization, 'Enthaze');
            assert.equal(result[0].assignee, 'Francisca Rasmussen');
            assert.equal(result[0].submitter, 'Francisca Rasmussen');
        });

        it('should return organization with id 101 & ticket_0 = "A Catastrophe in Korea (North)" & user_0 = "Francisca Rasmussen"', async () => {
            var result = await search('organizations.json', '_id', '101');
            assert.equal(result[0]._id, 101);
            assert.equal(result[0].ticket_0, 'A Catastrophe in Korea (North)');
            assert.equal(result[0].user_0, 'Francisca Rasmussen');
        });
    });
});