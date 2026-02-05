const { test } = require('node:test');
const assert = require('node:assert');
const { templates, getTemplate, listTemplates } = require('../dist/templates');

test('templates object should contain all expected templates', () => {
  const expectedTemplates = ['node', 'python', 'go', 'rust', 'java', 'macos', 'windows', 'linux', 'jetbrains', 'vscode'];
  
  expectedTemplates.forEach(name => {
    assert.ok(templates[name], `Template ${name} should exist`);
    assert.ok(templates[name].content.length > 0, `Template ${name} should have content`);
  });
});

test('getTemplate should return template for valid name', () => {
  const nodeTemplate = getTemplate('node');
  assert.ok(nodeTemplate);
  assert.strictEqual(nodeTemplate.name, 'node');
  assert.strictEqual(nodeTemplate.description, 'Node.js');
  assert.ok(nodeTemplate.content.includes('node_modules'));
});

test('getTemplate should be case insensitive', () => {
  const template1 = getTemplate('node');
  const template2 = getTemplate('NODE');
  const template3 = getTemplate('Node');
  
  assert.deepStrictEqual(template1, template2);
  assert.deepStrictEqual(template1, template3);
});

test('getTemplate should return undefined for invalid name', () => {
  const template = getTemplate('nonexistent');
  assert.strictEqual(template, undefined);
});

test('listTemplates should return all templates', () => {
  const allTemplates = listTemplates();
  assert.ok(Array.isArray(allTemplates));
  assert.ok(allTemplates.length >= 10, 'Should have at least 10 templates');
  
  allTemplates.forEach(template => {
    assert.ok(template.name);
    assert.ok(template.description);
    assert.ok(template.content);
  });
});
