import dbConnect from '../../../lib/mongo'
import Product from '../../../models/Product'

export default async function handler(req, res) {
    const {method, query: {id}, cookies} = req;

    const token = cookies.token

    dbConnect();

    if(method === "GET"){
        try {
            const product = await Product.findById(id);
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    if(method === "PUT"){
        if(!token){
            return res.status(401).json({message: "Not authorized"})
        }
        try{
            const product = await Product.findByIdAndUpdate(id, res.body, {new: true});
            res.status(201).json(product);
        }catch(error){
            res.status(500).json(error);
        }
    }
    if(method === "DELETE"){
        if(!token){
            return res.status(401).json({message: "Not authorized"})
        }
        try{
            await Product.findByIdAndDelete(id);
            res.status(201).json("The product has been deleted");
        }catch(error){
            res.status(500).json(error);
        }
    }
}