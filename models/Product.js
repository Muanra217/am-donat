import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        maxlength: 100,
    },
    desc:{
        type: String,
        required: true,
        maxlength: 300,
    },
    img:{
        type: String,
        required: true,
    },
    prices:{
        type: [Number],
        required: true,
    },
    extraOption:{
        type: [
            {
                text:{type: String, required: true},
                price:{type: Number, required: true}
            }
        ],
    },
}, {timestamps: true});


export default mongoose.models.Product || mongoose.model("Product", ProductSchema);