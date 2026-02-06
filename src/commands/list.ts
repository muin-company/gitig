import { listTemplates } from '../templates';

export function listCommand(options?: { popularOnly?: boolean }): void {
  const templates = listTemplates({ popularOnly: options?.popularOnly });
  
  if (options?.popularOnly) {
    console.log('⭐ Popular templates:\n');
  } else {
    console.log('Available templates:\n');
  }
  
  templates.forEach(template => {
    const prefix = template.popular ? '⭐ ' : '   ';
    console.log(`${prefix}${template.name.padEnd(12)} - ${template.description}`);
  });
  
  console.log(`\nTotal: ${templates.length} template${templates.length !== 1 ? 's' : ''}`);
  
  if (!options?.popularOnly) {
    console.log('\n💡 Tip: Use "gitig list --popular" to see only the most commonly used templates');
  }
}
