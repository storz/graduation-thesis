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
	if (section[0] === '') section.shift();
	section[0] = section[0].replace(/[\t\d.]+ /, '');
	for( var i = 0; i < section.length; i++ ) {
		var headlines = section[i].split('\n');
		var indent = makeIndent(nest);
		console.log(indent + no + (i + 1) + ' ' + headlines[0]);
		output += indent + no + (i + 1) + ' ' + headlines[0] + '\n'
		if (headlines.length > 1) {
			addIndex ((i+1)+'.', nest+1, headlines.slice(1).join('\n') );
		}
	}
}

var convert = function (error, data) {
	var dataStr = data.toString().replace(/#.+#\n/, '');
	addIndex('', 0, '\n' + dataStr);
	fs.writeFile('index.txt', output);
};

fs.readFile('index.md', convert);
