import fs from 'fs';
import { JSDOM } from 'jsdom';
import path from 'path';

(async () => {
  try {
    const html = await fetch('http://localhost:5173').then(r => r.text());
    console.log("HTML fetched. Length:", html.length);
  } catch (e) {
    console.log("Server not responding");
  }
})();
