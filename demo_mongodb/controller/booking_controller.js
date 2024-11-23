import Booking from "../model/booking.js";
import Status from "../model/booking.js";


class BookingController {
  static async cancelBooking(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.render('404', { message: 'There something went wrong: ', error });
      }

      let booking = await Booking.findById({ _id: id });

      if (booking != null) {
        booking.status = "Cancelled";
        await booking.save();
        req.flash('success', 'Booking cancelled successfully');
        return res.redirect("/booking/home/accommodation");
      } else {
        return res.render('404', { message: 'Booking not found: ', error });
      }
    } catch (error) {
      console.error("There was an error: ", e);
      return res.render('404', { message: 'There something went wrong: ', error });
    }
  }

  static async updateBookingPost(req, res) {
    //const {_id, title, description, instructions, prepTime, ingredients, category, cookTime, difficulty, images} = req.body;
    const { _id, customerName, status, date } = req.body;

    try {
      const booking = await Booking.findById(_id);
      if (booking) {
        if (customerName) booking.customerName = customerName;
        if (status) booking.status = status;
        if (date) booking.date = date;
      } else {
        return res.render('404', { message: 'Booking not found: ', error });
      }

      await booking.save();
      return res.redirect("/booking/home/accommodation");

    } catch(error) {
      res.render('error', { 'message': error });
    }
  }


  static async updateBooking(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.render('404', { message: 'There something went wrong: ', error });
      }

      let booking = await Booking.findById({ _id: id });

      if (booking != null) {
        return res.render('booking_update', { 'booking': booking, '_id': id });
      } else {
        return res.render('404', { message: 'Booking not found: ', error });
      }
    } catch (error) {
      console.error("There was an error: ", e);
      return res.render('404', { message: 'There something went wrong: ', error });
    }
  }

  static async removeBooking(req, res) {
    const id = req.params.id;
    try {
      const booking = await Booking.findById({ _id: id });
      if (booking) {
        await Booking.deleteOne(booking);
        return res.redirect("/booking/home/accommodation");
      } else {
        return res.render('404', { message: 'There something went wrong: ', error });
      }
    } catch (error) {
      console.error("There was an error: ", e);
      return res.render('404', { message: 'There something went wrong: ', error });
    }
  }

  static async homePage(req, res) {
    try {
      const bookings = await Booking.find();
      return res.render("index", { bookings });
    } catch (error) {
      res.render('404', { message: 'There something went wrong: ', error });
    }
  }

  static async saveBooking(req, res) {
    const { customerName, date } = req.body;

    try {
      const booking = new Booking({
        customerName: customerName || '',
        date: date || new Date(),
        status: Status.Confirmed
      });
      //if (customerName) booking.customerName = customerName;
      //if (date) booking.date = date;
      //booking.status = Status.Confirmed;

      try {
        await booking.save();
        return res.redirect("/booking/home/accommodation");
      } catch (error) {
        res.render('404', { message: 'There something went wrong while trying to save the model: ', error });
      }

    } catch (error) {
      res.render('404', { message: 'There something went wrong: ', error });
    }

  }

  static async saveBookingForm(req, res) {
    return res.render('form');
  }
}

export default BookingController;
