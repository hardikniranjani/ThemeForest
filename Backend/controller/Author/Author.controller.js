const express = require('express');
const User_Model = require('../../model/User.model');
const router = express.Router();
const auth = require('../../middlewares/auth');
const getToken = require('../../helpers/getToken');
const token = require('../../middlewares/token');

const fs = require('fs');
const sharp = require('sharp');
const multer = require('multer');
const fsExtra = require('fs-Extra');
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
// Register Author  

router.post('/register', upload.single('image'), async (req, res) => {
    const data = req.body;
    if (req.file) {
        var ImagePath = req.file.path
        var Image = req.file.filename
    } else {
        var ImagePath = "";
        var Image = "";
    }

    const UserData = await User_Model.findOne({ username: data.username, user: data.user });
    if (UserData) return res.status(500).send({ message: "Username or user is already registered" });

    const hash_password = await bcrypt.hash(data.password, 12);

    let User = new User_Model({
        ...data,
        imagePath: ImagePath,
        image: Image,
        password: hash_password,
        role: "author",
        isAuthor: true,
    });

    const NewUser = await User.save();

    await User_Model.findByIdAndUpdate({ _id: data.user }, {
        $set: {
            isAuthor: true,
        }
    }, { new: true })

    if (!NewUser) {
        return res.status(500).send({ message: "can't register Author" });
    }
    else {

        if (req.file) {
            const dirPath = `./uploads/Author/${NewUser._id}`;
            fs.mkdir(dirPath, {}, (err) => {
                if (err) throw err;
            })

            const fileName = req.file.filename.split('.').slice(0, -1).join('.')
            const FileFormat = req.file.filename.split('.').pop();

            const userData = await User_Model.findByIdAndUpdate({ _id: NewUser._id }, {
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
            return res.status(200).send(userData);
        }
        return res.status(200).send(NewUser);
    }
})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Login Author 

router.post('/login', async function (req, res) {
    const data = req.body;
    if (!data) return res.status(404).send({ message: "Please fillup credentials" });
    if (data.username) {
        const UserData = await User_Model.findOne({ username: data.username }).populate('user');
        if (!UserData) return res.status(404).send({ message: "Author not found!" });

        const doMatch = await bcrypt.compare(data.password, UserData.password);
        if (!doMatch) return res.status(404).send({ message: "Username Or password incorrect!" });

        const tokenData = await getToken(UserData);
        return res.status(200).send({ UserData, token: tokenData.token, JWT: tokenData.JWT });
    }
    else {
        return res.status(400).send({ message: "Username Or password incorrect!" });
    }
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get all Authors --Admin

router.get('/allauthors', async (req, res) => {

    const pageSize = req.query.pageSize
    const pageNumber = req.query.pageNumber
    const TotalAuthors = await User_Model.countDocuments({ role: "author" });
    const Result = await User_Model.find({ role: "author" }).limit(pageSize).skip(pageSize * pageNumber).populate("user");

    if (!Result) {
        res.status(404).send({ Message: "Author not found" })
    }
    return res.status(200).send({ Result, TotalAuthors })

})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get Specific Author 

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const Result = await User_Model.findOne({ _id: id, role: "author" }).populate("user");
    if (!Result) return res.status(404).send({ Message: "Author not found" })

    return res.status(200).json(Result)

})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Update Author 

router.put('/edit/:id', upload.single('image'), async (req, res) => {
    const id = req.params.id;

    const data = req.body;
    console.log("id", data)
    const Result = await User_Model.findOne({ _id: id, role: "author" });
    if (!Result) return res.status(404).send({ message: "Author not found!" });

    if (req.file) {
        var ImagePath = req.file.path;
        var Image = req.file.filename;
    } else {
        var ImagePath = Result.imagePath;
        var Image = Result.image;
    }


    if (data.password) {
        const hash_password = await bcrypt.hash(data.password, 12);
        var UpdateUser = await User_Model.findByIdAndUpdate(
            { _id: id.toString() },
            {
                $set: {
                    ...data,
                    imagePath: ImagePath,
                    image: Image,
                    password: hash_password,
                },
            },
            { new: true }
        );
    } else {
        var UpdateUser = await User_Model.findByIdAndUpdate(
            { _id: id.toString() },
            {
                $set: {
                    ...data,
                    imagePath: ImagePath,
                    image: Image,
                },
            },
            { new: true }
        );
    }

    console.log("UpdateAuthor", UpdateUser)
    if (!UpdateUser)
        return res.status(500).send({
            message: "Author not updated right now! please try again later",
        });
    else {
        if (req.file) {

            const dirPath = `./uploads/Author/${id}`;

            if (!dirPath) {
                fs.mkdir(dirPath, {}, (err) => {
                    if (err) throw err;
                })
            }
            fsExtra.emptyDirSync(dirPath);
            const fileName = req.file.filename.split('.').slice(0, -1).join('.')
            const FileFormat = req.file.filename.split('.').pop();

            const userData = await User_Model.findByIdAndUpdate({ _id: id }, {
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
            return res.status(200).send(userData);
        }
    }
    return res.status(200).send(UpdateUser);

})



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Soft delete Author 

router.put('/remove/:id', async (req, res) => {

    const id = req.params.id;

    const user = await User_Model.findOne({ _id: id, isActive: true });

    if (!user) return res.status(404).send({ Message: "Author not found" });

    const result = await User_Model.findByIdAndUpdate({ _id: id }, {
        $set: {
            isActive: false
        }
    }, { new: true })

    if (!result) return res.status(500).send({ Message: "Can't remove Author right now!!" });
    return res.status(200).send({ Message: "Author successfully removed" });
})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Hard delete Author 

router.delete('/delete/:id', async (req, res) => {

    const id = req.params.id;

    const user = await User_Model.findOne({ _id: id });

    if (!user) return res.status(404).send({ Message: "Author not found" });

    const result = await User_Model.findByIdAndDelete({ _id: id })

    if (!result) return res.status(500).send({ Message: "Can't delete Author right now!!" });
    return res.status(200).send({ Message: "Author Permanently deleted Successfully" });
})

module.exports = router;