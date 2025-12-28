require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const siteRoutes = require("./routes/site.routes");
const featuredCaseStudyRoutes = require("./routes/featuredCaseStudy.routes");
const ourInfluencerRoutes = require("./routes/ourInfluencer.routes");
const testimonialRoutes = require("./routes/testimonial.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// DB Connect
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("CMS Backend Running 🚀");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/site", siteRoutes);
app.use("/api/common/featured-case-studies", featuredCaseStudyRoutes);
app.use("/api/common/our-influencers", ourInfluencerRoutes);
app.use("/api/common/testimonials", testimonialRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
