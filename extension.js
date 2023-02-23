const vscode = require("vscode")

function activate(context) {
     try {
          const conf = vscode.workspace.getConfiguration("code-runner");
          const old = conf.get("executorMapByFileExtension");
          old[".bel"] = "BeloScript";
     
          conf.update("executorMapByFileExtension", old,vscode.ConfigurationTarget.Workspace)
     } catch (ignored) {}
     //conf.update("executorMapByFileExtension", o);
     //conf.update("code-runner.executorMapByFileExtension",)
     
     //console.log(conf);
     //console.log("Actived BeloScript extension!")
     let disposable = vscode.commands.registerCommand(
          "beloscript.run", function() {
               
               const conf = vscode.workspace.getConfiguration("beloscript")
               let path = conf.get("runlocation");
               if (path == "PATH") path = "BeloScript";
               //console.log(path);
               const filename = vscode.window.activeTextEditor.document.fileName;

               let terminal = vscode.window.activeTerminal;
               if (terminal == undefined) {
                    terminal = vscode.window.createTerminal("BeloScript")
               }
               terminal.sendText(path + " " + filename)
               //vscode.window.showInformationMessage("Running file!");
          }
     )
     context.subscriptions.push(disposable)
}
function deactivate() {}
exports.activate = activate
module.exports = {
     activate,
     deactivate
}