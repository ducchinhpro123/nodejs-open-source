import express           from "express";
import BookingController from "../controller/booking_controller.js";

export const bookingRouter = express.Router();

bookingRouter.post("/accommodation",              BookingController.saveBooking);
bookingRouter.get("/accommodation",               BookingController.saveBookingForm);
bookingRouter.get("/home/accommodation",          BookingController.homePage);
bookingRouter.post("/home/accommodation/update",  BookingController.updateBookingPost);
bookingRouter.get("/remove/:id",                  BookingController.removeBooking);
bookingRouter.get("/update/:id",                  BookingController.updateBooking);
bookingRouter.get("/cancel/:id",                  BookingController.cancelBooking);

