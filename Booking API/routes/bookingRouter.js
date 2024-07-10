const express = require('express');
const router = express.Router();



const bookingController = require('../controllers/bookingController');

router.post("/booking", bookingController.create);
router.get("/booking", bookingController.findAll);
router.get("/booking/:id", bookingController.findOne);
router.patch("/booking/:id", bookingController.update);
router.delete("/booking/:id", bookingController.remove);

module.exports = router;