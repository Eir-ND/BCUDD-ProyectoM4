// Importamos las librerías necesarias
const express = require('express'); // Express.js para manejo de rutas
const router = express.Router(); // Creamos un router Express

// Importamos el controlador de pedidos
const bookingController = require('../controllers/bookingController');

/**
 * @swagger
 * components:
 *  schemas:
 *      Booking:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: The booking's unique identifier
 *              hotelName:
 *                  type: string
 *                  description: The name of the hotel
 *              arrivalDate:
 *                  type: string
 *                  format: date
 *                  description: The arrival date
 *              departureDate:
 *                  type: string
 *                  format: date
 *                  description: The departure date
 *              guests:
 *                  type: integer
 *                  description: The number of guests
 *              roomType:
 *                  type: string
 *                  description: The room type
 *              name:
 *                  type: string
 *                  description: The name of the person who made the reservation
 *              email:
 *                  type: string
 *                  description: The e-mail of the person who made the reservation
 *              paymentStatus:
 *                  type: string
 *                  description: The booking's status
 *          required:
 *              - hotelName
 *              - arrivalDate
 *              - departureDate
 *              - guests
 *              - roomType
 *              - name
 *              - email
 *              - paymentStatus
 *          example:
 *              hotelName: "California"
 *              arrivalDate: "2024-12-02"
 *              departureDate: "2024-12-07"
 *              guests: 2
 *              roomType: "VIP"
 *              name: "Charles"
 *              email: "charles@example.com"
 *              paymentStatus: "Pending"
 */

/**
 * @swagger
 * /api/booking:
 *  post:
 *      summary: Create a new booking
 *      tags: [Booking]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Booking'
 *      responses:
 *          200: 
 *              description: Booking created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Booking'
 */     

router.post("/booking", bookingController.create); // Asociamos el controlador de creación de pedidos

/**
 * @swagger
 * /api/booking:
 *  get:
 *      summary: Return all bookings
 *      tags: [Booking]
 *      responses:
 *          200: 
 *              description: Bookings successfully obtained
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Booking'
 */     

router.get("/booking", bookingController.findAll); // Asociamos el controlador de lectura de todos los pedidos

/**
 * @swagger
 * /api/booking/{id}:
 *  get:
 *    summary: Get information of a specific booking
 *    tags: [Booking]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The booking's unique identifier
 *    responses:
 *      200:
 *        description: Information of the specific booking
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Booking'
 */

router.get("/booking/:id", bookingController.findOne); // Asociamos el controlador de lectura de un pedido específico

/**
 * @swagger
 * /api/bookingFiltered/:
 *  get:
 *    summary: Search orders with filters
 *    tags: [Booking]
 *    parameters:
 *      - in: query
 *        name: hotelName
 *        schema:
 *          type: string
 *        description: The name of the hotel
 *      - in: query
 *        name: arrivalDate
 *        schema:
 *          type: string
 *          format: date
 *        description: The arrival date
 *      - in: query
 *        name: departureDate
 *        schema:
 *          type: string
 *          format: date
 *        description: The departure date
 *      - in: query
 *        name: roomType
 *        schema:
 *          type: string
 *        description: The room type
 *      - in: query
 *        name: paymentStatus
 *        schema:
 *          type: string
 *        description: The payment status
 *      - in: query
 *        name: guests
 *        schema:
 *          type: string
 *        description: The guest's number
 *    responses:
 *      200:
 *        description: A list of booking that match the filters
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Booking'
 */

router.get("/bookingFiltered", bookingController.filter); // Asociamos el controlador de búsqueda con filtros

/**
 * @swagger
 * /api/booking/{id}:
 *  patch:
 *    summary: Update information of a specific booking
 *    tags: [Booking]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The booking's unique identifier
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Booking'
 *    responses:
 *      200:
 *        description: Booking updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Booking'
 */

router.patch("/booking/:id", bookingController.update); // Asociamos el controlador de actualización de un pedido

/**
 * @swagger
 * /api/booking/{id}:
 *  delete:
 *    summary: Delete a specific booking
 *    tags: [Booking]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The booking's unique identifier
 *    responses:
 *      200:
 *        description: Booking deleted successfully
 */

router.delete("/booking/:id", bookingController.remove); // Asociamos el controlador de eliminación de un pedido

// Exportamos el router
module.exports = router; // Exportamos el router para usarlo en otras partes de la aplicación