const express = require('express');
const Category_Model = require('../model/Category.model');
const router = express.Router();
const auth = require('../middlewares/auth');

const fs = require('fs');
const sharp = require('sharp');
const multer = require("multer");
const fsExtra = require('fs-extra');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "tmp/");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({

    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 20,
    },
    fileFilter: fileFilter,
});


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Create Category

router.post('/', auth, upload.single("image"), async (req, res) => {
    const data = req.body;
    if (req.file) {
        var ImagePath = req.file.path
        var Image = req.file.filename
    } else {
        var ImagePath = "";
        var Image = "";
    }
    // if (!req.file) return res.status(400).send({ message: "Please upload Image" });
    const CategoryName = await Category_Model.findOne({ name: req.body.name, parentCategory: req.body.parentCategory });
    console.log(CategoryName)
    if (CategoryName) return res.status(400).send({ message: "Category Name is already in use" });

    let productCategory = new Category_Model({
        ...data,
        imagePath: ImagePath,
        image: Image,

    })

    const NewCategoryModel = await productCategory.save();

    if (data.parentCategory) {
        await Category_Model.findByIdAndUpdate({ _id: data.parentCategory }, {
            $set: {
                isLeaf: false
            }
        }, { new: true })
    }

    if (!NewCategoryModel) {
        return res.status(500).send({ message: "can't create Product Category Right Now, Try again latter!" });
    }
    else {
        if (req.file) {
            const fileName = req.file.filename.split('.').slice(0, -1).join('.')
            const FileFormat = req.file.filename.split('.').pop();
            const dirPath = `./uploads/Category/${NewCategoryModel._id}`;
            fs.mkdir(dirPath, {}, (err) => {
                if (err) throw err;
            })
            const data = await Category_Model.findByIdAndUpdate({ _id: NewCategoryModel._id }, {
                $set: {
                    imagePath: `${dirPath}/${fileName}_min.${FileFormat}`
                }
            }, { new: true })
            try {
                sharp(req.file.path).resize(200, 200).toFile(`${dirPath}/${fileName}_lrg.${FileFormat}`, (err, resizeImage) => {
                    if (err) throw err;
                    else console.log(resizeImage);
                })
                sharp(req.file.path).resize(100, 100).toFile(`${dirPath}/${fileName}_min.${FileFormat}`, (err, resizeImage) => {
                    if (err) throw err;
                    else console.log(resizeImage);
                })
                sharp(req.file.path).toFile(`${dirPath}/${req.file.filename}`, (err, resizeImage) => {
                    if (err) throw err;
                    else console.log(resizeImage);
                })

            } catch (error) {
                console.error(error);
            }
            // const mainPath = './tmp';
            //  fsExtra.emptyDirSync(mainPath);
            return res.status(200).send(data);
        }
        return res.status(200).send(NewCategoryModel);
    }
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get all Category

router.get('/', async (req, res) => {
    // const pageSize = req.query.pageSize
    // const pageNumber = req.query.pageNumber
    // .limit(pageSize).skip(pageSize * pageNumber);
    var data = await Category_Model.find({ isActive: true }).populate('parentCategory');


    if (!data) {
        return res.status(404).send({ massaage: "No product categories found" })
    }
    else {
        return res.status(200).send(data)
    }
})
           
           
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get Category Recusively
function createCategory({ categories, parentCategory = null }) {
    const categoryList = [];
    let category;
    if (parentCategory == null) {
        category = categories.filter(cat => cat.parentCategory == undefined);
    } else {
        category = categories.filter(cat => cat.parentCategory == parentCategory.toString());
    }

    for (let cate of category) {
        if (createCategory({ categories: categories, parentCategory: cate._id }).length > 0) {
            categoryList.push({
                _id: cate._id,
                value: cate.name,
                label: cate.name,
                options: createCategory({ categories: categories, parentCategory: cate._id })
            });
        } else {
            categoryList.push({
                _id: cate._id,
                value: cate.name,
                label: cate.name,
            });
        }
    }

    return categoryList;
}

router.get('/recusively', auth, async (req, res) => {
    Category_Model.find({ isActive: true }).exec((err, categories) => {
        if (err) return res.status(404).send({ massaage: "No product categories found" })

        if (categories) {
            const CategoryList = createCategory({ categories: categories });
            res.status(200).json(CategoryList)
        }
    })
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Update Category

router.put('/edit/:id', upload.single('image'), auth, async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const Result = await Category_Model.findOne({ _id: id });
    if (!Result) return res.status(404).send({ message: "Category not found!" });

    if (req.file) {
        var ImagePath = req.file.path;
        var Image = req.file.filename;
    } else {
        var ImagePath = Result.imagePath;
        var Image = Result.image;
    }

    const UpdateCategory = await Category_Model.findByIdAndUpdate(
        { _id: id },
        {
            $set: {
                ...data,
                imagePath: ImagePath,
                image: Image,
            },
        },
        { new: true }
    );

    if (!UpdateCategory)
        return res.status(500).send({
            message: "Category can not updated right now! please try again later",
        });
    else {
        if (req.file) {

            const dirPath = `./uploads/Category/${id}`;

            if (!dirPath) {
                fs.mkdir(dirPath, {}, (err) => {
                    if (err) throw err;
                })
            }
            fsExtra.emptyDirSync(dirPath);
            const fileName = req.file.filename.split('.').slice(0, -1).join('.')
            const FileFormat = req.file.filename.split('.').pop();

            const categoryData = await Category_Model.findByIdAndUpdate({ _id: id }, {
                $set: {
                    imagePath: `${dirPath}/${fileName}_min.${FileFormat}`
                }
            }, { new: true })
            try {
                sharp(req.file.path).resize(200, 200).toFile(`${dirPath}/${fileName}_lrg.${FileFormat}`, (err, resizeImage) => {
                    if (err) throw err;
                    else console.log(resizeImage);
                })
                sharp(req.file.path).resize(100, 100).toFile(`${dirPath}/${fileName}_min.${FileFormat}`, (err, resizeImage) => {
                    if (err) throw err;
                    else console.log(resizeImage);
                })
                sharp(req.file.path).toFile(`${dirPath}/${req.file.filename}`, (err, resizeImage) => {
                    if (err) throw err;
                    else console.log(resizeImage);
                })

            } catch (error) {
                console.error(error);
            }
            return res.status(200).send(categoryData);
        }
    }
    return res.status(200).send(UpdateCategory);

})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Soft delete Category

router.put('/remove/:id', auth, async (req, res) => {
    const id = req.params.id;
    var data = await Category_Model.findOne({ _id: id, isActive: true })
    if (!data) return res.status(404).send({ Massaage: "No product categories found" })

    if (data.isLeaf === true) {
        const result = await Category_Model.findByIdAndUpdate({ _id: id }, {
            $set: {
                isActive: false,
            }
        }, { new: true })

        if (!result) return res.status(500).send({ Massaage: "Can't update right now" })

        return res.status(200).send({ Massaage: "Category remove successfully" })

    } else {
        return res.status(500).send({ Massaage: "Can't remove parent category.Please, remove child category first" })
    }

})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Hard delete Category

router.delete('/delete/:id', auth, async (req, res) => {
    const id = req.params.id;
    var data = await Category_Model.findOne({ _id: id })
    if (!data) return res.status(404).send({ Massaage: "No product categories found" })

    if (data.isLeaf === true) {
        const result = await Category_Model.findByIdAndDelete({ _id: id })

        if (!result) return res.status(500).send({ Massaage: "Can't update right now" })

        return res.status(200).send({ Massaage: "Category Permanently deleted Successfully" })

    } else {
        return res.status(500).send({ Massaage: "Can't remove parent category.Please, remove child category first" })
    }
})


module.exports = router;