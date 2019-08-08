process.env.dataDir = 'data';

const prompts = require('prompts');
const printSearchableFields = require('./printSearchableFields');
const gatherSearchInfo = require('./gatherSearchInfo');
const performSearch = require('./performSearch');
const display = require('./display');

console.log(`Type 'quit' to exit at any time, Press 'Enter' to continue`);

(async () => {
    while (true) {
        console.log('Select search options:')
        console.log('  1) Search');
        console.log('  2) View a list of searchable fields')
        console.log('');
        var optionsResp = await prompts({
            type: 'text',
            name: 'value',
            message: 'Select an option',
            validate: value => ['1', '2', 'quit'].includes(value)
        });
        console.log('');
        if (optionsResp.value == 'quit') process.exit(0);
        else if (optionsResp.value == '1') {
            while(true) {
                var {file, term, value} = await gatherSearchInfo();
                var data = await performSearch(file, term, value);
                display(data);
            }
        } else if (optionsResp.value == '2') {
            printSearchableFields();
        } else {
            console.log('Invalid input');
            console.log('');
        }
    }
})();