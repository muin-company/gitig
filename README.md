# gitig

> Generate .gitignore files instantly. Built-in templates, zero dependencies, works offline.

[![npm version](https://img.shields.io/npm/v/gitig.svg)](https://www.npmjs.com/package/gitig)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org/)

## Features

✨ **Smart Detection** - Automatically detects your project type  
⭐ **Popular Templates** - Quick access to most commonly used templates  
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
# List all templates
gitig list

# Show only popular templates
gitig list --popular
```

Output (with `--popular`):
```
⭐ Popular templates:

⭐ node         - Node.js
⭐ python       - Python
⭐ go           - Go
⭐ rust         - Rust
⭐ macos        - macOS
⭐ jetbrains    - JetBrains IDEs
⭐ vscode       - Visual Studio Code

Total: 7 templates
```

All templates include popularity indicators (⭐) in the regular list.

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

## Options

```
--append        Append to existing .gitignore instead of overwriting
--output <file> Output to a different file (default: .gitignore)
-h, --help      Show help message
-v, --version   Show version
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

## Real-World Examples

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

### Example 7: Project Bootstrap Scripts

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

### Example 8: Migration from Legacy .gitignore

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

### Example 9: Environment-Specific Ignores

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

### Example 10: Multi-Stack Projects

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

## Integration Guides

### CI/CD Integration

#### GitHub Actions

Verify .gitignore is properly configured in your CI pipeline:

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

#### GitLab CI

```yaml
# .gitlab-ci.yml
gitignore-check:
  stage: validate
  script:
    - |
      if [ ! -f .gitignore ]; then
        echo "Missing .gitignore - generating..."
        npx gitig init
        git diff --exit-code .gitignore || {
          echo "New .gitignore generated. Please commit it."
          exit 1
        }
      fi
  only:
    - merge_requests
```

#### CircleCI

```yaml
# .circleci/config.yml
version: 2.1

jobs:
  validate-gitignore:
    docker:
      - image: node:18
    steps:
      - checkout
      - run:
          name: Check .gitignore
          command: |
            npx gitig show node > expected.gitignore
            if ! diff -q .gitignore expected.gitignore > /dev/null; then
              echo "⚠️  .gitignore differs from template"
              echo "Consider updating: npx gitig add node --append"
            fi

workflows:
  validate:
    jobs:
      - validate-gitignore
```

### Pre-commit Hooks

#### Using Husky

```bash
# Install husky
npm install --save-dev husky

# Initialize husky
npx husky install

# Add pre-commit hook to verify .gitignore
npx husky add .husky/pre-commit "npx gitig-verify"
```

Create `scripts/gitig-verify.sh`:

```bash
#!/bin/bash
# scripts/gitig-verify.sh

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

Make it executable:

```bash
chmod +x scripts/gitig-verify.sh
```

#### Manual Git Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Ensure sensitive files aren't committed
SENSITIVE_PATTERNS=(
  "\.env"
  "\.env\."
  "secrets/"
  "\.pem$"
  "\.key$"
  "config/local"
)

STAGED_FILES=$(git diff --cached --name-only)

for pattern in "${SENSITIVE_PATTERNS[@]}"; do
  if echo "$STAGED_FILES" | grep -qE "$pattern"; then
    echo "❌ Sensitive file detected: $pattern"
    echo "These should be in .gitignore:"
    echo ""
    echo "$STAGED_FILES" | grep -E "$pattern"
    echo ""
    echo "Fix: npx gitig add node,macos,vscode"
    exit 1
  fi
done

echo "✅ No sensitive files detected"
```

### Package.json Scripts

Add gitig commands to your package.json for easy access:

```json
{
  "scripts": {
    "gitignore:init": "gitig init",
    "gitignore:update": "gitig add node,macos,vscode,jetbrains",
    "gitignore:check": "bash scripts/verify-gitignore.sh",
    "gitignore:backup": "cp .gitignore .gitignore.backup",
    "gitignore:restore": "cp .gitignore.backup .gitignore",
    "postinstall": "npm run gitignore:check"
  }
}
```

Verification script (`scripts/verify-gitignore.sh`):

```bash
#!/bin/bash
# scripts/verify-gitignore.sh

echo "🔍 Verifying .gitignore..."

REQUIRED_PATTERNS=(
  "node_modules"
  "\.env"
  "\.DS_Store"
  "dist"
  "build"
  "coverage"
)

MISSING=()

for pattern in "${REQUIRED_PATTERNS[@]}"; do
  if ! grep -q "$pattern" .gitignore 2>/dev/null; then
    MISSING+=("$pattern")
  fi
done

if [ ${#MISSING[@]} -eq 0 ]; then
  echo "✅ .gitignore looks good!"
else
  echo "⚠️  Missing patterns:"
  printf '  - %s\n' "${MISSING[@]}"
  echo ""
  echo "Suggested fix:"
  echo "  npm run gitignore:update"
  exit 1
fi

# Check for tracked files that should be ignored
echo ""
echo "🔎 Checking for tracked files that should be ignored..."
git ls-files | grep -E "node_modules|\.env|\.DS_Store|dist/|build/" && {
  echo "❌ Found files that should be ignored!"
  echo "Run: git rm -r --cached <file>"
  exit 1
} || echo "✅ No issues found"
```

### Monorepo .gitignore Management

For monorepos with multiple packages:

```bash
# scripts/setup-gitignores.sh
#!/bin/bash

echo "Setting up .gitignore files for monorepo..."

# Root .gitignore (global ignores)
gitig add node,macos,vscode > .gitignore
echo ""
echo "# Monorepo specific" >> .gitignore
echo "lerna-debug.log" >> .gitignore
echo ".pnpm-store/" >> .gitignore

# Package-specific .gitignore files
for pkg in packages/*/; do
  echo "Setting up .gitignore for $pkg"
  cd "$pkg"
  
  # Detect package type
  if [ -f "tsconfig.json" ]; then
    gitig add node --output .gitignore
    echo "dist/" >> .gitignore
  elif [ -d "public" ]; then
    # Frontend package
    gitig add node --output .gitignore
    echo "build/" >> .gitignore
    echo ".cache/" >> .gitignore
  else
    # Generic package
    gitig add node --output .gitignore
  fi
  
  cd ../..
done

echo "✅ All .gitignore files created!"
```

Add to package.json:

```json
{
  "scripts": {
    "setup:gitignore": "bash scripts/setup-gitignores.sh"
  }
}
```

## Framework-Specific Examples

### React / Next.js

```bash
# React app with TypeScript
gitig add node,macos,vscode

# Add React/Next.js specific patterns
cat >> .gitignore << 'EOF'

# React
build/
.cache/

# Next.js
.next/
out/
next-env.d.ts

# Testing
coverage/
.nyc_output/

# Environment
.env.local
.env.development.local
.env.test.local
.env.production.local
EOF
```

### Vue / Nuxt

```bash
# Vue 3 app
gitig add node,macos,vscode

cat >> .gitignore << 'EOF'

# Vue
dist/
.nuxt/
.output/

# Local
.cache/
.temp/
EOF
```

### Angular

```bash
# Angular app
gitig add node,macos,vscode,jetbrains

cat >> .gitignore << 'EOF'

# Angular
/dist/
/tmp/
/out-tsc/
/bazel-out/

# IDEs
.c9/
.project
.classpath
.settings/
.loadpath

# Misc
/.angular/cache
.sass-cache/
/connect.lock
/coverage
/libpeerconnection.log
testem.log
/typings
EOF
```

### Python / Django

```bash
# Django project
gitig add python,macos,vscode,jetbrains

cat >> .gitignore << 'EOF'

# Django
*.log
db.sqlite3
db.sqlite3-journal
/media
/staticfiles

# Celery
celerybeat-schedule
celerybeat.pid

# Environment
.env
.venv
env/
venv/
EOF
```

### Go

```bash
# Go project
gitig add go,macos,vscode,jetbrains

cat >> .gitignore << 'EOF'

# Go
*.exe
*.exe~
*.dll
*.so
*.dylib
*.test
*.out

# Dependency directories
vendor/
Godeps/

# Build output
/bin/
/dist/
EOF
```

### Rust

```bash
# Rust project
gitig add rust,macos,vscode,jetbrains

cat >> .gitignore << 'EOF'

# Rust
/target/
**/*.rs.bk
Cargo.lock

# IDE
.idea/
.vscode/
*.swp
*.swo
EOF
```

### Docker Projects

```bash
# Docker + Node.js
gitig add node,macos,vscode

# Create .dockerignore
cat > .dockerignore << 'EOF'
node_modules/
npm-debug.log
.git/
.gitignore
README.md
.env
.env.local
.vscode/
.idea/
coverage/
.nyc_output/
*.md
.DS_Store
EOF

# Add Docker-specific to .gitignore
cat >> .gitignore << 'EOF'

# Docker
.docker/
docker-compose.override.yml
*.env.docker
EOF
```

### Mobile (React Native)

```bash
# React Native
gitig add node,macos,vscode

cat >> .gitignore << 'EOF'

# React Native
.expo/
.expo-shared/

# iOS
ios/Pods/
ios/build/
*.xcworkspace
!default.xcworkspace

# Android
android/build/
android/.gradle/
android/app/build/

# Fastlane
fastlane/report.xml
fastlane/Preview.html
fastlane/screenshots
fastlane/test_output
EOF
```

## Troubleshooting

### Issue 1: .gitignore not working after creation

**Problem:** Files are still being tracked even though they're in .gitignore.

**Cause:** Files were already tracked before adding to .gitignore.

**Solution:**

```bash
# Remove cached files from git index
git rm -r --cached .

# Re-add all files (respecting .gitignore)
git add .

# Commit the changes
git commit -m "chore: fix .gitignore - untrack ignored files"
```

For specific files:

```bash
git rm --cached .env
git commit -m "chore: untrack .env file"
```

### Issue 2: Template not found

**Problem:** `Template "xyz" not found`

**Cause:** Typo in template name or unsupported template.

**Solution:**

```bash
# List available templates
gitig list

# Common typos:
# ❌ nodejs → ✅ node
# ❌ python3 → ✅ python
# ❌ visual-studio-code → ✅ vscode
# ❌ intellij → ✅ jetbrains
```

### Issue 3: Custom rules being overwritten

**Problem:** Running `gitig add` overwrites your custom .gitignore rules.

**Cause:** Not using `--append` flag.

**Solution:**

```bash
# WRONG: Overwrites existing file
gitig add node

# CORRECT: Appends to existing file
gitig add node --append

# Or backup first
cp .gitignore .gitignore.backup
gitig add node
# Manually merge .gitignore.backup and .gitignore
```

### Issue 4: Auto-detect not working

**Problem:** `gitig init` doesn't detect your project type correctly.

**Cause:** No recognizable project files (package.json, requirements.txt, etc.).

**Solution:**

```bash
# Manually specify templates
gitig add node,macos,vscode

# Or create a marker file first
npm init -y  # Creates package.json for Node.js
gitig init   # Now detects correctly
```

### Issue 5: OS-specific files still tracked

**Problem:** .DS_Store (macOS) or Thumbs.db (Windows) still appearing in git status.

**Cause:** OS template not included.

**Solution:**

```bash
# Add OS-specific template
gitig add macos --append  # macOS
gitig add windows --append  # Windows
gitig add linux --append   # Linux

# Or add all OS templates
gitig add macos,windows,linux --append

# Remove tracked OS files
git rm --cached .DS_Store
git rm --cached Thumbs.db
git commit -m "chore: remove OS files from tracking"
```

### Issue 6: IDE files being committed

**Problem:** .idea/, .vscode/ files being tracked.

**Cause:** IDE template not in .gitignore.

**Solution:**

```bash
# Add IDE template
gitig add jetbrains --append  # IntelliJ, WebStorm, etc.
gitig add vscode --append     # VS Code

# Remove from tracking
git rm -r --cached .idea/
git rm -r --cached .vscode/
git commit -m "chore: remove IDE files from tracking"
```

**Note:** Some teams prefer to commit `.vscode/settings.json` for shared settings:

```bash
# In .gitignore
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
```

### Issue 7: Monorepo .gitignore conflicts

**Problem:** Multiple .gitignore files in monorepo causing confusion.

**Cause:** Git checks .gitignore at each directory level.

**Solution:**

```bash
# Strategy 1: Single root .gitignore
gitig add node,python,go,macos,vscode > .gitignore
# Remove package-level .gitignore files

# Strategy 2: Root + package-specific
# Root .gitignore (global patterns)
gitig add macos,vscode > .gitignore
echo "node_modules/" >> .gitignore

# Package-specific (additional patterns)
cd packages/api
echo "logs/" > .gitignore
echo "*.log" >> .gitignore
```

Check which .gitignore applies to a file:

```bash
git check-ignore -v path/to/file
```

### Issue 8: Environment files (.env) still being committed

**Problem:** .env files keep being committed despite being in .gitignore.

**Cause:** 
1. .env was tracked before adding to .gitignore
2. Using `git add -f` (force add)
3. .env pattern not correctly specified

**Solution:**

```bash
# Check if .env is in .gitignore
grep "\.env" .gitignore

# If missing, add it
echo ".env" >> .gitignore
echo ".env.*" >> .gitignore
echo "!.env.example" >> .gitignore  # Allow .env.example template

# Remove from tracking
git rm --cached .env .env.local .env.production
git commit -m "chore: untrack environment files"

# Verify it's ignored
git status  # .env should not appear
```

### Issue 9: Large files already committed

**Problem:** Committed large files (node_modules/, dist/) before creating .gitignore.

**Cause:** .gitignore created too late; files already in git history.

**Solution:**

```bash
# Remove from current commit
git rm -r --cached node_modules/
git commit -m "chore: remove node_modules from tracking"

# Remove from entire git history (advanced)
git filter-branch --force --index-filter \
  "git rm -r --cached --ignore-unmatch node_modules/" \
  --prune-empty --tag-name-filter cat -- --all

# Or use BFG Repo-Cleaner (easier)
brew install bfg  # macOS
bfg --delete-folders node_modules
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

**Warning:** Rewriting history affects collaborators. Coordinate with your team!

### Issue 10: Template merge conflicts

**Problem:** Adding multiple templates creates duplicate patterns.

**Cause:** Templates have overlapping patterns.

**Solution:**

```bash
# Remove duplicates manually
gitig add node,python,macos,vscode

# Sort and deduplicate
sort -u .gitignore -o .gitignore

# Or use git's config
git config --global core.excludesfile ~/.gitignore_global

# Add common patterns globally
gitig add macos,vscode,jetbrains > ~/.gitignore_global
```

## Best Practices

### 1. Create .gitignore early

**Always create .gitignore before your first commit:**

```bash
# ✅ CORRECT order
mkdir new-project
cd new-project
git init
gitig init                    # Create .gitignore FIRST
npm init -y
git add .
git commit -m "feat: initial commit"

# ❌ WRONG order (files already tracked)
git init
npm init -y
git add .                     # .env, node_modules/ tracked!
git commit -m "initial commit"
gitig init                    # Too late - files already in history
```

### 2. Use OS-specific templates

**Always include your OS template to avoid OS-specific files:**

```bash
# ✅ Developers use different OS
gitig add node,macos,windows,linux,vscode

# ❌ Only ignoring macOS files
gitig add node,macos
# Windows users will commit Thumbs.db
```

### 3. Include IDE templates

**Don't assume everyone uses the same IDE:**

```bash
# ✅ Support multiple IDEs
gitig add node,macos,jetbrains,vscode

# ❌ Only VS Code
gitig add node,vscode
# IntelliJ users will commit .idea/ files
```

### 4. Commit .gitignore itself

**Always commit .gitignore to your repository:**

```bash
# ✅ CORRECT
git add .gitignore
git commit -m "chore: add .gitignore"

# ❌ WRONG
echo ".gitignore" >> .gitignore  # DON'T ignore .gitignore!
```

### 5. Use --append for updates

**When updating existing .gitignore, use --append to preserve custom rules:**

```bash
# ✅ CORRECT - Preserves custom patterns
gitig add python --append

# ❌ WRONG - Overwrites everything
gitig add python
```

### 6. Document custom patterns

**Add comments to explain non-obvious patterns:**

```bash
cat >> .gitignore << 'EOF'

# Custom: Client data (contains PII)
data/*.csv
data/*.json
!data/sample.json  # Sample data is OK

# Custom: Generated by our build script
.temp/
.cache-dir/
EOF
```

### 7. Use .gitignore for secrets, .dockerignore for builds

**Don't confuse .gitignore and .dockerignore:**

```bash
# .gitignore - what NOT to commit
.env
.env.local
node_modules/

# .dockerignore - what NOT to include in Docker images
.git/
.env
node_modules/    # Will reinstall in container
*.md
.vscode/
```

### 8. Verify .gitignore in CI

**Add automated checks to catch missing patterns:**

```bash
# package.json
{
  "scripts": {
    "verify:gitignore": "bash scripts/verify-gitignore.sh",
    "pretest": "npm run verify:gitignore"
  }
}
```

### 9. Use negative patterns sparingly

**Negative patterns (!) can be confusing - document them:**

```bash
# ✅ GOOD - Documented
# Ignore all logs except error logs (needed for debugging)
*.log
!error.log

# ❌ BAD - Unclear intent
*.json
!package.json
!tsconfig.json
!.eslintrc.json  # Why so many exceptions?
```

Better approach:

```bash
# Only ignore specific JSON files
config/local.json
data/*.json
```

### 10. Keep .gitignore minimal

**Don't over-ignore - only ignore what's necessary:**

```bash
# ❌ TOO BROAD
*
!src/
!package.json
# Hard to understand what's ignored

# ✅ SPECIFIC
node_modules/
dist/
.env
.DS_Store
coverage/
```

**Use `git check-ignore` to debug:**

```bash
# Check why a file is ignored
git check-ignore -v src/config/secrets.json

# Output: .gitignore:12:src/config/*.json  src/config/secrets.json
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
