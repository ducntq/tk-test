const bfj = require('bfj');
const bfjc = require('bfj-collections');
const fs = require('fs');

module.exports = async (file, term, value) => {
    var result = await search(file, term, value);

    if (file == 'users.json') {
        for(let i = 0; i < result.length; i++) {
            var record = result[i];
            var tickets = [];
            tickets = tickets.concat(await search('tickets.json', 'submitter_id', record._id));
            tickets = tickets.concat(await search('tickets.json', 'assignee_id', record._id));
            for(let j = 0; j < tickets.length; j++) {
                record[`ticket_${j}`] = tickets[j].subject;
            }

            var orgs = await search('organizations.json', '_id', record.organization_id);
            if (orgs !== undefined && orgs.length > 0) record.organization_name = orgs[0].name;
            result[i] = record;
        }
    }
    else if (file == 'organizations.json') {
        for(let i = 0; i < result.length; i++) {
            var record = result[i];
            var tickets = await search('tickets.json', 'organization_id', record._id);
            for(let j = 0; j < tickets.length; j++) {
                record[`ticket_${j}`] = tickets[j].subject;
            }
            var users = await search('users.json', 'organization_id', record._id);
            for(let j = 0; j < users.length; j++) {
                record[`user_${j}`] = users[j].name;
            }
            result[i] = record;
        }
    } else if (file == 'tickets.json') {
        for(let i = 0; i < result.length; i++) {
            var record = result[i];
            var assignees = await search('users.json', '_id', record.assignee_id);
            var submitters = await search('users.json', '_id', record.submitter_id);
            var orgs = await search('organizations.json', '_id', record.organization_id);
            if (assignees.length > 0) record.assignee = assignees[0].name;
            if (submitters.length > 0) record.submitter = submitters[0].name;
            if (orgs.length > 0) record.organization = orgs[0].name;
            result[i] = record;
        }
    }

    return result;
};

async function search(file, term, value) {
    var path = `${process.env.dataDir}/${file}`;
    var result = [];
    return new Promise((resolve, reject) => {
        bfjc(fs.createReadStream(path))
            .on('bfjc', data => {
                if (data[term] == value) {
                    result.push(data);
                }
            })
            .on(bfj.events.endObject, () => {
                resolve(result);
            }
        );
    });
};