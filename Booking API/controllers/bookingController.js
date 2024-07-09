const { Booking } = require('../models/booking')

let bookings = [];

exports.create = async (req, res) => {
    const newBooking = req.body;
    newBooking.id = bookings.length + 1;
    booking.push(newBooking);

    res.status(201).json({
        msg: 'Booking made successfully',
        data: newBooking,
    })
};
  
exports.update = (req, res) => {
    res.send({ ok: true, description: 'Producto actualizado correctamente' });
};
  
exports.remove = (req, res) => {
    res.send({ ok: true, description: 'Producto eliminado correctamente' });
};
  
exports.findAll = (req, res) => {
    res.send([p1, p2, p3]);
};
  
exports.findOne = (req, res) => {
    res.send(p1);
};