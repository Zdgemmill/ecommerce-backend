const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const categoriesWithProducts = await Category.findAll({
      include: [{
        model: Product,
        as: 'products',
        required: true,
      }]
    });
    res.status(200).json(categoriesWithProducts);
    if (!categoriesWithProducts) {
      res.status(404).json({ message: 'no categories found!' });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//getting a product by id
router.get('/:id', async (req, res) => {
  try {
    const selectedCategory = await Category.findByPk(req.params.id, {
      include: {
        model: Product,
        as: 'products',
      }
    });

    if (!selectedCategory) {
      res.status(404).json({ message: 'Category not found!' });
      return;
    }

    res.status(200).json(selectedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { categoryName } = req.body;

    // Create a new category
    const newCategory = await Category.create(req.body);

    // Respond with the newly created category
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { category_name } = req.body;

    // Check if the category exists
    const existingCategory = await Category.findByPk(categoryId);
    if (!existingCategory) {
      res.status(404).json({ message: 'Category not found!' });
      return;
    }

    // Update the category

    //   Product.update(req.body, {
    //   where: {
    //     id: req.params.id,
    //   },
    // })
    await Category.update({ category_name }, {
      where: { category_id: categoryId }
    });

    // Fetch the updated category
    const updatedCategory = await Category.findByPk(categoryId);

    // Respond with the updated category

    console.log(updatedCategory);
    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Delete the category
    const deletedCategory = await Category.destroy({
      where: { category_id: categoryId }
    });

    if (deletedCategory === 0) {
      res.status(404).json({ message: 'Category not found!' });
      return;
    }

    // Respond with a success message
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
