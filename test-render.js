import fs from 'fs';
import { parse } from '@babel/parser';

try {
  const code = fs.readFileSync('./src/App.jsx', 'utf-8');
  parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  console.log("Syntax is valid");
} catch (e) {
  console.error("Syntax error:", e);
}
