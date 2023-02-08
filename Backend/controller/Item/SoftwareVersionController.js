const express = require('express');
const Softwre_Version_Model = require('../../model/Item/SoftwareVearion');
const router = express.Router();


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Create Softwre Version

router.post('/', async (req, res) => {
    const data = req.body;

    if (!data) return res.status(400).send({ Message: 'Please Fillup form' });

    const result = await Softwre_Version_Model.findOne({ name: data.name });
    if (result) return res.status(500).send({ Message: 'Softwre Version already added' });

    let NewSoftwre_version = new Softwre_Version_Model({
        ...data
    })

    const NewSoftwre_Version = await NewSoftwre_version.save();

    if (!NewSoftwre_Version) return res.status(500).send({ Message: "Can't create new Softwre Version right now" });

    return res.status(200).send(NewSoftwre_Version);


})



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get all Softwre_Version

router.get('/', async (req, res) => {

    const result = await Softwre_Version_Model.find();
    if (!result) return res.status(404).send({ Message: 'Softwre Versions not found' });

    return res.status(200).send(result);


})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get Specific Softwre_Version

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Softwre_Version_Model.find({ _id: id });
    if (!result) return res.status(404).send({ Message: 'Softwre Versions not found' });

    return res.status(200).send(result);
 

})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Update Softwre_Version

router.put('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const data = await req.body;

    const result = await Softwre_Version_Model.find({ _id: id });
    if (!result) return res.status(404).send({ Message: 'Softwre Versions not found' });

    let updatedResult = await Softwre_Version_Model.findByIdAndUpdate({ _id: id }, {
        $set: {
            ...data,
        }
    }, { new: true })

    if (!updatedResult) return res.status(500).send({ Message: "Can't update Softwre Version right now" });

    return res.status(200).send(updatedResult);

})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Active Softwre_Version

router.put('/active/:id', async (req, res) => {
    const id = req.params.id;

    const result = await Softwre_Version_Model.findOne({ _id: id, isActive: false });
    if (!result) return res.status(404).send({ Message: 'Softwre Versions not found' });

    let updatedResult = await Softwre_Version_Model.findByIdAndUpdate({ _id: id }, {
        $set: {
            isActive: true,
        }
    }, { new: true })

    if (!updatedResult) return res.status(500).send({ Message: "Can't active Softwre Version right now" });

    return res.status(200).send({ Message: "Softwre Version active successfully" });

})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Soft delete Softwre_Version

router.put('/remove/:id', async (req, res) => {
    const id = req.params.id;

    const result = await Softwre_Version_Model.findOne({ _id: id, isActive: true });
    if (!result) return res.status(404).send({ Message: 'Softwre Versions not found' });

    let updatedResult = await Softwre_Version_Model.findByIdAndUpdate({ _id: id }, {
        $set: {
            isActive: false,
        }
    }, { new: true })

    if (!updatedResult) return res.status(500).send({ Message: "Can't remove Softwre Version right now" });

    return res.status(200).send({ Message: "Softwre Version remove successfully" });

})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Hard delete Softwre_Version

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    const result = await Softwre_Version_Model.findOne({ _id: id });
    if (!result) return res.status(404).send({ Message: 'Softwre Versions not found' });

    let updatedResult = await Softwre_Version_Model.findByIdAndDelete({ _id: id })

    if (!updatedResult) return res.status(500).send({ Message: "Can't delete Softwre Version right now" });

    return res.status(200).send({ Message: "Softwre Version Permanently deleted Successfully" });

})

module.exports = router;