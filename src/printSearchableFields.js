module.exports = () => {
    var fields = require('./searchableFields');
    var keys = Object.keys(fields);
    for(let i in keys) {
        var fileName = keys[i];
        var file = fields[fileName];
        console.log('=============================================');
        console.log(`Search ${fileName} with: `);
        for(let j in file) {
            console.log(file[j]);
        }
    }
    console.log('=============================================');
    console.log('');
    console.log('');
};