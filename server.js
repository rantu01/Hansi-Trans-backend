require("dotenv").config();
const express = require("express");
const cors = require("cors");

// DB
const connectDB = require("./src/config/db");

// Routes
const authRoutes = require("./src/routes/auth.routes");
const siteRoutes = require("./src/routes/site.routes");
const featuredCaseStudyRoutes = require("./src/routes/featuredCaseStudy.routes");
const ourInfluencerRoutes = require("./src/routes/ourInfluencer.routes");
const testimonialRoutes = require("./src/routes/testimonial.routes");
const whyChooseUsRoutes = require("./src/routes/whyChooseUs.routes");
const workProcessRoutes = require("./src/routes/workProcess.routes");
const uploadRoutes = require("./src/routes/upload.routes");
const aboutRoutes = require("./src/routes/aboutUs.routes");
const domainsRoutes = require("./src/routes/domains.routes");
const serviceRoutes = require("./src/routes/services.routes");
const statRoutes = require("./src/routes/statRoutes");
const partnerRoutes = require("./src/routes/partnerRoutes");
const caseStudyRoutes = require("./src/routes/caseStudyRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const settingRoutes = require("./src/routes/settingRoutes");

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
app.use("/api/common/stats", statRoutes);
app.use("/api/common/partners", partnerRoutes);

app.use("/api/upload", uploadRoutes);
app.use("/api/case-studies", caseStudyRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/site/settings", settingRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
