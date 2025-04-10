const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product Name is required.'],
    },
    description: {
      type: String,
      required: [true, 'Product Description is required.'],
    },
    price: {
      type: Number,
      required: [true, 'Product Price is required.'],
    },
    category: {
      type: String,
      enum: ['skincare', 'makeup', 'haircare', 'fragrance', 'bodycare', 'other'],
    },
    SKU: {
      type: String,
        },
    image: {
      type: [String],
      default: 'https://res.cloudinary.com/dxjse9tsv/image/upload/v1625073462/avatars/default-avatar.png',
    },
    // rating: {
    //   type: Number,
    //   default: 0,
    // },
    // reviews: {
    //   type: [String],
    //   default: [],
    // },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
