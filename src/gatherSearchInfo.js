const prompts = require('prompts');

module.exports = async () => {
    var file;
    var searchFileResp = await prompts({
        type: 'text',
        name: 'value',
        message: 'Select 1) Users or 2) Tickets or 3) Organizations',
        validate: value => ['1', '2', '3', 'quit'].includes(value)
    });
    var searchableFields = require('./searchableFields');
    var fields;
    switch (searchFileResp.value) {
        case 'quit':
            process.exit(0);
            break;
        case '1':
            file = 'users.json';
            fields = searchableFields.users;
            break;
        case '2':
            file = 'tickets.json';
            fields = searchableFields.tickets;
            break;
        case '3':
            file = 'organizations.json';
            fields = searchableFields.organizations;
            break;
        default: break;
    }
    var searchTermResp = await prompts({
        type: 'text',
        name: 'value',
        message: 'Enter search term',
        validate: value => fields.includes(value)
    });
    if (searchTermResp.value == 'quit') process.exit(0);
    var searchValueResp = await prompts({
        type: 'text',
        name: 'value',
        message: 'Enter search value'
    });
    if (searchValueResp.value == 'quit') process.exit(0);
    return {file: file, term: searchTermResp.value, value: searchValueResp.value};
};