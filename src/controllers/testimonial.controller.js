const Testimonial = require("../models/testimonial.model");

/* GET (public) */
exports.getTestimonials = async (req, res) => {
  try {
    let doc = await Testimonial.findOne();

    // যদি database empty থাকে
    if (!doc) {
      return res.json({
        testimonials: [],
        bottomNav: [],
      });
    }

    res.json({
      testimonials: doc.testimonials || [],
      bottomNav: doc.bottomNav || [],
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch testimonials",
    });
  }
};

exports.upsertTestimonials = async (req, res) => {
  try {
    const { testimonials = [], bottomNav = [] } = req.body;

    let doc = await Testimonial.findOne();

    if (!doc) {
      doc = await Testimonial.create({
        testimonials,
        bottomNav,
      });
    } else {
      doc.testimonials = testimonials;
      doc.bottomNav = bottomNav;
      await doc.save();
    }

    res.json({
      testimonials: doc.testimonials,
      bottomNav: doc.bottomNav,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save testimonials",
    });
  }
};

exports.deleteTestimonialItem = async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await Testimonial.findOne();

    if (!doc) {
      return res.status(404).json({
        message: "Testimonials not found",
      });
    }

    doc.testimonials = doc.testimonials.filter(
      (item) => item._id.toString() !== id
    );

    await doc.save();

    res.json({
      testimonials: doc.testimonials,
      bottomNav: doc.bottomNav,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete testimonial",
    });
  }
};
