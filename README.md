# Editor Opener
JScript utility to open Desharp log links and rendered exception links like: 'editor://open?file=...&line=...' efectively back in Visual Studio or your favourite text editor or IDE.

This tool is proudly based on this script: **[Opening files in IDE by one click from Tracy's page](https://pla.nette.org/en/how-open-files-in-ide-from-debugger)**

## Instalation
- **Put the contents of the repository to a new empty folder, where you will no longer move the folder in the future**, for example `C:\Program Files (x86)\Editor Opener`
- **Run `Install.wsf` by double click on it, better to run as Administrator**
  - allow all messages by Antivirus
    - because script has to change itself to run properly in the future
    - because script has to create and run *.bat and *.reg files to register all browser links beginning with: `editor://` to be handled in the future by Opener.wsf
    - if you are still fucking fearful, [read the source code here](https://github.com/debug-sharp/editor-opener/blob/master/Install.wsf), it doesn't send anything about you anywhere:-)
  - if you are not sure if everything has been ok, you can run `Install.wsf` anytime again without any consequences.
  - if it is not possible to run by double click, run it from command line by: `cscript.exe Install.wsf`
- Once the installation has finished successfully, you should see the window wth text: **"Run editor successfully installed."**

## Test
- open file: `test.html` in your favourite browser and click on any editor link you have installed on your local machine
- if you see after second opened file `test.html` in chosen editor, everything works fine and you can use Desharp HTML logs and Desharp web application exceptions in responses more efectively

## Usage
- Desharp can automaticly detect, which version of Visual Studio you are currently using, so it's not necessary to change anything, Desharp will always add proper param to open files in currently installed visual studio
- to use this Editor Opener in other developer platforms and to realy add any other editor, edit file `Opener.wsf`, it's nice and short, you will see, what to do
- let Desharp logs output format to **html** by config settings `<add key="Desharp:Output" value="html" />`
  - call: `Desharp.Debug.Log(obj, Level.INFO);`
    - click on any `editor://` link inside `~/logs/info.html` file opened in your browser to see what happends
  - throw any exception in you ASP.NET application: `throw new Exception("msg");`
    - click on any `editor://` link in rendered exception in browser response to see what happends
