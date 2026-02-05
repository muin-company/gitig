import { listTemplates } from '../templates';

export function listCommand(): void {
  const templates = listTemplates();
  
  console.log('Available templates:\n');
  
  templates.forEach(template => {
    console.log(`  ${template.name.padEnd(12)} - ${template.description}`);
  });
  
  console.log(`\nTotal: ${templates.length} templates`);
}
