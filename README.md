# AnnotJS

An annotation library for JavaScript programs.

## Developing

AnnotJS is written JavaScript with JSDoc comments; we use the TypeScript
compiler to check that our type annotations are correct. By writing
vanilla JavaScript directly, we avoid the overhead and complexity that
comes with invoking a compiler. Consumers of our library can simply
import our code into their app and move forward.

Meanwhile, the documentation is a [NextJS](https://nextjs.org) project.

In order to run the documentation locally, you will need to create a file
called `.env` in the root of the project with the following content:

```
export NEXT_PUBLIC_ADOBE_EMBED_API_KEY="<YOUR_API_KEY_HERE>"
```

Where `<YOUR_API_KEY_HERE>` comes from setting up local credentials for the Adobe Embed API.
For instructions on how to accomplish that task, [see this webpage](https://developer.adobe.com/document-services/docs/overview/pdf-embed-api/).
From there, you can run:

```
npm start
```

In the root of this repository.
