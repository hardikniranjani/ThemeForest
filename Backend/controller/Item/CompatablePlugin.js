const express = require('express');
const Plugin_Version_Model = require('../../model/Item/CompatibleWith');
const router = express.Router();


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Create Plugin_Version

router.post('/', async (req, res) => {
    const data = req.body;

    if (!data) return res.status(400).send({ Message: 'Please Fillup form' });

    const result = await Plugin_Version_Model.findOne({ name: data.name });
    if (result) return res.status(500).send({ Message: 'Plugin Version already added' });

    let NewPlugin_Version = new Plugin_Version_Model({
        ...data
    })

    const NewPlugin_version = await NewPlugin_Version.save();

    if (!NewPlugin_version) return res.status(500).send({ Message: "Can't create new Plugin_Version right now" });

    return res.status(200).send(NewPlugin_version);


})



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get all Plugin Version

router.get('/', async (req, res) => {

    const result = await Plugin_Version_Model.find();
    if (!result) return res.status(404).send({ Message: 'Plugin Versions not found' });

    return res.status(200).send(result);


})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get Specific Plugin Version

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Plugin_Version_Model.find({ _id: id, isActive: true});
    if (!result) return res.status(404).send({ Message: 'Plugin Versions not found' });

    return res.status(200).send(result);


})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Update Plugin Version

router.put('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const data = await req.body;

    const result = await Plugin_Version_Model.find({ _id: id });
    if (!result) return res.status(404).send({ Message: 'Plugin Versions not found' });

    let updatedResult = await Plugin_Version_Model.findByIdAndUpdate({ _id: id},{
        $set:{
            ...data,
        }
    },{ new: true})

    if(!updatedResult) return res.status(500).send({ Message: "Can't update Plugin Version right now" });

    return res.status(200).send(updatedResult);

})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Soft delete Plugin_Version

router.put('/remove/:id', async (req, res) => {
    const id = req.params.id;

    const result = await Plugin_Version_Model.findOne({ _id: id, isActive: true});
    if (!result) return res.status(404).send({ Message: 'Plugin Versions not found' });

    let updatedResult = await Plugin_Version_Model.findByIdAndUpdate({ _id: id},{
        $set:{
            isActive: false,
        }
    },{ new: true})

    if(!updatedResult) return res.status(500).send({ Message: "Can't remove Plugin Version right now" });

    return res.status(200).send({ Message: "Plugin Version remove successfully" });

})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Hard delete Plugin_Version

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    const result = await Plugin_Version_Model.findOne({ _id: id });
    if (!result) return res.status(404).send({ Message: 'Plugin Versions not found' });

    let updatedResult = await Plugin_Version_Model.findByIdAndDelete({ _id: id})

    if(!updatedResult) return res.status(500).send({ Message: "Can't delete Plugin Version right now" });

    return res.status(200).send({ Message: "Plugin Version Permanently deleted Successfully" });

})

module.exports = router;