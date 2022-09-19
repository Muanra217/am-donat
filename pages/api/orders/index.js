import dbConnect from '../../../lib/mongo'
import Order from '../../../models/Order'

const handler = async (req, res) => {
    const { method } = req
    
    await dbConnect()
    
    switch (method) {
        case 'GET':
        try {
            const orders = await Order.find({}) /* find all the data in our database */
            res.status(200).json(orders)
        } catch (error) {
            res.status(400).json(error)
        }
        break
        case 'POST':
        try {
            const order = await Order.create(
            req.body
            ) /* create a new model in the database */
            res.status(201).json(order)
        } catch (error) {
            res.status(500).json(error)
        }
        break
        default:
        res.status(400).json({ success: false })
        break
    }
}

export default handler