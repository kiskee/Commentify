# Dreamdocs ✨

**Transform your code into beautifully documented dreams!**

Experience the magic of AI-powered documentation with Dreamdocs. Turn your silent code into eloquent, professional documentation that speaks volumes. Powered by Groq AI for lightning-fast, context-aware comment generation.

![Dreamdocs Demo](https://via.placeholder.com/600x300/6366F1/FFFFFF?text=Dreamdocs+Magic)

## 🌟 Features

- 🤖 **AI-Powered Magic**: Leverages Groq's ultra-fast AI models
- 📝 **Dream JSDoc**: Complete function documentation with `@param`, `@returns`, `@throws`, and `@example`
- 💭 **Thoughtful Comments**: Smart inline explanations that make your code speak
- ⚡ **Instant Dreams**: Lightning-fast generation with simple shortcuts
- 🎯 **Mind Reader**: Understands your code's intent and context
- 🔒 **Secure Vault**: API key stored safely in VS Code's secret storage

## 🚀 Quick Start

### 1. Install
Search for "Dreamdocs" in VS Code Extensions or install from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=danielmecoss.dreamdocs)

### 2. Setup Your Dreams
1. Get your free API key from [Groq Console](https://console.groq.com/)
2. Open Command Palette (`Ctrl+Shift+P`)
3. Run "Set Groq API Key"
4. Enter your magical key

### 3. Start Dreaming!
- **`Ctrl+Shift+D`** - Dream up JSDoc documentation
- **`Ctrl+Shift+C`** - Whisper inline comments

## 📖 Dream Examples

### JSDoc Dreams
Place your cursor inside any function and press `Ctrl+Shift+D`:

```javascript
// Before - Silent code
async function createUser(userData, options) {
    // Your mysterious function
}

// After - Dreams come true ✨
/**
 * Creates a new user account with the provided user data and configuration options.
 * @param {Object} userData - The user information object containing personal details
 * @param {string} userData.name - The user's full name
 * @param {string} userData.email - The user's email address
 * @param {Object} options - Configuration options for user creation
 * @param {boolean} options.sendWelcomeEmail - Whether to send a welcome email
 * @returns {Promise<User>} A promise that resolves to the created user object
 * @throws {ValidationError} When user data validation fails
 * @throws {DatabaseError} When database operation fails
 * @example
 * const user = await createUser(
 *   { name: 'John Doe', email: 'john@example.com' },
 *   { sendWelcomeEmail: true }
 * );
 */
async function createUser(userData, options) {
    // Your mysterious function
}
```

### Inline Dreams
Place your cursor on any line and press `Ctrl+Shift+C`:

```javascript
// Before - Cryptic code
const hashedPassword = await bcrypt.hash(password, 10);

// After - Crystal clear ✨
// Hash the password using bcrypt with a salt rounds of 10 for security
const hashedPassword = await bcrypt.hash(password, 10);
```

## 🎯 Supported Languages

- JavaScript
- TypeScript
- More languages coming to your dreams soon!

## ⚙️ Dream Commands

| Command | Shortcut | Description |
|---------|----------|-------------|
| Generate JSDoc Comment | `Ctrl+Shift+D` | Dreams up comprehensive JSDoc documentation |
| Generate Inline Comment | `Ctrl+Shift+C` | Whispers explanatory comments into existence |
| Set Groq API Key | - | Configure your magical API key |
| Test Groq Connection | - | Verify your connection to the dream realm |

## 🔧 Configuration

No complex setup needed! Just set your API key and let the dreams begin.

## 🤝 Join the Dream

Found a bug or have a dream feature request? 
- 🐛 [Report Issues](https://github.com/kiskee/Commentify/issues)
- 💡 [Dream Features](https://github.com/kiskee/Commentify/issues)
- 🔧 [Contribute Magic](https://github.com/kiskee/Commentify/pulls)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Dream Team

- Powered by [Groq AI](https://groq.com/) for ultra-fast inference
- Built with ✨ and dreams for the developer community

---

**⭐ If Dreamdocs makes your code dreams come true, please star us on [GitHub](https://github.com/kiskee/Commentify)!**