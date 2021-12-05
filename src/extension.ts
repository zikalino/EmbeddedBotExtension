// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let openWebview = vscode.commands.registerCommand('embeddedbot.helloWorld', () => {
	  const panel = vscode.window.createWebviewPanel(
	  'openWebview', // Identifies the type of the webview. Used internally
	  'Example Page', // Title of the panel displayed to the user
	  vscode.ViewColumn.One, // Editor column to show the new webview panel in.
	  { // Enable scripts in the webview
		  enableScripts: true //Set this to true if you want to enable Javascript. 
	  }
	  );

	  let secret = vscode.workspace.getConfiguration('embeddedview').get("secret");
	  if (secret !== null && secret !== undefined) {
	  	panel.webview.html = getWebviewContent(secret as string);
	  } else {
		vscode.window.showInputBox({ value: undefined, prompt: "Enter secret", placeHolder: undefined, password: true }).then((enteredSecret) => {
			if (enteredSecret === undefined) {
				return;
			}
			if (enteredSecret) {
				secret = enteredSecret;
				vscode.workspace.getConfiguration("embeddedview").update("secret", secret);
			}
			panel.webview.html = getWebviewContent(secret as string);
		});	  }

	});
	context.subscriptions.push(openWebview);
  }
  
// this method is called when your extension is deactivated
export function deactivate() {}

function getWebviewContent(secret: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example Webview</title>
</head>
<body>
	<iframe src='https://webchat.botframework.com/embed/codebotx?s=` + secret + `' height="1024" width="100%"></iframe>
</body>
</html>`;
}
