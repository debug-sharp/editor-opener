Class.Define('Editor', {
	Static: {
		CURRENT_DIR: '',
		CURRENT_FILE: '',
		URL_PATTERN: /^editor:\/\/open\/\?file=(.+)&line=(\d+)/,
		DEFAULT_EDITOR: '',
		EDITORS_COMMANDS: {}
	},
	url: '',
	file: '',
	line: '',
	editor: '',
	editorCommand: '',
	Constructor: function () {
		this.setUpUrlFromWindowsScriptHostArguments();
		var match = this.self.URL_PATTERN.exec(this.url);
		if (match) {
			this.setUpFileLinePreferedEditorAndFinalCommand(match);
			if (this.editor.substr(0, 4) == 'MSVS') {
				try {
					VisualStudioOpener(this.editorCommand, this.file, this.line);
				} catch (e) {
					log(e.Message);
				}
			} else {
				this.completeAndRunWindowsBatchCommandToRunEditor();
			}
		} else {
			log('[' + this.self.CURRENT_FILE + "] Called url doesn't match pattern: '" + this.self.URL_PATTERN + "', please correct link syntax.");
		}
	},
	setUpUrlFromWindowsScriptHostArguments: function () {
		var url = WScript.Arguments(0);
		url = decodeURIComponent(url);
		this.url = url.replace(/&amp;/gi, '&');
	},
	setUpFileLinePreferedEditorAndFinalCommand: function (match) {
		this.file = decodeURIComponent(match[1]).replace(/\+/g, ' ');
		this.line = decodeURIComponent(match[2]);
		
		var match = /editor=(.+)/.exec(this.url);
		var matchType = String(Object.prototype.toString.apply(match)).replace('[object ', '').replace(']', '');
		if (matchType == 'Array' && typeof(match[1]) == 'string') {
			var editorParam = String.trim(match[1], " ");
			if (typeof(this.self.EDITORS_COMMANDS[editorParam]) == 'string') {
				this.editorCommand = this.self.EDITORS_COMMANDS[editorParam];
				this.editor = editorParam;
			}
		}
		if (this.editorCommand.length === 0) {
			this.editorCommand = this.self.EDITORS_COMMANDS[this.self.DEFAULT_EDITOR];
			this.editor = this.self.DEFAULT_EDITOR;
		}
	},
	completeAndRunWindowsBatchCommandToRunEditor: function () {
		// create temporary command file to run editor command script
		var tempCmdFileName = this.self.CURRENT_FILE.replace('wsf', 'bat');
		var tempCmdFilePath = this.self.CURRENT_DIR.replace(/\//g, '\\') + '\\' + tempCmdFileName;
		
		var tempCmdFileStream = Wsh.Fso.CreateTextFile(tempCmdFilePath, true, false); // for overwriting, not as Unicode
		
		// write command into temporary command file
		var command = this.editorCommand
			.replace(/%line%/g, this.line)
			.replace(/%file%/g, this.file)
			.replace(/\\/g, '\\\\');
		tempCmdFileStream.Write(command);
		tempCmdFileStream.Close();
		
		// run command in temp file
		Shell.SaveAndExec(command, tempCmdFilePath);
		
		// delete temp file
		Wsh.Fso.DeleteFile(tempCmdFilePath);
	}
});