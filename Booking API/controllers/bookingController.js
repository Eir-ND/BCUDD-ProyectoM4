const Booking = require('../models/booking');
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');

let isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);

let bookings = [];

// Crear reserva
exports.create = async (req, res) => {
    const { hotelName, arrivalDate, departureDate, roomType, guests, name, email, paymentStatus } = req.body;
    const parsedArrivalDate = dayjs(arrivalDate).format("DD/MM/YYYY");
    const parsedDepartureDate = dayjs(departureDate).format("DD/MM/YYYY");
    const newBooking = new Booking(
        uuidv4(),
        hotelName,
        parsedArrivalDate,
        parsedDepartureDate,
        guests,
        roomType,
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
        return res.status(404).json({ msg: 'Booking not found.' })
    }

    bookings[bookingIndex] = { ...bookings[bookingIndex], ...req.body }
    res.json({
        msg: 'Booking successfully updated.',
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

// Filtrar reservas
exports.filter = async (req, res) => {
    const { hotelName, arrivalDate, departureDate, roomType, guests, name, email, paymentStatus } = req.query;
    
    // Filtrar por nombre de hotel
    if (hotelName) {
        const bookingFiltered = bookings.filter(
            (booking) => booking.hotelName === hotelName
        );
        if (bookingFiltered.length === 0) {
            return res
                .status(404)
                .json({ msg: 'Booking not found.' })
        };
        return res.json({
            msg: "Hotel name",
            data: bookingFiltered
        });
    };

    // Filtrar por fechas de ingreso - egreso
   

    // Filtrar por tipo de habitación
    if (roomType) {
        const bookingFiltered = bookings.filter(
            (booking) => booking.roomType === roomType
        );
        if (bookingFiltered.length === 0) {
            return res
                .status(404)
                .json({ msg: 'Booking not found....' })
        };
        return res.json({
            msg: "Room type",
            data: bookingFiltered
        });
    };

    // Filtrar por estado de pago
    if (paymentStatus) {
        const bookingFiltered = bookings.filter(
            (booking) => booking.paymentStatus === paymentStatus
        );
        if (bookingFiltered.length === 0) {
            return res
                .status(404)
                .json({ msg: 'Booking not found....' })
        };
        return res.json({
            msg: "Payment status",
            data: bookingFiltered
        });
    };
    
    // Filtrar por número de huespedes
    if (guests) {
        const bookingFiltered = bookings.filter(
            (booking) => booking.guests === parseInt(guests)
        );
        if (bookingFiltered.length === 0) {
            return res
                .status(404)
                .json({ msg: 'Guests Booking not found....' })
        };
        return res.json({
            msg: "Guests number",
            data: bookingFiltered
        });
    };
}