# Contributing to gitig

Thank you for your interest in contributing! 🎉

## Ways to Contribute

### 1. Add New Templates

To add a new template:

1. Create a new file in `src/templates/` (e.g., `ruby.ts`)
2. Export the template content as default:
   ```typescript
   export default `# Ruby
   *.gem
   .bundle/
   vendor/
   `;
   ```
3. Add the template to `src/templates/index.ts`
4. Update the README.md to document the new template
5. Add test coverage if needed

### 2. Improve Existing Templates

Templates should be:
- Comprehensive but not overly verbose
- Based on official or widely-used gitignore patterns
- Well-commented (especially for non-obvious patterns)

### 3. Report Bugs

If you find a bug, please open an issue with:
- Description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your environment (OS, Node.js version)

### 4. Suggest Features

Feature requests are welcome! Please:
- Check existing issues first
- Explain the use case
- Consider if it fits the "zero dependencies" philosophy

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/gitig.git
cd gitig

# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Link locally for testing
npm link
```

## Pull Request Process

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Build (`npm run build`)
6. Commit with a clear message
7. Push to your fork
8. Open a Pull Request

## Code Style

- Use TypeScript
- Follow existing code style
- Keep functions small and focused
- Add comments for complex logic
- Update tests for new features

## Template Guidelines

When adding templates:
- Use official gitignore sources when possible
- Organize patterns logically with comments
- Test that patterns work as expected
- Keep it focused (don't include everything, just common cases)

## Questions?

Feel free to open an issue for discussion!

---

Thank you for contributing! 🙌
