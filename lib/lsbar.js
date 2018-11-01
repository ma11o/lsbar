var fs = require('fs');
var colors = require('colors');

exports.lsbar = function () {

    try {
        var list = fs.readdirSync('.');
        var size = [];
        for (var i = 0; i < list.length; i++) {
            size.push(fs.statSync(list[i]).size);
        }
        var max = Math.max.apply(null, size);
        var average = max / 2;
        var barMax = 100;

        for (var i = 0; i < list.length; i++) {
            var stat = fs.statSync(list[i]);
            var len = (stat.size < average) ? barMax * (stat.size / average) : barMax;
            var bar = '';

            for (var j = 0; j < len; j++) {
                bar += ' ';
            }
            console.log(list[i] + ' ' + colors.blue(stat.size) + ' ' + colors.bgGreen(bar));
        }
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }

}