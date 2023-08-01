// productController.js
const { set } = require("mongoose");
const Category = require("../models/CategoryModel");

const getCategories = async (req, res, next) => {
  try {
    const category = await Category.find({}).sort({ name: "asc" }).orFail()
    res.json(category)
  } catch (error) {
    next(error)
  }
};

const newCategory = async (req, res, next) => {
  try {
    const { category } = req.body
    // i have extracted the value of category from the object {category: "shoes"}
    // console.log(category)   
    if (!category) {
      // throw new Error("category input is requiered in the body object")
      res.status(400).send("category input in body is required")
    }
    const categoryExists = await Category.findOne({ name: category })
    if (categoryExists) {
      res.status(400).send("category already exists")
    } else {
      const categoryCreated = await Category.create({
        name: category
      })
      res.status(201).send({ categoryCreated: categoryCreated })
    }
  } catch (error) {
    next(error)
  }
}


const deleteCategory = async (req, res, next) => {
  try {
    if (req.params.category !== "choose category") {
      const categoryExists = await Category.findOne({
        name: decodeURIComponent(req.params.category)
      }).orFail()

      await categoryExists.deleteOne()
      res.json({ categoryDeleted: true, named: categoryExists })
    }
  } catch (error) {
    next(error)
  }
}

const saveAttrs = async (req, res, next) => {
  const { key, val, categoryChoosen } = req.body
  if (!key || !val || !categoryChoosen) {
    return res.status(400).send("key value and choosen category is required" + key + val + categoryChoosen)
  }
  try {
    // bcoz our category will same but companies different laptops/dell or /asus
    const category = categoryChoosen.split("/")[0]
    const categoryExists = await Category.findOne({ name: category }).orFail()
    // console.log(categoryExists)

    if (categoryExists.attrs.length > 0) {
      var keyDoesNotExistInDatabase = true

      categoryExists.attrs.map((item, idx) => {
        if (item.key === key) {
          keyDoesNotExistInDatabase = false;
          var copyAttributeValues = [...categoryExists.attrs[idx].value]
          copyAttributeValues.push(val)   //this val shouldn't be array must be unique string to push

          var newAttributeValues = [...new Set(copyAttributeValues)]
          // to ensure to remove duplicate values

          // overwridding the existing values of key with new ones
          categoryExists.attrs[idx].value = newAttributeValues
        }
      })
      if (keyDoesNotExistInDatabase) {
        categoryExists.attrs.push({ key: key, value: [val] })
      }
    }
    else {
      // push to the empty attrs array
      categoryExists.attrs.push({ key: key, value: [val] })
    }
    await categoryExists.save()
    let cat = await Category.find({ name: category }).sort({ name: "asc" })
    return res.status(201).json({
      previousCategoryExisted: categoryExists,
      categoriesUpdated: cat,
    })
  } catch (error) {
    next(error)
  }
}

const deleteAttribute = async (req, res, next) => {
  try {
    const { categ, key, val } = req.body;
    console.log(categ)
    if (!categ || !key || !val) {
      return res.status(400).send("Category, key, and value are required");
    }
    const category = categ.split("/")[0];
    const categoryExists = await Category.findOne({ name: category }).orFail();

    categoryExists.attrs.forEach((item) => {
      if (item.key === key) {
        const updatedValues = item.value.filter((value) => value !== val);
        item.value = updatedValues;
      }
    });
    await categoryExists.save();
    return res.json({ updatedCategory: categoryExists });
  } catch (error) {
    next(error);
  }
};





module.exports = {
  getCategories, newCategory, deleteCategory, saveAttrs, deleteAttribute
};