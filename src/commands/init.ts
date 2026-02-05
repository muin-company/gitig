import * as fs from 'fs';
import * as path from 'path';
import { addCommand } from './add';

interface InitOptions {
  output?: string;
}

/**
 * Detect project type by looking at files in the current directory
 */
function detectProjectType(): string[] {
  const cwd = process.cwd();
  const files = fs.readdirSync(cwd);
  const detected: string[] = [];
  
  // Check for language-specific files
  if (files.includes('package.json')) {
    detected.push('node');
  }
  
  if (files.some(f => f.endsWith('.py')) || files.includes('requirements.txt') || files.includes('setup.py') || files.includes('pyproject.toml')) {
    detected.push('python');
  }
  
  if (files.includes('go.mod') || files.some(f => f.endsWith('.go'))) {
    detected.push('go');
  }
  
  if (files.includes('Cargo.toml') || files.some(f => f.endsWith('.rs'))) {
    detected.push('rust');
  }
  
  if (files.includes('pom.xml') || files.includes('build.gradle') || files.some(f => f.endsWith('.java'))) {
    detected.push('java');
  }
  
  // Check for IDE directories
  if (files.includes('.vscode')) {
    detected.push('vscode');
  }
  
  if (files.includes('.idea')) {
    detected.push('jetbrains');
  }
  
  // Detect OS (always add the current OS)
  const platform = process.platform;
  if (platform === 'darwin') {
    detected.push('macos');
  } else if (platform === 'win32') {
    detected.push('windows');
  } else if (platform === 'linux') {
    detected.push('linux');
  }
  
  return detected;
}

export function initCommand(options: InitOptions = {}): void {
  const detected = detectProjectType();
  
  if (detected.length === 0) {
    console.log('Could not detect project type.');
    console.log('Use "gitig add <template>" to manually add templates.');
    console.log('Run "gitig list" to see available templates.');
    process.exit(1);
  }
  
  console.log(`Detected project types: ${detected.join(', ')}`);
  
  addCommand(detected.join(','), options);
}
