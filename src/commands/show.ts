import { getTemplate } from '../templates';

export function showCommand(templateName: string): void {
  const template = getTemplate(templateName);
  
  if (!template) {
    console.error(`Error: Template "${templateName}" not found.`);
    console.log('Run "gitig list" to see available templates.');
    process.exit(1);
  }
  
  console.log(`# Template: ${template.description}\n`);
  console.log(template.content);
}
