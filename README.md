# Editor Opener
JScript utility to open links in form `editor://open?file=...&amp;line=...` in Visual Studio or your favourite text editor or IDE.

## Instalation
- **Put the contents of the repository to a new empty folder, where you will no longer move the folder in the future**,
  for example `C:\Program Files (x86)\Editor Opener`
- **Run `Install.wsf` by double click on it, better to run as Administrator** and allow all messages by Antivirus,
  because script has to change itself to run properly in the future and to create 
  and run *.bat and *.reg to register all browser links beginning with: `editor://`,
  but if you are still fucking fearful, [read the source code here](https://github.com/debug-sharp/editor-opener/blob/master/Install.wsf), it doesn't send anything about you anywhere:-)
- If you are not sure if everything has been ok, you can run `Install.wsf` anytime again without any consequences.
- If it is not possible to run by double click, run it from command line by: `cscript.exe Install.wsf`
- Once the installation has finished successfully, you should see the window wth text:
  **"Run editor successfully installed."**
- Test it by file: `test.html` in your browser by clocking on editor link
