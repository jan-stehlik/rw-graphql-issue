import { createGraphQLHandler } from '@redwoodjs/graphql-server'

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { db } from 'src/lib/db'
import { executionContext, Store } from 'src/lib/executionContext'
import { logger } from 'src/lib/logger'

const graphqlHandler = createGraphQLHandler({
  loggerConfig: { logger, options: {} },
  directives,
  sdls,
  services,
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})

export async function handler(event, context) {
  // this never gets fired
  console.log(`in handler wrapper`)

  const requestIdHeader = 'x-request-id'
  const requestId = event.headers[requestIdHeader]
  const store: Store = new Map([['requestId', requestId]])
  const response = await executionContext.run(store, () => {
    return graphqlHandler(event, context)
  })
  return {
    ...response,
    headers: { ...(response.headers ?? {}), [requestIdHeader]: requestId },
  }
}
