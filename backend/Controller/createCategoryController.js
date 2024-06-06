const categoryModels = require("../Model/categoryModel");
var slugify = require("slugify");

exports.createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        success: false,
        message: "Name is Required",
      });
    }
    const existingCategory = await categoryModels.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exists",
      });
    }
    const category = await new categoryModels({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New Category is Added Successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

//update category
exports.updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { _id } = req.params;
    const category = await categoryModels.findByIdAndUpdate(
      _id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error While updating category",
      error,
    });
  }
};

//getall
exports.getallCategoryController = async (req, res) => {
  try {
    const category = await categoryModels.find({});
    res.status(200).send({
      success: true,
      message: "All category List",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error While gettin all category",
      error,
    });
  }
};

//single category
exports.singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModels.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Single Category getting successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error While single category",
      error,
    });
  }
};

//delete Category
exports.deleteCategoryController = async (req, res) => {
  try {
    const { _id } = req.params;
    const category = await categoryModels.findByIdAndDelete(_id);
    res.status(200).send({
      success: true,
      message: "Category deleted Successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error While deleted category",
      error,
    });
  }
};
