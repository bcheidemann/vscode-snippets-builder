# VSCode Snippets Builder

## What is it?

VSCode Snippets Builder is a typescript / javascript module and
commandline tool to help build VSCode snippet files.

## Motivation

This tool is designed to make it easier to build large snippet files
with less effort. It achieves this by:

 - allowing you to split your snippets into separate files and compile
   into one when you're ready to build / deploy your snippets

 - allowing you to write code templates in .template (plain text) files

 - allowing you to reuse and combine .template files in multiple
   snippets

When used properly, this results in less duplicate code being written
and faster refactoring when changing a pattern shared across many
code snippets.

## Usage

### Class Template
path: class.template
```
class MyClass {
  ${0}
}
```

### Method Template
path: method.template
```
public ${method_name}() { ${0} }
```

### Console Log Template
path: log.template
```
console.log(${0});
```

### Basic Snippet
path: basic.snippet.json
```json
{
  "name": "Console Log",
  "alias": ["cl", "log"],
  "template": "./log.template"
}
```

### Basic Composite Snippet
path: composite.snippet.json
```json
{
  "name": "Console Log",
  "alias": "hello",
  "template": "./log.template",
  "0": "'Hello World!'"
}
```

### Advanced Snippet
path: advanced.snippet.json
```json
{
  "name": "Create A Class",
  "alias": "myclass",
  "template": "./class.template",
  "0": [
    {
      "template": "./method.template",
      "method_name": "logMethod",
      "0": {
        "value": "    // TODO: implement this method",
        "suffix": "\n"
      },
    },
    {
      "template": "./method.template",
      "method_name": "sayHello",
      "0": {
        "template": "./log.template",
        "prefix": "  /** says hello */",
        "0": "'Hello World!'"
      },
    }
  ]
}
```