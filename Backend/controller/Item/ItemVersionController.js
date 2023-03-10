const express = require('express');
const Item_Version_Model = require('../../model/Item/SoftwareVearion');
const router = express.Router();


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Create Item Version

router.post('/', async (req, res) => {
    const data = req.body;

    if (!data) return res.status(400).send({ Message: 'Please Fillup form' });

    const result = await Item_Version_Model.findOne({ name: data.name });
    if (result) return res.status(500).send({ Message: 'Item Version already added' });

    let NewItem_version = new Item_Version_Model({
        ...data
    })

    const NewItem_Version = await NewItem_version.save();

    if (!NewItem_Version) return res.status(500).send({ Message: "Can't create new Item Version right now" });

    return res.status(200).send(NewItem_Version);


})



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get all Item_Version

router.get('/', async (req, res) => {

    const result = await Item_Version_Model.find();
    if (!result) return res.status(404).send({ Message: 'Item Versions not found' });

    return res.status(200).send(result);


})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get Specific Item_Version

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Item_Version_Model.find({ _id: id, isActive: true});
    if (!result) return res.status(404).send({ Message: 'Item Versions not found' });

    return res.status(200).send(result);


})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Update Item_Version

router.put('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const data = await req.body;

    const result = await Item_Version_Model.find({ _id: id });
    if (!result) return res.status(404).send({ Message: 'Item Versions not found' });

    let updatedResult = await Item_Version_Model.findByIdAndUpdate({ _id: id},{
        $set:{
            ...data,
        }
    },{ new: true})

    if(!updatedResult) return res.status(500).send({ Message: "Can't update Item Version right now" });

    return res.status(200).send(updatedResult);

})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Soft delete Item_Version

router.put('/remove/:id', async (req, res) => {
    const id = req.params.id;

    const result = await Item_Version_Model.findOne({ _id: id, isActive: true});
    if (!result) return res.status(404).send({ Message: 'Item Versions not found' });

    let updatedResult = await Item_Version_Model.findByIdAndUpdate({ _id: id},{
        $set:{
            isActive: false,
        }
    },{ new: true})

    if(!updatedResult) return res.status(500).send({ Message: "Can't remove Item Version right now" });

    return res.status(200).send({ Message: "Item Version remove successfully" });

})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Hard delete Item_Version

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    const result = await Item_Version_Model.findOne({ _id: id });
    if (!result) return res.status(404).send({ Message: 'Item Versions not found' });

    let updatedResult = await Item_Version_Model.findByIdAndDelete({ _id: id})

    if(!updatedResult) return res.status(500).send({ Message: "Can't delete Item Version right now" });

    return res.status(200).send({ Message: "Item Version Permanently deleted Successfully" });

})

module.exports = router;