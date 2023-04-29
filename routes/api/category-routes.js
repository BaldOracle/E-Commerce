const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Product // Include associated Products
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: Product // Include associated Products
    });
    if (!category) {
      res.status(404).json({ message: `Category with ID ${req.params.id} not found` });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

// POST a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

// PUT (update) a category by ID
router.put('/:id', async (req, res) => {
  try {
    const [rowsUpdated, [updatedCategory]] = await Category.update(req.body, {
      where: { id: req.params.id },
      returning: true // Return the updated category object
    });
    if (rowsUpdated === 0) {
      res.status(404).json({ message: `Category with ID ${req.params.id} not found` });
      return;
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a category by ID
router.delete('/:id', async (req, res) => {
  try {
    const rowsDeleted = await Category.destroy({ where: { id: req.params.id } });
    if (rowsDeleted === 0) {
      res.status(404).json({ message: `Category with ID ${req.params.id} not found` });
      return;
    }
    res.status(200).json({ message: `Category with ID ${req.params.id} deleted successfully` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
