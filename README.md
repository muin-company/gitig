# gitig

> Generate .gitignore files instantly. Built-in templates, zero dependencies, works offline.

[![npm version](https://img.shields.io/npm/v/gitig.svg)](https://www.npmjs.com/package/gitig)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org/)

## Features

✨ **Smart Detection** - Automatically detects your project type  
📦 **Built-in Templates** - 10+ templates included, no internet required  
🚀 **Zero Dependencies** - Lightweight and fast  
🔧 **Flexible** - Combine multiple templates, append to existing files  
💻 **Cross-platform** - Works on macOS, Windows, and Linux

## Installation

### Global (recommended)

```bash
npm install -g gitig
```

### Local (per project)

```bash
npm install --save-dev gitig
```

### Use without installing

```bash
npx gitig init
```

## Usage

### Quick Start

```bash
# Auto-detect project and create .gitignore
gitig init
```

### List Available Templates

```bash
gitig list
```

Output:
```
Available templates:

  node         - Node.js
  python       - Python
  go           - Go
  rust         - Rust
  java         - Java
  macos        - macOS
  windows      - Windows
  linux        - Linux
  jetbrains    - JetBrains IDEs
  vscode       - Visual Studio Code

Total: 10 templates
```

### Show Template Contents

```bash
gitig show node
```

### Add Templates Manually

```bash
# Single template
gitig add node

# Multiple templates
gitig add node,macos,vscode

# Append to existing .gitignore
gitig add python --append

# Output to custom file
gitig add rust --output my-gitignore
```

## Examples

### Node.js Project

```bash
cd my-node-project
gitig add node,macos,vscode
```

### Python Project on Windows

```bash
cd my-python-project
gitig add python,windows,vscode
```

### Multi-language Project

```bash
gitig add node,python,go,macos
```

### Update Existing .gitignore

```bash
# Add more templates without overwriting
gitig add jetbrains --append
```

## Available Templates

| Template    | Description         | Includes                                    |
|-------------|---------------------|---------------------------------------------|
| `node`      | Node.js             | node_modules, .env, build outputs           |
| `python`    | Python              | \_\_pycache\_\_, .venv, .pytest_cache       |
| `go`        | Go                  | Binary files, vendor/                       |
| `rust`      | Rust                | target/, Cargo.lock                         |
| `java`      | Java                | .class, .jar, Maven/Gradle artifacts        |
| `macos`     | macOS               | .DS_Store, Icon files                       |
| `windows`   | Windows             | Thumbs.db, desktop.ini                      |
| `linux`     | Linux               | Temporary files, trash folders              |
| `jetbrains` | JetBrains IDEs      | .idea/, .iml files                          |
| `vscode`    | VS Code             | .vscode/ (with exceptions for shared files) |

## Options

```
--append        Append to existing .gitignore instead of overwriting
--output <file> Output to a different file (default: .gitignore)
-h, --help      Show help message
-v, --version   Show version
```

## Why gitig?

**vs gitignore.io:**
- ✅ Works offline
- ✅ Zero dependencies
- ✅ Faster (no network requests)
- ✅ Auto-detection

**vs manual creation:**
- ✅ Comprehensive templates
- ✅ Always up-to-date
- ✅ No copy-paste errors
- ✅ Combine multiple templates easily

## Development

```bash
# Clone the repo
git clone https://github.com/muin-company/gitig.git
cd gitig

# Install dependencies
npm install

# Build
npm run build

# Test
npm test

# Link locally
npm link
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © MUIN

---

Made with ❤️ by [MUIN](https://github.com/muin-company)
