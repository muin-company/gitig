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

### Example 1: Quick Setup for New Project

```bash
# Auto-detect project type and create .gitignore
$ cd my-new-app
$ gitig init

✓ Detected: Node.js project
✓ Created .gitignore with templates: node, macos
✓ Added 42 ignore rules
```

### Example 2: Full-Stack Project with Multiple Languages

```bash
# Frontend (React) + Backend (Python) + Docker
$ gitig add node,python,vscode,macos

✓ Created .gitignore
✓ Added templates: node, python, vscode, macos
✓ Total rules: 89

# Your .gitignore now covers:
# - node_modules/, .env, build/
# - __pycache__/, .venv/, *.pyc
# - .vscode/ (with settings.json preserved)
# - .DS_Store, ._*
```

### Example 3: Adding to Existing .gitignore Without Loss

```bash
# You already have a custom .gitignore with project-specific rules
$ cat .gitignore
# My custom rules
secrets/
local-config.json

# Add JetBrains IDE support without overwriting
$ gitig add jetbrains --append

✓ Appended to existing .gitignore
✓ Added 12 new rules

# Your custom rules are preserved at the top
```

### Example 4: Preview Before Creating

```bash
# See what a template contains before adding
$ gitig show rust

# Rust
/target/
**/*.rs.bk
Cargo.lock

# Now decide to add it
$ gitig add rust,macos
```

### Example 5: Custom Output Location

```bash
# Generate for review or different location
$ gitig add node,python --output .gitignore.template

✓ Created .gitignore.template

# Review it first, then:
$ mv .gitignore.template .gitignore
```

### Example 6: Monorepo with Mixed Technologies

```bash
# Monorepo with Node.js, Go, Rust services
$ cd my-monorepo
$ gitig add node,go,rust,macos,vscode

✓ Created comprehensive .gitignore
✓ Covers all languages in your monorepo
✓ Added 67 ignore rules

# Now all services share one root .gitignore
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

## Real-World Examples

### 1. Project Bootstrap Scripts

Auto-generate .gitignore during project initialization:

```bash
#!/bin/bash
# scripts/bootstrap.sh

echo "🚀 Bootstrapping new project..."

# Create project structure
mkdir -p src tests docs

# Initialize Git
git init

# Detect project type and create .gitignore
if [ -f "package.json" ]; then
  npx gitig add node,macos,vscode
elif [ -f "requirements.txt" ]; then
  npx gitig add python,macos,vscode
elif [ -f "go.mod" ]; then
  npx gitig add go,macos,vscode
else
  echo "⚠️  Couldn't detect project type"
  npx gitig init
fi

echo "✅ Project ready!"
```

```json
{
  "scripts": {
    "init": "bash scripts/bootstrap.sh"
  }
}
```

### 2. CI/CD Verification

Ensure .gitignore is properly configured:

```yaml
# .github/workflows/gitignore-check.yml
name: Verify .gitignore

on: [push, pull_request]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Verify .gitignore exists
        run: |
          if [ ! -f .gitignore ]; then
            echo "❌ .gitignore missing!"
            echo "Run: npx gitig init"
            exit 1
          fi
      
      - name: Check for common mistakes
        run: |
          # Check if node_modules is ignored
          if ! grep -q "node_modules" .gitignore; then
            echo "⚠️  node_modules not in .gitignore"
            exit 1
          fi
          
          # Check if .env is ignored
          if ! grep -q "\.env" .gitignore; then
            echo "⚠️  .env files not in .gitignore"
            exit 1
          fi
      
      - name: Suggest improvements
        run: |
          echo "📝 Current .gitignore:"
          cat .gitignore
          echo ""
          echo "💡 To regenerate: npx gitig add node,macos,vscode"
```

### 3. Team-Specific Templates

Create custom .gitignore for your team:

```bash
# Generate base template
gitig add node,macos,windows,linux,jetbrains,vscode > .gitignore

# Add team-specific patterns
cat >> .gitignore << 'EOF'

# Team-specific
.secrets/
local-config.json
*.local
.temp/
.cache/
coverage/
.nyc_output/

# Client data (never commit!)
data/*.csv
data/*.json
!data/sample.json
EOF

# Commit as team standard
git add .gitignore
git commit -m "chore: add team .gitignore template"
```

### 4. Monorepo .gitignore Management

Different .gitignore for each package:

```bash
# Root .gitignore (global ignores)
gitig add node,macos,vscode > .gitignore

# Package-specific .gitignore
cd packages/api
gitig add node --append
echo "logs/" >> .gitignore

cd ../frontend
gitig add node --append
echo "build/" >> .gitignore
echo ".cache/" >> .gitignore

cd ../mobile
gitig add node --append
echo "ios/Pods/" >> .gitignore
echo "android/.gradle/" >> .gitignore
```

Automate for all packages:

```bash
# scripts/setup-gitignores.sh
for pkg in packages/*/; do
  echo "Setting up .gitignore for $pkg"
  cd "$pkg"
  gitig add node --output .gitignore
  cd ../..
done
```

### 5. Migration from Legacy .gitignore

Update old .gitignore to modern standards:

```bash
# Backup existing
cp .gitignore .gitignore.backup

# Show differences
gitig add node --output .gitignore.new
diff .gitignore .gitignore.new

# Merge manually or replace
# If you want to keep custom patterns:
cat .gitignore.backup | grep "^# Custom" -A 999 >> .gitignore.new
mv .gitignore.new .gitignore

# Or interactive merge
git merge-file .gitignore .gitignore.backup .gitignore.new
```

### 6. Environment-Specific Ignores

Different patterns for different environments:

```bash
# Local development
gitig add node,macos,vscode > .gitignore

# Production deployment (ignore dev files)
cat >> .gitignore.production << 'EOF'
node_modules/
src/
tests/
*.test.js
.env.development
.env.local
*.map
README.md
EOF

# Docker builds
cat > .dockerignore << 'EOF'
node_modules/
.git/
.env
*.log
coverage/
.vscode/
.idea/
EOF
```

### 7. Pre-commit Hook

Ensure sensitive files aren't committed:

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Check if .env files are staged
if git diff --cached --name-only | grep -E "\.env$|\.env\."; then
  echo "❌ .env files should not be committed!"
  echo "Make sure they're in .gitignore:"
  echo ""
  gitig show node | grep env
  exit 1
fi

# Check if node_modules is staged (shouldn't happen)
if git diff --cached --name-only | grep -q "^node_modules/"; then
  echo "❌ node_modules should not be committed!"
  echo "Regenerate .gitignore: npx gitig add node"
  exit 1
fi

echo "✅ .gitignore checks passed"
```

### 8. Interactive Template Builder

Let users choose templates interactively:

```bash
# scripts/interactive-gitignore.sh
#!/bin/bash

echo "🧙 .gitignore Generator"
echo ""

# Show available templates
echo "Available templates:"
gitig list | grep -v "^Available" | grep -v "^Total"

echo ""
read -p "Select templates (comma-separated, e.g., node,macos,vscode): " templates

if [ -z "$templates" ]; then
  echo "⚠️  No templates selected. Using auto-detect..."
  gitig init
else
  gitig add "$templates"
  echo ""
  echo "✅ Created .gitignore with: $templates"
fi

echo ""
echo "Preview:"
head -20 .gitignore
echo "..."
echo ""
echo "💡 To view full file: cat .gitignore"
```

### 9. Audit Existing Projects

Check if current .gitignore is adequate:

```bash
# scripts/audit-gitignore.sh
#!/bin/bash

echo "🔍 Auditing .gitignore..."

# Check for common patterns
patterns=(
  "node_modules"
  "\.env"
  "\.DS_Store"
  "dist"
  "build"
)

missing=()

for pattern in "${patterns[@]}"; do
  if ! grep -q "$pattern" .gitignore 2>/dev/null; then
    missing+=("$pattern")
  fi
done

if [ ${#missing[@]} -eq 0 ]; then
  echo "✅ .gitignore looks good!"
else
  echo "⚠️  Missing patterns:"
  printf '  - %s\n' "${missing[@]}"
  echo ""
  echo "Suggested fix:"
  echo "  npx gitig add node,macos,vscode"
fi

# Check for tracked files that should be ignored
echo ""
echo "🔎 Checking for tracked files that should be ignored..."
git ls-files | grep -E "node_modules|\.env|\.DS_Store|dist/" && {
  echo "❌ Found files that should be ignored!"
  echo "Run: git rm -r --cached <file>"
} || echo "✅ No issues found"
```

### 10. Multi-Stack Projects

For projects using multiple languages/frameworks:

```bash
# Full-stack web app (Node.js backend + React frontend + Python ML)
gitig add node,python,macos,windows,linux,jetbrains,vscode

# Add custom patterns for your stack
cat >> .gitignore << 'EOF'

# Backend
api/logs/
api/.env.local

# Frontend
frontend/build/
frontend/.cache/

# ML models
ml/models/*.pkl
ml/data/raw/
!ml/data/sample/

# Docker
.dockerignore
docker-compose.override.yml
EOF

# Verify
echo "📝 Generated .gitignore:"
cat .gitignore
```

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © MUIN

---

Made with ❤️ by [MUIN](https://github.com/muin-company)
