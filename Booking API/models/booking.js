class Booking {
    constructor(
        id, 
        nameHotel, 
        arrivalDate, 
        departureDate, 
        passengers, 
        roomType, 
        name, 
        email, 
        paymentStatus
    ) {
        this.id = id;
        this.nameHotel = nameHotel;
        this.arrivalDate = arrivalDate;
        this.departureDate = departureDate;
        this.passengers = passengers;
        this.roomType = roomType;
        this.name = name;
        this.email = email;
        this.paymentStatus = paymentStatus;
    };
};

module.exports = Booking;