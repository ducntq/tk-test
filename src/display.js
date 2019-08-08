module.exports = (data) => {
    if (data.length == 0) {
        console.log('No record found');
        return;
    }
    var keys = Object.keys(data[0]);
    
    for (let i = 0; i < data.length; i++) {
        let record = data[i];
        console.log('======================================')
        for(let j = 0; j < keys.length; j++) {
            console.log(keys[j].padding(40) + record[keys[j]]);
        }
    }
    console.log('======================================')
}

String.prototype.padding = function(n, c)
{
        var val = this.valueOf();
        if ( Math.abs(n) <= val.length ) {
                return val;
        }
        var m = Math.max((Math.abs(n) - this.length) || 0, 0);
        var pad = Array(m + 1).join(String(c || ' ').charAt(0));
        return (n < 0) ? pad + val : val + pad;
};