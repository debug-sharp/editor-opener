# Editor Opener
JScript utility to open links in form `editor://open?file=...&amp;line=...` in Visual Studio or your favourite text editor or IDE.

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
- to add any other editor, edit file `Opener.wsf`, it's nice and short, you will see, what to do
- Desharp can automaticly detect which version of Visual Studio you are using
- just let Desharp logs output format to HTML
  - click on any editor:// link inside
  - throw any exception in you ASP.NET application to see rendered exception in browser response with editor:// links.
