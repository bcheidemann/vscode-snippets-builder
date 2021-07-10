import { TestFS, MemoryFS } from './fs';
import { join } from 'path';

export function setupFS() {
  const fs: MemoryFS = {};
  fs[join(__dirname, 'src', 'class.template')] = [
    'class MyClass {',
    '  ${0}',
    '}',
  ].join('\n');
  fs[join(__dirname, 'src', 'method.template')] = [
    '  public myMethod() { ${0} }',
  ].join('\n');
  fs[join(__dirname, 'src', 'log.template')] = [
    'console.log(${0})',
  ].join('\n');
  fs[join(__dirname, 'src', 'composite.snippet.json')] = JSON.stringify(
    {
      "name": "Class with Method",
      "alias": ".myclassmethod",
      "template": "./class.template",
      "0": {
        "template": "./method.template",
        "0": {
          "template": "./body.template",
          "0": "'Hello World!'"
        },
      }
    },
    null,
    2,
  )
  return new TestFS(fs);
}
