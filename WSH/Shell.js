var Shell = {
	_cmd: new ActiveXObject("WScript.Shell"),
	// exec command fn with stdout
	Exec: function (cmd) {
		var oExec   	= this._cmd.Exec(cmd),
			resultBool	= true,
			resultStr	= '',
			tryCount	= 0,
			loopEnd		= false,
			localOutStr	= '';
		while (true) {
			loopEnd = false;
			if (!oExec.StdOut.AtEndOfStream) {
				loopEnd = true;
				localOutStr = oExec.StdOut.ReadAll();
			}
			if (!oExec.StdErr.AtEndOfStream) {
				loopEnd = true;
				resultBool = false;
				localOutStr = oExec.StdErr.ReadAll();
			} 
			if (!loopEnd) {
				if (tryCount++ > 10 && oExec.Status == 1) {
					break;
				}
				WScript.Sleep(100);
			} else {
				resultStr += localOutStr;
				tryCount = 0;
			}
		}
		return {
			success: resultBool, 
			data: resultStr
		};
	},
	// run command fn without stdout
	Run: function (cmd) {
		return this._cmd.Run(cmd);
	},
	SaveAndExec: function (cmdStr, cmdAbsPath) {
		var commandResult = {},
			cmdFileStream = Wsh.Fso.CreateTextFile(cmdAbsPath, true, false); // for overwriting, not as Unicode
		cmdFileStream.Write(cmdStr);
		cmdFileStream.Close();
		commandResult = this.Exec(cmdAbsPath);
		commandResult.path = cmdAbsPath;
		return commandResult;
	},
	RemoveFile: function (cmdAbsPath) {
		Wsh.Fso.DeleteFile(cmdAbsPath);
	},
	CheckFileLength: function (fileAbsolutePath) {
		var resultFile = Wsh.Fso.GetFile(fileAbsolutePath);
		return (resultFile.Size > 0) ? true : false;
	},
	GetEnvironmentVariable: function (varName) {
		varName = '%' + String(varName).trim('%') + '%';
		return this._cmd.ExpandEnvironmentStrings(varName);
	}
}