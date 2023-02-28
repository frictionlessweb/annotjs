# AnnotJS

An annotation library for JavaScript programs.

## Developing

AnnotJS is written JavaScript with JSDoc comments; we use the TypeScript
compiler to check that our type annotations are correct. By writing
vanilla JavaScript directly, we avoid the overhead and complexity that
comes with invoking a compiler; consumers of our library can simply
import our code into their app and move forward.
