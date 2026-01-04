require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const siteRoutes = require("./routes/site.routes");
const featuredCaseStudyRoutes = require("./routes/featuredCaseStudy.routes");
const ourInfluencerRoutes = require("./routes/ourInfluencer.routes");
const testimonialRoutes = require("./routes/testimonial.routes");
const whyChooseUsRoutes = require("./routes/whyChooseUs.routes");
const workProcessRoutes = require("./routes/workProcess.routes");
const uploadRoutes = require("./routes/upload.routes");
const aboutRoutes = require("./routes/aboutUs.routes");
const domainsRoutes = require("./routes/domains.routes");
const serviceRoutes = require("./routes/services.routes");
const statRoutes = require('./routes/statRoutes');
const partnerRoutes = require('./routes/partnerRoutes');

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
app.use("/api/services", serviceRoutes);
app.use("/api/about-us", aboutRoutes);
app.use("/api/common/featured-case-studies", featuredCaseStudyRoutes);
app.use("/api/common/our-influencers", ourInfluencerRoutes);
app.use("/api/common/testimonials", testimonialRoutes);
app.use("/api/common/why-choose-us", whyChooseUsRoutes);
app.use("/api/common/work-process", workProcessRoutes);
app.use("/api/common/domains", domainsRoutes);
app.use('/api/common/stats', statRoutes);
app.use('/api/common/partners', partnerRoutes);
app.use("/api/upload", uploadRoutes);



//------------------------------------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
