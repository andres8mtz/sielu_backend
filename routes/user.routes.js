const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const User = require("../models/User.model.js");
const { default: mongoose } = require("mongoose");

router.post("/users", isAuthenticated,(req, res, next) => {
console.log(req.payload)
res.json({ user: req.payload });
});

router.get('/users/:id', isAuthenticated, (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return
  }
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}
);

router.put('/users/:id', isAuthenticated, (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return
  }
  User.findByIdAndUpdate(id, req.body, { new: true })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}
);

router.delete('/users/:id', isAuthenticated, (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return
  }
  User.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: `User with ${id} is removed successfully.` });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}
);


module.exports = router;