# Next.js with Express GraphQL backend, written in Typescript

This [Next.js](https://nextjs.org/) app uses the [chakra-ui](https://next.chakra-ui.com/) component library and [Apollo Client](https://www.apollographql.com/docs/react/) to connect to your GraphQL backend out of the box.

Next.js, chakra-ui and Apollo all have built-in TypeScript declarations.

The chakra-ui `ChakraProvider` in `/pages/_app.tsx` provides theming context, color mode (dark/light) and global styles from `theme.tsx` to all components.

## Deploy this demo

Deploy this example using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anselbrandt/next-express)

## How to use

### Using `npx degit`

Execute [`npx degit`](https://github.com/Rich-Harris/degit) to bootstrap this example:

```bash
npx degit https://github.com/anselbrandt/next-express next-express
```

Then:

```
cd next-express
yarn
or
npm install
```

After that:

```
yarn dev
or
yarn build
```

or

```
npm start
or
npm run-script build
```

## Setup

GraphQL server endpoints may be configured in `constants.ts` and `.env.local` ensuring to prefix variables with `NEXT_PUBLIC_` as in the `sample.env.local` file.

The GraphQL client can be configured in `/utils/withApollo.ts`

## GraphQL

Queries must be named:

```
query QueryName {
  ...
}
```

After adding any new queries to the `/graphql/` folder, execute:

```
yarn gen
or
npm run-script gen
```

[GraphQL code generator](https://graphql-code-generator.com/) will connect to your GraphQL server, generate typings based on your schema and output custom `hooks` to `/generated/graphql.tsx`.

Ensure that `codegen.yml` contains the correct URL for your GraphQL server and path to your queries.

Queries can be imported as:

```
import { useQueryName } from "../generated/graphql";
...
const { data, loading, error } = useQueryName();
```
