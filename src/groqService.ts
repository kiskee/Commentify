import * as vscode from 'vscode';
import Groq from 'groq-sdk';

export class GroqService {
    private groq: Groq | null = null;
    private context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.initializeGroq();
    }

    private async initializeGroq() {
        const apiKey = await this.context.secrets.get('groq-api-key');
        if (apiKey) {
            this.groq = new Groq({ apiKey });
        }
    }

    async setApiKey() {
        const apiKey = await vscode.window.showInputBox({
            prompt: 'Enter your Groq API Key',
            password: true,
            placeHolder: 'gsk_...'
        });

        if (apiKey) {
            await this.context.secrets.store('groq-api-key', apiKey);
            this.groq = new Groq({ apiKey });
            vscode.window.showInformationMessage('API Key configured successfully');
        }
    }

    async testConnection(): Promise<void> {
        if (!this.groq) {
            vscode.window.showErrorMessage('Please configure your Groq API Key first');
            return;
        }

        try {
            await this.groq.chat.completions.create({
                messages: [{ role: 'user', content: 'test' }],
                model: 'llama-3.1-8b-instant',
                max_tokens: 10
            });
            vscode.window.showInformationMessage('Groq connection successful');
        } catch (error) {
            vscode.window.showErrorMessage('Error connecting to Groq: ' + error);
        }
    }

    async generateComment(prompt: string): Promise<string | null> {
        if (!this.groq) {
            vscode.window.showErrorMessage('Please configure your Groq API Key first');
            return null;
        }

        try {
            const completion = await this.groq.chat.completions.create({
                messages: [{ role: 'user', content: prompt }],
                model: 'llama-3.1-8b-instant',
                max_tokens: 500,
                temperature: 0.3
            });

            return completion.choices[0]?.message?.content || null;
        } catch (error) {
            vscode.window.showErrorMessage('Error generating comment: ' + error);
            return null;
        }
    }
}