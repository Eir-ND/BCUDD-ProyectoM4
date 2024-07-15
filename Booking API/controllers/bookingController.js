// Importamos las librerías necesarias
const Booking = require('../models/booking');
const { v4: uuidv4 } = require('uuid'); // Importa uuidv4 para generar IDs únicos de manera automática
const moment = require('moment'); // Importa moment.js para trabajar con fechas

// Inicializamos las reservas
let bookings = [];

// Crear reserva
exports.create = async (req, res) => {
     // Extraer los datos necesarios del cuerpo de la solicitud (req.body)
    const { hotelName, arrivalDate, departureDate, roomType, guests, name, email, paymentStatus } = req.body;
    // Crear un nuevo objeto de reserva utilizando los datos extraídos
    const newBooking = new Booking(
        uuidv4(),
        hotelName,
        arrivalDate,
        departureDate,
        guests,
        roomType,
        name,
        email,
        paymentStatus
    );
    
    // Agregar la nueva reserva al arreglo de reservas (bookings)
    bookings.push(newBooking);

    // Enviar una respuesta al cliente indicando que la reserva se ha creado exitosamente
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
    
    // Filtra las reservas basadas en los parámetros de consulta
    const bookingFiltered = bookings.filter((booking) => {
        // Filtra por nombre de hotel si se especifica
        if (hotelName && booking.hotelName !== hotelName) {
            return false
        }

        // Verifica si la fecha ingresada está dentro del rango de fechas de la reserva
        const filterArrival = moment(arrivalDate);
        const filterDeparture = moment(departureDate);
        const bookingArrival = moment(booking.arrivalDate);
        const bookingDeparture = moment(booking.departureDate);

        // Si arrivalDate está presente, verifica si la reserva no está dentro del rango de arrivalDate y departureDate
        if (arrivalDate && (filterArrival.isAfter(bookingDeparture, 'day') || filterDeparture.isBefore(bookingArrival, 'day'))) {
            return false;
        }

        // Si departureDate está presente, verifica si la reserva no está dentro del rango de arrivalDate y departureDate
        if (departureDate && (filterDeparture.isBefore(bookingArrival, 'day') || filterArrival.isAfter(bookingDeparture, 'day'))) {
            return false;
        }

        // Filtra por tipo de habitación si se especifica
        if (roomType && booking.roomType !== roomType) {
            return false
        }

        // Filtra por estado de pago si se especifica
        if (paymentStatus && booking.paymentStatus !== paymentStatus) {
            return false
        }

        // Filtra por número de huéspedes si se especifica
        if (guests && booking.guests !== parseInt(guests)) {
            return false
        }

        // Si pasa todos los filtros, incluye la reserva en los resultados filtrados
        return true
    });

    // Si no se encontraron reservas que cumplan con los criterios de filtro, devuelve un 404
    if (bookingFiltered.length === 0) {
        return res
            .status(404)
            .json({ msg: 'No bookings matching the filter criteria were found.' })
    };

    // Devuelve las reservas filtradas en formato JSON
    return res.json({
        msg: "Filtered bookings",
        data: bookingFiltered
    });
}