# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-06

### Added
- Initial release
- `gitig init` command for automatic project detection
- `gitig list` command to show all available templates
- `gitig show <template>` command to preview template contents
- `gitig add <templates>` command to add one or more templates
- 10 built-in templates:
  - node (Node.js)
  - python (Python)
  - go (Go)
  - rust (Rust)
  - java (Java)
  - macos (macOS)
  - windows (Windows)
  - linux (Linux)
  - jetbrains (JetBrains IDEs)
  - vscode (Visual Studio Code)
- `--append` option to add to existing .gitignore
- `--output` option to write to custom file
- Zero dependencies
- Comprehensive test coverage
- MIT license

[1.0.0]: https://github.com/muin-company/gitig/releases/tag/v1.0.0
