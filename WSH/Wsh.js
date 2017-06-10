var Wsh = {
	Fso: new ActiveXObject('Scripting.FileSystemObject'),
	typeOf: function (o) {
		var r = Object.prototype.toString.apply(o); // "[object Something]"
		return r.substr(8, r.length - 9); // Something
	},
	clone: function () {
		return this._objectClone(o);
	},
	extend: function (obj, defaultValues) {
		obj = obj || {};
		defaultValues = defaultValues || {};
		var r = {}, key = '';
		for (key in obj) {
			r[key] = obj[key];
		}
		for (key in defaultValues) {
			if (typeof(obj[key]) == 'undefined') r[key] = defaultValues[key];
		}
		return r;
	},
	isset: (function () {
		var isset = function (object, indexesStr) {
			var result = true,
				arr = [object],
				iterator = 0,
				indexes = typeof (indexesStr) == 'string' ? indexesStr.split('.') : [];
			if (isset.test(object)) {
				if (typeof (indexesStr) != 'string') {
					return isset.test(object[indexesStr])
				}
				for (var i = 0, l = indexes.length; i < l; i += 1) {
					arr[iterator + 1] = arr[iterator][indexes[i]];
					if (!isset.test(arr[iterator + 1])) {
						result = false
					}
					iterator += 1
				}
			} else {
				result = false
			};
			return result;
		};
		isset.test = function (val) {
			return (typeof (val) != 'undefined' && val !== null) ? true : false
		};
		return isset;
	})(),
	inputDialog: function (text, title, defaultOption, allowedOptions) {
		text = text || '';
		title = title || '';
		defaultOption = defaultOption || null;
		allowedOptions = allowedOptions || [];
		var i = 0, l = 0,
			result = 0,
			responseInt = 0,
			allowedOption = false,
			// Open the input dialog box using a function in the InputBox.vb file.
			responseStr = WSHInputBox(text, title, defaultOption);
		// if not cancel
		if (responseStr !== null && responseStr !== undefined) {
			responseStr = responseStr.replace(/[^0-9]/g, '');
			responseInt = parseInt(responseStr, 10);
			allowedOption = false;
			for (i = 0, l = allowedOptions.length; i < l; i += 1) {
				if (responseInt === allowedOptions[i]) {
					allowedOption = true;
					break;
				}
			}
			if (allowedOption) {
				result = responseInt;
			} else {
				return arguments.callee.apply(this, [].slice.apply(arguments));
			}
		}
		return result;
	},
	echo: function (str) {
		WScript.Echo(str);
	},
	/****************************************************************************************************/
	_objectClone: function(obj1){
		var obj2;
		if(jDiet['typeOf'](obj1)=='array'){
			obj2 = this._arrayClone(obj1)
		}else{
			if(typeof(obj1) == 'object'){
				if(!obj1){
					obj2 = null
				}else{
					obj2 = {};
					for(var i in obj1){
						var val = obj1[i];
						if(typeof(val) == 'object'){
							obj2[i] = arguments.callee(val)
						}else{
							obj2[i] = val
						}
					}
				}
			}else{
				obj2 = obj1
			}
		}
		return obj2
	},
	_arrayClone: function(obj1){
		var obj2;
		if(jDiet['typeOf'](obj1)=='object'){
			obj2 = this._objectClone(obj1)
		}else{
			if(typeof(obj1) == 'object'){
				obj2 = [];
				for(var i in obj1){
					var val = obj1[i];
					if(typeof(val) == 'object'){
						if(!val){
							obj2[i] = null
						}else{
							obj2[i] = arguments.callee(val)
						}
					}else{
						obj2[i] = val
					}
				}
			}else{
				obj2 = obj1
			}
		}
		return obj2
	}
}