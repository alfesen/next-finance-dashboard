import clientPromise from '../../lib/mongodb'
import { Request, Response } from 'express'

export default async function handler(req: Request, res: Response) {
  const client = await clientPromise
  const db = client.db('finance-dashboard')
  switch (req.method) {
    case 'POST':
      let bodyObject = JSON.parse(req.body)
      let newIncome = await db.collection('income').insertOne(bodyObject)
      console.log(newIncome)
      res.json({status: 201, newIncome })
      break
    case 'GET':
      const income = await db.collection('income').find({}).toArray()
      res.json({ status: 200, data: income })
      break
  }
}
