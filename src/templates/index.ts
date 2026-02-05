import node from './node';
import python from './python';
import go from './go';
import rust from './rust';
import java from './java';
import macos from './macos';
import windows from './windows';
import linux from './linux';
import jetbrains from './jetbrains';
import vscode from './vscode';

export interface Template {
  name: string;
  description: string;
  content: string;
}

export const templates: Record<string, Template> = {
  node: {
    name: 'node',
    description: 'Node.js',
    content: node,
  },
  python: {
    name: 'python',
    description: 'Python',
    content: python,
  },
  go: {
    name: 'go',
    description: 'Go',
    content: go,
  },
  rust: {
    name: 'rust',
    description: 'Rust',
    content: rust,
  },
  java: {
    name: 'java',
    description: 'Java',
    content: java,
  },
  macos: {
    name: 'macos',
    description: 'macOS',
    content: macos,
  },
  windows: {
    name: 'windows',
    description: 'Windows',
    content: windows,
  },
  linux: {
    name: 'linux',
    description: 'Linux',
    content: linux,
  },
  jetbrains: {
    name: 'jetbrains',
    description: 'JetBrains IDEs',
    content: jetbrains,
  },
  vscode: {
    name: 'vscode',
    description: 'Visual Studio Code',
    content: vscode,
  },
};

export function getTemplate(name: string): Template | undefined {
  return templates[name.toLowerCase()];
}

export function listTemplates(): Template[] {
  return Object.values(templates);
}
