import * as vscode from 'vscode';
import { GroqService } from './groqService';

export class CommentGenerator {
    constructor(private groqService: GroqService) {}

    async generateJSDoc(): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const position = editor.selection.active;
        const functionCode = this.extractFunction(editor.document, position);
        
        if (!functionCode) {
            vscode.window.showWarningMessage('No function found at current position');
            return;
        }

        const prompt = `Generate a complete JSDoc comment for this JavaScript/TypeScript function. 
        Include @param, @returns, @throws if necessary, and @example.
        Respond ONLY with the JSDoc comment in English, no additional explanations:

        ${functionCode}`;

        const comment = await this.groqService.generateComment(prompt);
        if (comment) {
            await this.insertJSDoc(editor, functionCode, comment);
        }
    }

    async generateInlineComment(): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const position = editor.selection.active;
        const line = editor.document.lineAt(position.line);
        const code = line.text.trim();

        if (!code) {
            vscode.window.showWarningMessage('Line is empty');
            return;
        }

        const prompt = `Generate a concise inline comment for this JavaScript/TypeScript code line.
        The comment should be brief and explain what the line does.
        Respond ONLY with the comment in English (without //, no additional explanations):

        ${code}`;

        const comment = await this.groqService.generateComment(prompt);
        if (comment) {
            await this.insertInlineComment(editor, position.line, comment.replace(/^\/\/\s*/, ''));
        }
    }

    private extractFunction(document: vscode.TextDocument, position: vscode.Position): string | null {
        const text = document.getText();
        const lines = text.split('\n');
        let startLine = position.line;

        // Buscar hacia arriba hasta encontrar el inicio de la función
        while (startLine >= 0) {
            const line = lines[startLine].trim();
            if (line.includes('function') || line.includes('=>') || 
                (line.includes('async') && (line.includes('function') || line.includes('=>'))) ||
                /^\s*(async\s+)?\w+\s*\([^)]*\)\s*{/.test(line)) {
                break;
            }
            startLine--;
        }

        if (startLine < 0) return null;

        // Buscar hacia abajo hasta encontrar el final de la función
        let endLine = startLine;
        let braceCount = 0;
        let inFunction = false;

        for (let i = startLine; i < lines.length; i++) {
            const line = lines[i];
            
            for (const char of line) {
                if (char === '{') {
                    braceCount++;
                    inFunction = true;
                } else if (char === '}') {
                    braceCount--;
                    if (inFunction && braceCount === 0) {
                        endLine = i;
                        return lines.slice(startLine, endLine + 1).join('\n');
                    }
                }
            }
        }

        return lines.slice(startLine, Math.min(startLine + 20, lines.length)).join('\n');
    }

    private async insertJSDoc(editor: vscode.TextEditor, functionCode: string, comment: string): Promise<void> {
        const position = editor.selection.active;
        const document = editor.document;
        
        // Buscar hacia arriba hasta encontrar el inicio de la función
        let functionStartLine = position.line;
        while (functionStartLine >= 0) {
            const line = document.lineAt(functionStartLine).text.trim();
            if (line.includes('function') || line.includes('=>') || 
                (line.includes('async') && (line.includes('function') || line.includes('=>'))) ||
                /^\s*(async\s+)?\w+\s*\([^)]*\)\s*{/.test(line)) {
                break;
            }
            functionStartLine--;
        }

        if (functionStartLine >= 0) {
            const indent = document.lineAt(functionStartLine).text.match(/^\s*/)?.[0] || '';
            const formattedComment = comment
                .split('\n')
                .map(line => indent + line)
                .join('\n') + '\n';

            await editor.edit(editBuilder => {
                editBuilder.insert(new vscode.Position(functionStartLine, 0), formattedComment);
            });
        }
    }

    private async insertInlineComment(editor: vscode.TextEditor, lineNumber: number, comment: string): Promise<void> {
        const line = editor.document.lineAt(lineNumber);
        const indent = line.text.match(/^\s*/)?.[0] || '';
        const commentLine = `${indent}// ${comment}\n`;

        await editor.edit(editBuilder => {
            editBuilder.insert(new vscode.Position(lineNumber, 0), commentLine);
        });
    }
}