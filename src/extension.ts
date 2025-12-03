import * as vscode from 'vscode';
import { GroqService } from './groqService';
import { CommentGenerator } from './commentGenerator';

export function activate(context: vscode.ExtensionContext) {
    const groqService = new GroqService(context);
    const commentGenerator = new CommentGenerator(groqService);

    // Generate JSDoc command (Ctrl+Shift+D)
    const generateJSDoc = vscode.commands.registerCommand('dreamdocs.generateJSDoc', async () => {
        await commentGenerator.generateJSDoc();
    });

    // Generate inline comment command (Ctrl+Shift+C)
    const generateInline = vscode.commands.registerCommand('dreamdocs.generateInline', async () => {
        await commentGenerator.generateInlineComment();
    });

    // Set API Key command
    const setApiKey = vscode.commands.registerCommand('dreamdocs.setApiKey', async () => {
        await groqService.setApiKey();
    });

    // Test connection command
    const testConnection = vscode.commands.registerCommand('dreamdocs.testConnection', async () => {
        await groqService.testConnection();
    });

    context.subscriptions.push(generateJSDoc, generateInline, setApiKey, testConnection);
}

export function deactivate() {}