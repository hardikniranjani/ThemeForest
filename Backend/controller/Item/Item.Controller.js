const express = require('express');
const Item_Model = require('../../model/Item/Item');
const router = express.Router();
const auth = require('../../middlewares/auth');
const getToken = require('../../helpers/getToken');
const decodeToken = require('../../helpers/decodeToken');
const token = require('../../middlewares/token');

const fs = require('fs');
const sharp = require('sharp');
const multer = require('multer');
const fsExtra = require('fs-extra');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_Secrete = process.env.JWT_SECRET;
const JWT_Expired = process.env.JWT_EXPIRATION || "5200";
const JWT_Algorithm = process.env.JWT_ALGORITHM || "HS256";


const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'tmp/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimeType === 'image.jpeg' || file.mimeType === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10,
    }
})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DecodeToken 
router.put('/decode', async (req, res) => {
    const tokenData = req.body;
    const Token = await decodeToken(tokenData);

    if (!Token) return res.status(404).send({ Message: "Token not available" });

    return res.status(200).send(Token)

})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Create Items - Admin

router.post('/add', upload.single('image'), async (req, res) => {
    const data = req.body;
    if (req.file) {
        var ImagePath = req.file.path
        var Image = req.file.filename
    } else {
        var ImagePath = "";
        var Image = "";
    }

    const ItemData = await Item_Model.findOne({ title: data.title });
    if (ItemData) return res.status(500).send({ Message: "Item already created" });

    let Item = Item_Model({
        ...data,
        ImagePath,
        Image,
    });

    const NewItem = await Item.save();


    if (!NewItem) {
        return res.status(500).send({ Message: "can't add Item!" });
    } else {
        if (req.file) {
            const dirPath = `./uploads/Items/${NewItem._id}`;
            fs.mkdir(dirPath, {}, (err, data) => {
                if (err) throw err;
            })

            const fileName = req.file.filename.split('.').slice(0, -1).join('.');
            const FileFormat = req.file.filename.split('.').pop();


            const ItemData = await Item_Model.findByIdAndUpdate({ _id: NewItem._id },
                {
                    $set: {
                        imagePath: `${dirPath}/${fileName}_min.${FileFormat}`
                    }
                }, { new: true })

            try {
                sharp(req.file.path).resize(1366, 720).toFile(`${dirPath}/${fileName}_lrg.${FileFormat}`, (err, resizeImage) => {
                    if (err) throw err;
                    else console.log(resizeImage);
                })
                sharp(req.file.path).resize(590, 300).toFile(`${dirPath}/${fileName}_min.${FileFormat}`, (err, resizeImage) => {
                    if (err) throw err;
                    else console.log(resizeImage);
                })
                sharp(req.file.path).toFile(`${dirPath}/${req.file.filename}`, (err, resizeImage) => {
                    if (err) throw err;
                    else console.log(resizeImage);
                })
            }
            catch (error) {
                console.error(error);
            }
            return res.status(200).send(ItemData);

        }
        return res.status(200).send(NewItem);
    }


})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get all Items -- Admin

router.get('/all', async (req, res) => {
    const pageSize = req.query.pageSize
    const pageNumber = req.query.pageNumber
    const TotalItems = Item_Model.countDocuments();
    // .limit(pageSize).skip(pageSize * pageNumber)
    const Result = await Item_Model.find({ isActive: true })
                .populate({
                    path:'author',
                    populate: {
                        path: 'user',
                      }
                })
                .populate({
                    path:'itemDetails',
                    populate: [
                        {path:'Compatible_Browsers'},
                        {path:'Files_Included'},
                        {path:'Software_Version'},
                        {path:'CompatibleWith'},
                        {path:'Tags'},
                    ]
                })


    if (!Result) return res.status(404).send({ Message: "Items not found" })

    return res.status(200).send({ Result })

})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get Specific Item

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const Result = await Item_Model.findOne({ _id: id, isActive: true })
        .populate({
            path:'itemDetails',
            populate: [
                {path:'Compatible_Browsers'},
                {path:'Files_Included'},
                {path:'Software_Version'},
                {path:'CompatibleWith'},
                {path:'Tags'},
            ]
        })
        .populate({
            path:'author',
            populate: {
                path: 'user',
              }
        })

    if (!Result) return res.status(404).send({ Message: "Items not found" })

    return res.status(200).send(Result)
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Update Item 

router.put('/edit/:id', upload.single('image'), async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const Result = await Item_Model.findOne({ _id: id, isActive: true })
    if (!Result) return res.status(404).send({ message: "Author not found!" });

    if (req.file) {
        var ImagePath = req.file.path;
        var Image = req.file.filename;
    } else {
        var ImagePath = Result.imagePath;
        var Image = Result.image;
    }

    var UpdateItem = await Item_Model.findByIdAndUpdate(
        { _id: id },
        {
            $set: {
                ...data,
                imagePath: ImagePath,
                image: Image,
            }
        },
        { new: true }
    )

    if (!UpdateItem) {
        return res.status(404).send({ message: "Item not updated right now! please try again later" })
    }
    else {
        if (req.file) {

            const dirPath = `./uploads/Item/${id}`;

            if (!dirPath) {
                fs.mkdir(dirPath, {}, (err) => {
                    if (err) throw err;
                })
            }
            fsExtra.emptyDirSync(dirPath);
            const fileName = req.file.filename.split('.').slice(0, -1).join('.')
            const FileFormat = req.file.filename.split('.').pop();

            const itemData = await Item_Model.findByIdAndUpdate({ _id: id }, {
                $set: {
                    imagePath: `${dirPath}/${fileName}_min.${FileFormat}`
                }
            }, { new: true })
            try {
                sharp(req.file.path).resize(1366, 720).toFile(`${dirPath}/${fileName}_lrg.${FileFormat}`, (err, resizeImage) => {
                    if (err) throw err;
                    else console.log(resizeImage);
                })
                sharp(req.file.path).resize(590, 300).toFile(`${dirPath}/${fileName}_min.${FileFormat}`, (err, resizeImage) => {
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
            return res.status(200).send(itemData);
        }
    }
    return res.status(200).send(UpdateItem);
})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Soft delete Item 

router.put('/remove/:id', async (req, res) => {

    const id = req.params.id;

    const user = await Item_Model.findOne({ _id: id, isActive: true });

    if (!user) return res.status(404).send({ Message: "Item not found" });

    const result = await Item_Model.findByIdAndUpdate({ _id: id }, {
        $set: {
            isActive: false
        }
    }, { new: true })

    if (!result) return res.status(500).send({ Message: "Can't remove Item right now!!" });
    return res.status(200).send({ Message: "Item successfully removed" });
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Hard delete Item 

router.delete('/delete/:id', async (req, res) => {

    const id = req.params.id;

    const item = await Item_Model.findOne({ _id: id });

    if (!item) return res.status(404).send({ Message: "Item not found" });

    const result = await Item_Model.findByIdAndDelete({ _id: id })

    if (!result) return res.status(500).send({ Message: "Can't delete Item right now!!" });
    return res.status(200).send({ Message: "Item Permanently deleted Successfully" });
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Approve Item -- Admin

router.put('/approve/:id', async (req, res) => {
    const id = req.params.id;

    const item = await Item_Model.findOne({ _id: id });
    if (!item) return res.status(404).send({ Message: "Item not found" });
    const result = await Item_Model.findByIdAndUpdate({ _id: id }, {
        $set: {
            isApproved: 1
        }
    }, { new: true })

    if (!result) return res.status(500).send({ Message: "Can't aproved Item right now!!" });
    return res.status(200).send({ Message: "Item successfully approved" });
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Reject Item -- Admin
router.put('/reject/:id', async (req, res) => {
    const id = req.params.id;

    const item = await Item_Model.findOne({ _id: id });
    if (!item) return res.status(404).send({ Message: "Item not found" });
    const result = await Item_Model.findByIdAndUpdate({ _id: id }, {
        $set: {
            isApproved: 2
        }
    }, { new: true })

    if (!result) return res.status(500).send({ Message: "Can't aproved Item right now!!" });
    return res.status(200).send({ Message: "Item successfully approved" });
})
module.exports = router;