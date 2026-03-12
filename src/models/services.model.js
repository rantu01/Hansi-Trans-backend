const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
  },
  { _id: false }
);

const simpleContentCardSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: false }
);

const detailSectionSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    layout: {
      type: String,
      enum: ['image-left', 'image-right', 'full-width'],
      default: 'image-left',
    },
    items: [{ type: String }],
  },
  { _id: false }
);

const metaTagsSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    keywords: [{ type: String }],
    ogImage: { type: String, default: '' },
  },
  { _id: false }
);

const servicePageContentSchema = new mongoose.Schema(
  {
    subServicesTitle: { type: String, default: '' },
    subServicesDescription: { type: String, default: '' },
    supportTitle: { type: String, default: '' },
    supportDescription: { type: String, default: '' },
    supportHighlights: [simpleContentCardSchema],
    coverageTitle: { type: String, default: '' },
    coverageDescription: { type: String, default: '' },
  },
  { _id: false }
);

const subServicePageContentSchema = new mongoose.Schema(
  {
    introTitle: { type: String, default: '' },
    introDescription: { type: String, default: '' },
    featureCards: [simpleContentCardSchema],
    detailSections: [detailSectionSchema],
    footerTitle: { type: String, default: '' },
    footerDescription: { type: String, default: '' },
  },
  { _id: false }
);

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    slugPath: { type: String, unique: true, sparse: true },
    description: { type: String, required: true },
    content: { type: String, default: '' },
    image: { type: String, required: true },
    images: [{ type: String }],
    bgColor: { type: String, default: 'bg-[#e0f2fe]' },
    features: [{ type: String }],
    professionalSupports: [cardSchema],
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    metaTags: {
      type: metaTagsSchema,
      default: () => ({}),
    },
    servicePageContent: {
      type: servicePageContentSchema,
      default: () => ({}),
    },
    subServicePageContent: {
      type: subServicePageContentSchema,
      default: () => ({}),
    },
    parentService: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
