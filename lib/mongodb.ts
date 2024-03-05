// mongodb.js

import type { ConnectOptions } from 'mongodb'
import { MongoClient } from 'mongodb'

const dbURI: string | undefined = process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

const mongoGlobalThis = global as typeof globalThis & {
  _mongoClientPromise: Promise<MongoClient>
}

if (!dbURI || typeof dbURI !== 'string') {
  throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  if (!mongoGlobalThis._mongoClientPromise) {
    client = new MongoClient(dbURI, options as ConnectOptions)
    mongoGlobalThis._mongoClientPromise = client.connect()
  }
  clientPromise = mongoGlobalThis._mongoClientPromise
} else {
  client = new MongoClient(dbURI, options as ConnectOptions)
  clientPromise = client.connect()
}

export default clientPromise
