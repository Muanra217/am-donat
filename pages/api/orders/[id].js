import dbConnect from '../../../lib/mongo'
import Order from '../../../models/Order'

const handler = async (req, res) => {
    const { method } = req
    const { id } = req.query

    await dbConnect()

    switch (method) {
        case 'GET':
        try {
            const order = await Order.findById(id) /* find the order by its id */
            if (!order) {
                return res.status(400).json({ success: false })
            }
            res.status(200).json({ success: true, data: order })
        } catch (error) {
            res.status(400).json({ success: false })
        }
        break
        case 'PUT':
        try {
            const order = await Order.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
            })
            if (!order) {
                return res.status(400).json({ success: false })
            }
            res.status(200).json({ success: true, data: order })
        } catch (error) {
            res.status(400).json({ success: false })
        }
        break
        case 'DELETE':
        try {
            const deletedOrder = await Order.deleteOne({ _id: id })
            if (!deletedOrder) {
                return res.status(400).json({ success: false })
            }
            res.status(200).json({ success: true, data: {} })
        } catch (error) {
            res.status(400).json({ success: false })
        }
        break
        default:
        res.status(400).json({ success: false })
    }
}