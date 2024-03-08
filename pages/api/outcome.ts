import clientPromise from '../../lib/mongodb'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise
  const db = client.db('finance-dashboard')
  switch (req.method) {
    case 'POST':
      try {
        const newOutcome = await db.collection('outcome').insertOne(req.body)
        res.json({ status: 201, newOutcome })
      } catch (err) {
        console.log('Error parsing json: ', err)
      } finally {
        break
      }
    case 'GET':
      const outcome = await db.collection('outcome').find({}).toArray()
      res.json({ status: 200, data: outcome })
      break
  }
}
