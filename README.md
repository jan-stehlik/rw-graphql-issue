# Redwood graphql handler issue

To reproduce

```bash
yarn
```

```bash
yarn rw dev
```

See that handler function in `graphql.ts` is not executed, [this](https://github.com/jan-stehlik/rw-graphql-issue/blob/c4bb938a408d8ef5d1bc766c0fe2ccb5c29d8590/api/src/functions/graphql.ts#L24) log is never triggered
