class Booking {
    constructor(
        id, 
        hotelName, 
        arrivalDate, 
        departureDate, 
        guests, 
        roomType, 
        name, 
        email, 
        paymentStatus
    ) {
        this.id = id;
        this.hotelName = hotelName;
        this.arrivalDate = arrivalDate;
        this.departureDate = departureDate;
        this.guests = guests;
        this.roomType = roomType;
        this.name = name;
        this.email = email;
        this.paymentStatus = paymentStatus;
    };
};

module.exports = Booking;