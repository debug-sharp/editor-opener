Sub VisualStudioOpener (versionString, fullPath, line)

	On Error Resume Next
	Err.Clear
	
	Set dte = getObject(,versionString)
	
	If Err.Number <> 0 Then
		Set dte = WScript.CreateObject("VisualStudio.DTE")
		Err.Clear
	End If

	If Err.Number <> 0 Then
		WScript.Echo "Not possible to create visual Studio ActiveXObject by string: " &  versionString
		Err.Clear
	Else
		dte.MainWindow.Activate
		dte.ItemOperations.OpenFile fullPath
		dte.ActiveDocument.Selection.MoveToLineAndOffset line, column + 1
	End If

End Sub