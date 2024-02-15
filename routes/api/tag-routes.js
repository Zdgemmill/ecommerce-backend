const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all tags and include associated Product data
    const tagData = await Tag.findAll({
      include: { model: Product, as: 'products' }
    });

    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    // Find the tag by its ID and include associated Product data
    const tagData = await Tag.findByPk(tagId, {
      include: { model: Product, as: 'products' }
    });

    if (!tagData) {
      res.status(404).json({ message: 'Tag not found!' });
      return;
    }

    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { tagName } = req.body;

    // Create a new tag
    const newTag = await Tag.create({
      tag_name: tagName
    });

    res.status(201).json(newTag);
  } catch (err) {

    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const { tagName } = req.body;

    // Check if the tag exists
    const existingTag = await Tag.findByPk(tagId);
    if (!existingTag) {
      res.status(404).json({ message: 'Tag not found!' });
      return;
    }

    // Update the tag's name
    await Tag.update({ tag_name: tagName }, {
      where: { id: tagId }
    });

    // Fetch the updated tag
    const updatedTag = await Tag.findByPk(tagId);

    res.status(200).json(updatedTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;

    // Delete the tag
    const deletedTagCount = await Tag.destroy({
      where: { id: tagId }
    });

    // Check if any tag was deleted
    if (deletedTagCount === 0) {

      res.status(404).json({ message: 'Tag not found!' });
      return;
    }

    // Respond with a success message
    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
