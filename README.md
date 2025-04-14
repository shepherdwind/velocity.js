# Velocity.js

[![NPM version][npm-image]][npm-url]
[![build status][github-image]][github-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/velocityjs.svg?style=flat-square
[npm-url]: http://npmjs.org/package/velocityjs
[download-image]: https://img.shields.io/npm/dm/velocityjs.svg?style=flat-square
[download-url]: https://npmjs.org/package/velocityjs
[github-image]: https://img.shields.io/github/actions/workflow/status/shepherdwind/velocity.js/node.js.yml?branch=master&style=flat-square
[github-url]: https://github.com/shepherdwind/velocity.js/actions

A JavaScript implementation of the [Apache Velocity](http://velocity.apache.org/) template engine.

## Features

- ✨ Full support for both client-side and server-side rendering
- 🔄 Separation of template parsing and rendering phases
- 🎯 Complete compatibility with Java Velocity syntax
- 🚀 High performance and lightweight

## Installation

```bash
npm install velocityjs
```

## Quick Start

```javascript
import { render, parse, Compile } from 'velocityjs';

// Simple rendering
const result = render('Hello $name!', { name: 'World' });
console.log(result); // Output: Hello World!

// With macros
const macros = {
  include: (path) => `Included content from ${path}`,
};
const template = '#include("header.vm") Hello $name!';
const rendered = render(template, { name: 'World' }, macros);
```

## API Reference

### Core Methods

#### `render(vm, context, macros)`

Renders a Velocity template string with the provided context and macros.

**Parameters:**

- `vm` (string) - Velocity template string
- `context` (object) - Data context for template variables
- `macros` (object) - Custom macro functions

**Returns:** (string) Rendered output

#### `parse(vm, config, ignorespace)`

Parses a Velocity template into an AST (Abstract Syntax Tree).

**Parameters:**

- `vm` (string) - Velocity template string
- `config` (object) - Parsing configuration
- `ignorespace` (boolean) - Whether to ignore whitespace trimming

**Returns:** (Array) AST nodes

#### `Compile`

Compiles parsed AST into a renderable template.

```javascript
import { parse, Compile } from 'velocityjs';

const asts = parse('Hello $name!');
const template = new Compile(asts);
const result = template.render({ name: 'World' });
```

### Configuration Options

#### Compile Configuration

- `escape` (boolean) - Enable HTML escaping for variables (default: false)
- `unescape` (object) - Specify variables to exclude from escaping
- `env` (string) - Set to 'development' to throw errors on null values
- `valueMapper` (function) - Custom value transformation for #set directives
- `customMethodHandlers` (Array) - Custom function behavior implementations

### Context and Macros

#### Context Object

The context object provides data and methods to your templates:

- Properties are accessed using dot notation: `$user.name`
- Methods can be called directly: `$formatDate($date)`
- Methods have access to an `eval` method for dynamic rendering

#### Macros

Custom macro functions can be defined for directives like `#include`:

```javascript
import { render } from 'velocityjs';

const macros = {
  include: (path) => {
    // Custom include implementation
    return readFile(path);
  },
};
```

## Supported Directives

- `#set` - Variable assignment
- `#foreach` - Loop iteration
- `#if/#else/#elseif` - Conditional logic
- `#macro` - Template macro definition
- `#break` - Loop control
- `#stop` - Template execution control

## Getting Help

- 📝 [Create an issue](https://github.com/shepherdwind/velocity.js/issues/new)
- 📧 Email: eward.song at gmail.com

## License

MIT License
