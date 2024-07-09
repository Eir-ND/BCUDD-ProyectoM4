const express = require('express');
const router = express.Router();



const bookingController = require('../controllers/bookingController');

router.post("/", bookingController.create);
router.get("/", bookingController.findAll);
router.get("/:id", bookingController.findOne);
router.patch("/:id", bookingController.update);
router.delete("/:id", bookingController.remove);

module.exports = router;