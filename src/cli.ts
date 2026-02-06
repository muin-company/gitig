#!/usr/bin/env node

import { listCommand } from './commands/list';
import { showCommand } from './commands/show';
import { addCommand } from './commands/add';
import { initCommand } from './commands/init';

const args = process.argv.slice(2);

function showHelp(): void {
  console.log(`
gitig - Generate .gitignore files instantly

Usage:
  gitig init              Detect project type and create .gitignore
  gitig list              List all available templates
  gitig list --popular    List only the most commonly used templates
  gitig show <template>   Show template contents
  gitig add <templates>   Add one or more templates (comma-separated)

Options:
  --append                Append to existing .gitignore instead of overwriting
  --output <file>         Output to a different file (default: .gitignore)
  --popular               Show only popular templates (use with list)
  -h, --help              Show this help message
  -v, --version           Show version

Examples:
  gitig init
  gitig list
  gitig list --popular
  gitig add node,macos
  gitig add python --append
  gitig add node --output my-gitignore
  gitig show rust
`);
}

function showVersion(): void {
  const pkg = require('../package.json');
  console.log(`gitig v${pkg.version}`);
}

function parseOptions(args: string[]): { options: any; args: string[] } {
  const options: any = {};
  const remainingArgs: string[] = [];
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--append') {
      options.append = true;
    } else if (arg === '--output') {
      options.output = args[++i];
    } else if (arg === '--popular') {
      options.popularOnly = true;
    } else if (arg === '-h' || arg === '--help') {
      options.help = true;
    } else if (arg === '-v' || arg === '--version') {
      options.version = true;
    } else {
      remainingArgs.push(arg);
    }
  }
  
  return { options, args: remainingArgs };
}

function main(): void {
  const { options, args: parsedArgs } = parseOptions(args);
  
  if (options.help || parsedArgs.length === 0) {
    showHelp();
    return;
  }
  
  if (options.version) {
    showVersion();
    return;
  }
  
  const command = parsedArgs[0];
  
  switch (command) {
    case 'init':
      initCommand(options);
      break;
    
    case 'list':
      listCommand(options);
      break;
    
    case 'show':
      if (!parsedArgs[1]) {
        console.error('Error: "show" command requires a template name.');
        console.log('Usage: gitig show <template>');
        process.exit(1);
      }
      showCommand(parsedArgs[1]);
      break;
    
    case 'add':
      if (!parsedArgs[1]) {
        console.error('Error: "add" command requires template name(s).');
        console.log('Usage: gitig add <templates>');
        console.log('Example: gitig add node,macos');
        process.exit(1);
      }
      addCommand(parsedArgs[1], options);
      break;
    
    default:
      console.error(`Error: Unknown command "${command}"`);
      console.log('Run "gitig --help" for usage information.');
      process.exit(1);
  }
}

main();
