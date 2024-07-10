let bookings = [];

// Crear reserva
exports.create = async (req, res) => {
    const newBooking = req.body;
    newBooking.id = bookings.length + 1;
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
    const bookingId = parseInt(req.params.id);
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
exports.update = (req, res) => {
    
};
  
// Eliminar reserva
exports.remove = (req, res) => {
    
};
  