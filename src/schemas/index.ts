import fs from 'fs';
import path from 'path';

// Defina um tipo para o objeto schemas que permitirá chaves de string
interface Schemas {
  [key: string]: any;
}

const schemasPath = path.join(__dirname);
const schemaFiles = fs.readdirSync(schemasPath).filter(file => file.endsWith('Schema.ts'));

const schemas: Schemas = schemaFiles.reduce((acc, file) => {
  const schemaName = path.basename(file, '.ts');
  const { default: schema } = require(path.join(schemasPath, file));
  acc[schemaName] = schema;
  return acc;
}, {} as Schemas);

export default schemas;
