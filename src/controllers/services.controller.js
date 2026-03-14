const Service = require('../models/services.model');

const normalizeText = (value = '') => value.toString().trim();

const normalizeSlug = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const normalizeSlugPath = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .map(normalizeSlug)
    .filter(Boolean)
    .join('/');

const sanitizeStringArray = (value) =>
  Array.isArray(value) ? value.map((item) => normalizeText(item)).filter(Boolean) : [];

const sanitizeProfessionalSupports = (value) =>
  Array.isArray(value)
    ? value
        .map((item) => ({
          title: normalizeText(item?.title),
          description: normalizeText(item?.description),
          image: normalizeText(item?.image),
        }))
        .filter((item) => item.title || item.description || item.image)
    : [];

const sanitizeSimpleCards = (value) =>
  Array.isArray(value)
    ? value
        .map((item) => ({
          title: normalizeText(item?.title),
          description: normalizeText(item?.description),
        }))
        .filter((item) => item.title || item.description)
    : [];

const sanitizeDetailSections = (value) =>
  Array.isArray(value)
    ? value
        .map((item) => ({
          title: normalizeText(item?.title),
          description: normalizeText(item?.description),
          image: normalizeText(item?.image),
          layout: ['image-left', 'image-right', 'full-width'].includes(item?.layout)
            ? item.layout
            : 'image-left',
          items: sanitizeStringArray(item?.items),
        }))
        .filter((item) => item.title || item.description || item.image || item.items.length > 0)
    : [];

const sanitizeMetaTags = (value = {}) => ({
  title: normalizeText(value.title),
  description: normalizeText(value.description),
  keywords: sanitizeStringArray(value.keywords),
  ogImage: normalizeText(value.ogImage),
});

const sanitizeServicePageContent = (value = {}) => ({
  badgeText: normalizeText(value.badgeText),
  projectSummaryText: normalizeText(value.projectSummaryText),
  featureDescription: normalizeText(value.featureDescription),
  supportFeatures: sanitizeSimpleCards(value.supportFeatures),
  subServicesTitle: normalizeText(value.subServicesTitle),
  subServicesDescription: normalizeText(value.subServicesDescription),
  supportTitle: normalizeText(value.supportTitle),
  supportDescription: normalizeText(value.supportDescription),
  supportHighlights: sanitizeSimpleCards(value.supportHighlights),
  coverageTitle: normalizeText(value.coverageTitle),
  coverageDescription: normalizeText(value.coverageDescription),
});

const sanitizeSubServicePageContent = (value = {}) => ({
  introTitle: normalizeText(value.introTitle),
  introDescription: normalizeText(value.introDescription),
  featureCards: sanitizeSimpleCards(value.featureCards),
  detailSections: sanitizeDetailSections(value.detailSections),
  footerTitle: normalizeText(value.footerTitle),
  footerDescription: normalizeText(value.footerDescription),
});

const hasMeaningfulValue = (value = {}) =>
  Object.values(value).some((item) => {
    if (Array.isArray(item)) {
      return item.length > 0;
    }

    return Boolean(item);
  });

const sanitizePayload = (payload = {}) => {
  const normalized = {
    title: normalizeText(payload.title),
    slug: normalizeSlug(payload.slug || payload.title),
    description: normalizeText(payload.description),
    content: normalizeText(payload.content),
    image: normalizeText(payload.image),
    images: sanitizeStringArray(payload.images),
    bgColor: normalizeText(payload.bgColor) || 'bg-[#e0f2fe]',
    features: sanitizeStringArray(payload.features),
    supportFeatures: sanitizeSimpleCards(payload.supportFeatures),
    featureDescription: normalizeText(payload.featureDescription),
    professionalSupports: sanitizeProfessionalSupports(payload.professionalSupports),
    metaTitle: normalizeText(payload.metaTitle),
    metaDescription: normalizeText(payload.metaDescription),
    metaTags: sanitizeMetaTags(payload.metaTags || {}),
    servicePageContent: sanitizeServicePageContent(payload.servicePageContent || {}),
    subServicePageContent: sanitizeSubServicePageContent(payload.subServicePageContent || {}),
    parentService: payload.parentService || null,
  };

  if (!hasMeaningfulValue(normalized.metaTags)) {
    normalized.metaTags = {};
  }

  if (!hasMeaningfulValue(normalized.servicePageContent)) {
    normalized.servicePageContent = {};
  }

  if (!hasMeaningfulValue(normalized.subServicePageContent)) {
    normalized.subServicePageContent = {};
  }

  return normalized;
};

const resolveSlugPath = async ({ slug, parentService, currentServiceId }) => {
  if (!parentService) {
    return slug;
  }

  if (currentServiceId && String(parentService) === String(currentServiceId)) {
    throw new Error('Service cannot be its own parent');
  }

  const parent = await Service.findById(parentService).select('slug slugPath parentService');
  if (!parent) {
    throw new Error('Parent service not found');
  }

  if (parent.parentService) {
    throw new Error('Only main services can be selected as a parent');
  }

  return normalizeSlugPath(`${parent.slugPath || parent.slug}/${slug}`);
};

const prepareServicePayload = async (payload, currentServiceId = null) => {
  const normalized = sanitizePayload(payload);

  if (!normalized.slug) {
    throw new Error('Slug or title is required');
  }

  normalized.slugPath = await resolveSlugPath({
    slug: normalized.slug,
    parentService: normalized.parentService,
    currentServiceId,
  });

  return normalized;
};

const refreshChildSlugPaths = async (parentId) => {
  const parent = await Service.findById(parentId).select('slug slugPath');
  if (!parent) {
    return;
  }

  const children = await Service.find({ parentService: parentId }).select('_id slug');
  for (const child of children) {
    const slugPath = normalizeSlugPath(`${parent.slugPath || parent.slug}/${child.slug}`);
    await Service.findByIdAndUpdate(child._id, { slugPath });
    await refreshChildSlugPaths(child._id);
  }
};

exports.createService = async (req, res) => {
  try {
    const payload = await prepareServicePayload(req.body);
    const service = new Service(payload);
    await service.save();

    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate('parentService', 'title slug slugPath')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMainServices = async (req, res) => {
  try {
    const services = await Service.find({ parentService: null }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSubServices = async (req, res) => {
  try {
    const { parentSlug } = req.params;
    const parent = await Service.findOne({ slug: normalizeSlug(parentSlug) });
    if (!parent) {
      return res.status(404).json({ success: false, message: 'Parent service not found' });
    }

    const subServices = await Service.find({ parentService: parent._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, parent, subServices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getServiceBySlug = async (req, res) => {
  try {
    const normalizedSlug = normalizeSlug(req.params.slug);
    const service = await Service.findOne({
      $or: [{ slug: normalizedSlug }, { slugPath: normalizedSlug }],
    }).populate('parentService', 'title slug slugPath');

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    const subServices = await Service.find({ parentService: service._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        ...service._doc,
        subServices,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getServiceByPath = async (req, res) => {
  try {
    const rawPath = req.params.rest || req.params[0] || '';
    const normalizedPath = normalizeSlugPath(rawPath);
    const segments = normalizedPath.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    const parentSegment = segments[segments.length - 2] || '';

    const candidates = await Service.find({
      $or: [{ slugPath: normalizedPath }, { slug: lastSegment }],
    }).populate('parentService', 'title slug slugPath');

    const service =
      candidates.find((item) => item.slugPath === normalizedPath) ||
      candidates.find((item) => normalizeSlug(item.parentService?.slug || '') === parentSegment) ||
      candidates[0];

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    const subServices = await Service.find({ parentService: service._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        ...service._doc,
        subServices,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const existingService = await Service.findById(req.params.id).select('_id parentService');
    if (!existingService) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    const hasChildren = await Service.exists({ parentService: req.params.id });
    if (req.body.parentService && hasChildren) {
      return res.status(400).json({
        success: false,
        message: 'A service with sub-services cannot be assigned under another parent',
      });
    }

    const payload = await prepareServicePayload(req.body, req.params.id);
    const service = await Service.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    await refreshChildSlugPaths(req.params.id);

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const hasChildren = await Service.exists({ parentService: req.params.id });
    if (hasChildren) {
      return res.status(400).json({
        success: false,
        message: 'Delete child services first before deleting this parent service',
      });
    }

    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
