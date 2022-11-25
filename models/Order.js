import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
      required:true
    },
    products: {
      type:[
        {
          title:{type: String, required: true},
          size:{type: Number, required: true},
          price:{type: Number, required: true},
          notes:{type: String, required: true},
          quantity:{type: Number, required: true},
          img:{type: String, required: true},
        }
      ]
    }
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
