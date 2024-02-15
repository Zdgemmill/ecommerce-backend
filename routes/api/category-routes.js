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


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
