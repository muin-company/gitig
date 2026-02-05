const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { addCommand } = require('../dist/commands/add');

const testDir = path.join(__dirname, 'temp');

test('addCommand should create .gitignore with single template', () => {
  // Setup
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
  fs.mkdirSync(testDir, { recursive: true });
  
  const originalCwd = process.cwd();
  process.chdir(testDir);
  
  try {
    addCommand('node');
    
    assert.ok(fs.existsSync('.gitignore'));
    const content = fs.readFileSync('.gitignore', 'utf-8');
    assert.ok(content.includes('node_modules'));
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(testDir, { recursive: true });
  }
});

test('addCommand should combine multiple templates', () => {
  // Setup
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
  fs.mkdirSync(testDir, { recursive: true });
  
  const originalCwd = process.cwd();
  process.chdir(testDir);
  
  try {
    addCommand('node,python');
    
    assert.ok(fs.existsSync('.gitignore'));
    const content = fs.readFileSync('.gitignore', 'utf-8');
    assert.ok(content.includes('node_modules'));
    assert.ok(content.includes('__pycache__'));
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(testDir, { recursive: true });
  }
});

test('addCommand with append option should preserve existing content', () => {
  // Setup
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
  fs.mkdirSync(testDir, { recursive: true });
  
  const originalCwd = process.cwd();
  process.chdir(testDir);
  
  try {
    // Create initial file
    fs.writeFileSync('.gitignore', '# Custom comment\ncustom-file.txt\n');
    
    // Append
    addCommand('node', { append: true });
    
    const content = fs.readFileSync('.gitignore', 'utf-8');
    assert.ok(content.includes('# Custom comment'));
    assert.ok(content.includes('custom-file.txt'));
    assert.ok(content.includes('node_modules'));
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(testDir, { recursive: true });
  }
});

test('addCommand with output option should write to custom file', () => {
  // Setup
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
  fs.mkdirSync(testDir, { recursive: true });
  
  const originalCwd = process.cwd();
  process.chdir(testDir);
  
  try {
    addCommand('node', { output: 'custom.gitignore' });
    
    assert.ok(fs.existsSync('custom.gitignore'));
    assert.ok(!fs.existsSync('.gitignore'));
    
    const content = fs.readFileSync('custom.gitignore', 'utf-8');
    assert.ok(content.includes('node_modules'));
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(testDir, { recursive: true });
  }
});
