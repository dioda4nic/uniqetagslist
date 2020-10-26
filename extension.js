// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "uniquetagslist" is now active!');
  const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('uniquetagslist.uniquetagslist', function () {
    // The code you place here will be executed every time your command is executed
    
    // Get the active text editor
		const editor = vscode.window.activeTextEditor;
    if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			// Get the word within the selection
			const word = document.getText(selection);
     //	const reversed = word.split('').reverse().join('');
     
     let matches = word.matchAll(/<(\s*\w+)[^>]*>/g);
     let tags = new Set() ;
     for (let m of matches) {
       tags.add(m[1]);
     }
     console.log('Unique tag count: ' + tags.size);

     console.log(tags);
      vscode.window.showInformationMessage('Unique tag count: ' + tags.size);
		}


    // Display a message box to the user
    status.text = 'total uniq tags: ${tags.size}';
status.show()    

	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
