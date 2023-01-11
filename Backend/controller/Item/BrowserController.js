const express = require('express');
const Browser_Model = require('../../model/Item/CompatableBrowsers');
const router = express.Router();


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Create Browser

router.post('/', async (req, res) => {
    const data = req.body;

    if (!data) return res.status(400).send({ Message: 'Please Fillup form' });

    const result = await Browser_Model.findOne({ name: data.name });
    if (result) return res.status(500).send({ Message: 'Browser already added' });

    let Newbrowser = new Browser_Model({
        ...data
    })

    const NewBrowser = await Newbrowser.save();

    if (!NewBrowser) return res.status(500).send({ Message: "Can't create new browser right now" });

    return res.status(200).send(NewBrowser);


})



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get all Browser

router.get('/', async (req, res) => {

    const result = await Browser_Model.find();
    if (!result) return res.status(404).send({ Message: 'Browsers not found' });

    return res.status(200).send(result);


})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get Specific Browser

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Browser_Model.find({ _id: id, isActive: true});
    if (!result) return res.status(404).send({ Message: 'Browsers not found' });

    return res.status(200).send(result);


})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Update Browser

router.put('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const data = await req.body;

    const result = await Browser_Model.find({ _id: id });
    if (!result) return res.status(404).send({ Message: 'Browsers not found' });

    let updatedResult = await Browser_Model.findByIdAndUpdate({ _id: id},{
        $set:{
            ...data,
        }
    },{ new: true})

    if(!updatedResult) return res.status(500).send({ Message: "Can't update browser right now" });

    return res.status(200).send(updatedResult);

})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Soft delete Browser

router.put('/remove/:id', async (req, res) => {
    const id = req.params.id;

    const result = await Browser_Model.findOne({ _id: id, isActive: true});
    if (!result) return res.status(404).send({ Message: 'Browsers not found' });

    let updatedResult = await Browser_Model.findByIdAndUpdate({ _id: id},{
        $set:{
            isActive: false,
        }
    },{ new: true})

    if(!updatedResult) return res.status(500).send({ Message: "Can't remove browser right now" });

    return res.status(200).send({ Message: "Browser remove successfully" });

})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Hard delete Browser

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    const result = await Browser_Model.findOne({ _id: id });
    if (!result) return res.status(404).send({ Message: 'Browsers not found' });

    let updatedResult = await Browser_Model.findByIdAndDelete({ _id: id})

    if(!updatedResult) return res.status(500).send({ Message: "Can't delete browser right now" });

    return res.status(200).send({ Message: "Browser Permanently deleted Successfully" });

})

module.exports = router;