var fs = require('fs');
var output = '';

function makeIndent (nest) {
	var indent = '';
	for(var i = 0; i < nest; i++) {
		indent = indent + '  ';
	}
	return indent;
}

function addIndex (no, nest, sectionStr) {
	var sectionRegex = new RegExp('\n' + '\t{' + nest + '}[^\t]. ');
	var section = sectionStr.split(sectionRegex);
	if (section[0]) section[0] = section[0].replace(/[\t\d.]+ /, '');
	if (section[0] === '') section.shift();
	for( var i = 0; i < section.length; i++ ) {
		var headlines = section[i].split('\n');
		var indent = makeIndent(nest);
		var sectionNo = no.concat();
		sectionNo.push(String(i+1));
		console.log(indent + sectionNo.join('.') + ' ' + headlines[0]);
		output += indent + sectionNo.join('.') + ' ' + headlines[0] + '\n'
		if (headlines.length > 1) addIndex(sectionNo, nest+1, headlines.slice(1).join('\n') );
	}
}

var convert = function (error, data) {
	var dataStr = data.toString().replace(/#.+#\n/g, '');
	var footer = '\n' + data.toString().replace(/#.+#\n/, '').match(/#.+#\n/g).join('').replace(/[# ]/g, '');
	addIndex([], 0, '\n' + dataStr);
	console.log(footer);
	fs.writeFile('index.txt', output + footer);
};

fs.readFile('index.md', convert);
