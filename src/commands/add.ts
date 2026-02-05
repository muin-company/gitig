import * as fs from 'fs';
import * as path from 'path';
import { getTemplate } from '../templates';

interface AddOptions {
  append?: boolean;
  output?: string;
}

export function addCommand(templateNames: string, options: AddOptions = {}): void {
  const names = templateNames.split(',').map(n => n.trim());
  const output = options.output || '.gitignore';
  const append = options.append || false;
  
  // Validate all templates exist
  const templates = names.map(name => {
    const template = getTemplate(name);
    if (!template) {
      console.error(`Error: Template "${name}" not found.`);
      console.log('Run "gitig list" to see available templates.');
      process.exit(1);
    }
    return template;
  });
  
  // Build content
  let content = '';
  
  if (append && fs.existsSync(output)) {
    content = fs.readFileSync(output, 'utf-8');
    if (!content.endsWith('\n')) {
      content += '\n';
    }
    content += '\n';
  }
  
  templates.forEach((template, index) => {
    if (index > 0) {
      content += '\n';
    }
    content += template.content;
  });
  
  // Write file
  fs.writeFileSync(output, content, 'utf-8');
  
  const action = append ? 'Updated' : 'Created';
  console.log(`${action} ${output} with templates: ${names.join(', ')}`);
}
