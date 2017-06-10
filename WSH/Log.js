var log = function (a, b) {
	var c = '';
	var d = '\r\n';
	var f = String(Object.prototype.toString.apply(a)).replace('[object ', '').replace(']', '');
	if (!b) b = 0;
	if (typeof (a) == 'undefined' && f == 'Object') {
		c += 'undefined [' + f + ']';
		return c
	} else if (a === null && f == 'Object' && typeof (a) == 'object') {
		c += 'null [' + f + ']'
	} else if (f == 'Object' || f == 'Array') {
		c = '[' + f + ']' + d;
		var g = '     ';
		for (var i = 0; i < b; i += 1) {
			g += '     '
		}
		try {
			for (var h in a) {
				if (f == 'Array' && (h == 'forEach' || h == 'indexOf')) continue;
				if (/[^0-9]/gi.test(h)) {
					var j = '"' + h + '"'
				} else {
					var j = "'" + h + "'"
				}
				c += g + j + ' => ' + log(a[h], b + 1) + d
			}
		} catch (e) {
			WScript.Echo(e.message)
		}
	} else {
		if (f == 'String') {
			c += '"' + String(a) + '" [' + f + ']'
		} else if (f == 'Boolean') {
			c += String(a).toUpperCase() + ' [' + f + ']'
		} else if (f == 'Function') {
			c += String(a) + ' [Function]'
		} else {
			c += String(a) + ' [' + f + ']'
		}
	}
	if (b === 0) {
		WScript.Echo(c)
	} else {
		return c
	}
};
var die=function(){WScript.Quit();};