const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const mongoose = require("mongoose");
const { isAdmin } = require("../middleware/jwt.middleware");

router.get('/products', (req, res, next) => {
    Product.find()
      .then((allProducts) => res.json(allProducts))
      .catch((err) => {
        console.log("Error while getting the products", err);
        res.status(500).json({ message: "Error while getting the products" });
      });
});  

router.post("/products", isAdmin, (req, res, next) => {
    const { name, description, price, imageUrl } = req.body;
  
    Product.create({ name, description, price, imageUrl })
      .then((newProduct) => res.status(201).json(newProduct))
      .catch((err) => {
        console.log("Error while creating a new product", err);
        res.status(500).json({ message: "Error while creating a new product" });
      });
  });

    router.get("/products/:id", (req, res, next) => {
        const { id } = req.params;
    
        Product.findById(id)
        .then((product) => {
            if (!product) {
            res.status(404).json({ message: "Product not found" });
            } else {
            res.json(product);
            }
        })
        .catch((err) => {
            console.log("Error while getting product", err);
            res.status(500).json({ message: "Error while getting product" });
        });
    });

router.put("/products/:productId", isAdmin, (req, res, next) => {
    const { productId } = req.params;
    const { name, description, price, imageUrl } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
    Product.findByIdAndUpdate(productId, { name, description, price, imageUrl }, { new: true })
      .then((updatedProduct) => {
        if (!updatedProduct) {
          res.status(404).json({ message: "Product not found" });
        } else {
          res.json(updatedProduct);
        }
      })
      .catch((err) => {
        console.log("Error while updating product", err);
        res.status(500).json({ message: "Error while updating product" });
      });
  }
);

router.delete("/products/:productId", isAdmin, (req, res, next) => {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    Product.findByIdAndRemove(productId)
      .then(() => res.json({ message: `Product with id ${productId} was removed successfully.` }))
      .catch((err) => {
        console.log("Error while deleting product", err);
        res.status(500).json({ message: "Error while deleting product" });
      });
  });


module.exports = router;