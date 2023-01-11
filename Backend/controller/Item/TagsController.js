const express = require('express');
const Tag_Model = require('../../model/Item/Tags');
const router = express.Router();


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Create Tag

router.post('/', async (req, res) => {
    const data = req.body;

    if (!data) return res.status(400).send({ Message: 'Please Fillup form' });

    const result = await Tag_Model.findOne({ name: data.name });
    if (result) return res.status(500).send({ Message: 'Tag already added' });

    let newTag = new Tag_Model({
        ...data
    })

    const NewTag = await newTag.save();

    if (!NewTag) return res.status(500).send({ Message: "Can't create new Tag right now" });

    return res.status(200).send(NewTag);


})



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get all Tag

router.get('/', async (req, res) => {

    const result = await Tag_Model.find();
    if (!result) return res.status(404).send({ Message: 'Tags not found' });

    return res.status(200).send(result);


})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get Specific Tag

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Tag_Model.find({ _id: id, isActive: true});
    if (!result) return res.status(404).send({ Message: 'Tags not found' });

    return res.status(200).send(result);


})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Update Tag

router.put('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const data = await req.body;

    const result = await Tag_Model.find({ _id: id });
    if (!result) return res.status(404).send({ Message: 'Tags not found' });

    let updatedResult = await Tag_Model.findByIdAndUpdate({ _id: id},{
        $set:{
            ...data,
        }
    },{ new: true})

    if(!updatedResult) return res.status(500).send({ Message: "Can't update Tag right now" });

    return res.status(200).send(updatedResult);

})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Soft delete Tag

router.put('/remove/:id', async (req, res) => {
    const id = req.params.id;

    const result = await Tag_Model.findOne({ _id: id, isActive: true});
    if (!result) return res.status(404).send({ Message: 'Tags not found' });

    let updatedResult = await Tag_Model.findByIdAndUpdate({ _id: id},{
        $set:{
            isActive: false,
        }
    },{ new: true})

    if(!updatedResult) return res.status(500).send({ Message: "Can't remove Tag right now" });

    return res.status(200).send({ Message: "Tag remove successfully" });

})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Hard delete Tag

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    const result = await Tag_Model.findOne({ _id: id });
    if (!result) return res.status(404).send({ Message: 'Tags not found' });

    let updatedResult = await Tag_Model.findByIdAndDelete({ _id: id})

    if(!updatedResult) return res.status(500).send({ Message: "Can't delete Tag right now" });

    return res.status(200).send({ Message: "Tag Permanently deleted Successfully" });

})

module.exports = router;