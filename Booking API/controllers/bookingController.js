const Booking = require('../models/booking');
const { v4: uuidv4 } = require('uuid');
let bookings = [];

// Crear reserva
exports.create = async (req, res) => {
    const { nameHotel, arrivalDate, departureDate, typeRoom, passengers, name, email, paymentStatus } = req.body;
    const newBooking = new Booking(
        uuidv4(),
        nameHotel,
        arrivalDate,
        departureDate,
        passengers,
        typeRoom,
        name,
        email,
        paymentStatus
    );
    
    bookings.push(newBooking);

    res.status(201).json({
        msg: 'Booking made successfully',
        data: newBooking,
    })
};
  
// Obtener lista de reservas
exports.findAll = async (req, res) => {
    res.json({
        msg: 'Bookings successfully obtained.',
        data: bookings,
    })
};

// Obtener reserva por ID
exports.findOne = async (req, res) => {
    const bookingId = req.params.id;
    const booking = bookings.find((b) => b.id === bookingId);

    if (!booking) {
        return res.status(404).json({
            msg: 'Booking not found.'
        });
    };

    res.json({
        msg: 'Booking successfully obtained.',
        data: booking,
    });
};

// Actualizar reserva
exports.update = async (req, res) => {
    const bookingId = (req.params.id)
    const bookingIndex = bookings.findIndex((b) => b.id === bookingId);

    if (bookingIndex === -1) {
        return res.status(404).json({ msg: 'Pedido no encontrado.' })
    }

    bookings[bookingIndex] = { ...bookings[bookingIndex], ...req.body }
    res.json({
        msg: 'Pedido actualizado con éxito.',
        data: bookings[bookingIndex],
    })
};
  
// Eliminar reserva
exports.remove = async (req, res) => {
    const bookingId = (req.params.id)
    const bookingIndex = bookings.findIndex((b) => b.id === bookingId);

    if (bookingIndex === -1) {
        return res.status(404).json({ msg: 'Booking not found.' });
    }

    bookings.splice(bookingIndex, 1)
    res.json({ msg: 'Booking successfuly deleted.'});
};
  