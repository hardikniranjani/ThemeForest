const express = require('express');
const Includes_Files_Model = require('../../model/Item/IncludedFiles');
const router = express.Router();


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Create Includes Files

router.post('/', async (req, res) => {
    const data = req.body;

    if (!data) return res.status(400).send({ Message: 'Please Fillup form' });

    const result = await Includes_Files_Model.findOne({ name: data.name });
    if (result) return res.status(400).send({ Message: 'Includes Files already added' });

    let NewIncludes_files = new Includes_Files_Model({
        ...data
    })

    const NewIncludes_Files = await NewIncludes_files.save();

    if (!NewIncludes_Files) return res.status(500).send({ Message: "Can't create new Includes Files right now" });

    return res.status(200).send(NewIncludes_Files);


})



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get all Includes_Files

router.get('/', async (req, res) => {

    const result = await Includes_Files_Model.find();
    if (!result) return res.status(404).send({ Message: 'Includes Filess not found' });

    return res.status(200).send(result);


})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get Specific Includes_Files

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Includes_Files_Model.find({ _id: id});
    if (!result) return res.status(404).send({ Message: 'Includes Filess not found' });

    return res.status(200).send(result);


})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Update Includes_Files

router.put('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const result = await Includes_Files_Model.find({ _id: id });
    if (!result) return res.status(404).send({ Message: 'Includes Filess not found' });

    let updatedResult = await Includes_Files_Model.findByIdAndUpdate({ _id: id},{
        $set:{
            ...data,
        }
    },{ new: true})

    if(!updatedResult) return res.status(500).send({ Message: "Can't update Includes Files right now" });

    return res.status(200).send(updatedResult);

})
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Active Includes_Files

router.put('/active/:id', async (req, res) => {
    const id = req.params.id;

    const result = await Includes_Files_Model.findOne({ _id: id, isActive: false});
    if (!result) return res.status(404).send({ Message: 'Includes Filess not found' });

    let updatedResult = await Includes_Files_Model.findByIdAndUpdate({ _id: id},{
        $set:{
            isActive: true,
        }
    },{ new: true})

    if(!updatedResult) return res.status(500).send({ Message: "Can't active Includes Files right now" });

    return res.status(200).send({ Message: "Includes Files active successfully" });

})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Soft delete Includes_Files

router.put('/remove/:id', async (req, res) => {
    const id = req.params.id;

    const result = await Includes_Files_Model.findOne({ _id: id, isActive: true});
    if (!result) return res.status(404).send({ Message: 'Includes Filess not found' });

    let updatedResult = await Includes_Files_Model.findByIdAndUpdate({ _id: id},{
        $set:{
            isActive: false,
        }
    },{ new: true})

    if(!updatedResult) return res.status(500).send({ Message: "Can't remove Includes Files right now" });

    return res.status(200).send({ Message: "Includes Files remove successfully" });

})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Hard delete Includes_Files

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    const result = await Includes_Files_Model.findOne({ _id: id });
    if (!result) return res.status(404).send({ Message: 'Includes Filess not found' });

    let updatedResult = await Includes_Files_Model.findByIdAndDelete({ _id: id})

    if(!updatedResult) return res.status(500).send({ Message: "Can't delete Includes Files right now" });

    return res.status(200).send({ Message: "Includes Files Permanently deleted Successfully" });

})

module.exports = router;