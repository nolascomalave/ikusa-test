import App from './app';
import db from './connection';

// Start DB:
db;

// Start App:
new App(3000).listen();