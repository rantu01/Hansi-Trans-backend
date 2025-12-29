const WhyChooseUs = require("../models/whyChooseUs.model");

/* GET (Public) */
exports.getWhyChooseUs = async (req, res) => {
  const data = await WhyChooseUs.findOne();
  res.json(data);
};

/* CREATE / UPDATE (Admin) */
exports.upsertWhyChooseUs = async (req, res) => {
  const { cards } = req.body;

  let doc = await WhyChooseUs.findOne();

  if (!doc) {
    doc = await WhyChooseUs.create({ cards });
  } else {
    doc.cards = cards;
    await doc.save();
  }

  res.json(doc);
};

/* DELETE single card */
exports.deleteWhyChooseCard = async (req, res) => {
  const { key } = req.params;

  const doc = await WhyChooseUs.findOne();
  doc.cards = doc.cards.filter(
    (card) => card.key !== key
  );

  await doc.save();
  res.json(doc);
};
