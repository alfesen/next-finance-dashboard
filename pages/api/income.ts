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
        const newIncome = await db.collection('income').insertOne(req.body)
        res.json({ status: 201, newIncome })
      } catch (err) {
        console.log('Error parsing json: ', err)
      } finally {
        break
      }
    case 'GET':
      const income = await db.collection('income').find({}).toArray()
      res.json({ status: 200, data: income })
      break
  }
}
