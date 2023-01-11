const express = require('express');
const Item_Details_Model = require('../../model/Item/ItemDetails');
const router = express.Router();


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Create Item_Details

router.post('/', async (req, res) => {
    const data = req.body;

    if (!data) return res.status(400).send({ Message: 'Please Fillup form' });

    // const result = await Item_Details_Model.findOne({ name: data.name });
    // if (result) return res.status(500).send({ Message: 'Item_Details already added' });
    // const id=data.Software_Version[0]
    // if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    //     // Yes, it's a valid ObjectId, proceed with `findById` call.
    //     console.log('id',id)
    //     return res.status(500).send({ Message: 'Item_Details id not valid' });
    // }
    // return res.status(200).send({ Message: 'Item_Details id is valid' });

    try {
        let NewItem_details = new Item_Details_Model({
            ...data
        })

        const NewItem_Details = await NewItem_details.save();

        if (!NewItem_Details) return res.status(500).send({ Message: "Can't create new Item_Details right now" });

        return res.status(200).send(NewItem_Details);
    } catch (err) {
        res.status(403).send({
            success: false,
            message: err.name,
            err: err
        })
    }


})



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get all Item_Details

router.get('/', async (req, res) => {

    const result = await Item_Details_Model
        .find()
        .populate('Compatible_Browsers')
        .populate('Files_Included')
        .populate('Software_Version')
        .populate('CompatibleWith')
        .populate('Tags')

    if (!result) return res.status(404).send({ Message: 'Item_Detailss not found' });

    return res.status(200).send(result);


})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get Specific Item_Details

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Item_Details_Model.find({ _id: id, isActive: true }).populate('Compatible_Browsers')
        .populate('Files_Included')
        .populate('Software_Version')
        .populate('CompatibleWith')
        .populate('Tags');
    if (!result) return res.status(404).send({ Message: 'Item_Detailss not found' });

    return res.status(200).send(result);


})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Update Item_Details

router.put('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const data = await req.body;

    const result = await Item_Details_Model.find({ _id: id });
    if (!result) return res.status(404).send({ Message: 'Item_Detailss not found' });

    let updatedResult = await Item_Details_Model.findByIdAndUpdate({ _id: id }, {
        $set: {
            ...data,
        }
    }, { new: true }).populate('Compatible_Browsers')
        .populate('Files_Included')
        .populate('Software_Version')
        .populate('CompatibleWith')
        .populate('Tags')

    if (!updatedResult) return res.status(500).send({ Message: "Can't update Item_Details right now" });

    return res.status(200).send(updatedResult);

})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Soft delete Item_Details

router.put('/remove/:id', async (req, res) => {
    const id = req.params.id;

    const result = await Item_Details_Model.findOne({ _id: id, isActive: true });
    if (!result) return res.status(404).send({ Message: 'Item_Detailss not found' });

    let updatedResult = await Item_Details_Model.findByIdAndUpdate({ _id: id }, {
        $set: {
            isActive: false,
        }
    }, { new: true })

    if (!updatedResult) return res.status(500).send({ Message: "Can't remove Item_Details right now" });

    return res.status(200).send({ Message: "Item_Details remove successfully" });

})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Hard delete Item_Details

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    const result = await Item_Details_Model.findOne({ _id: id });
    if (!result) return res.status(404).send({ Message: 'Item_Detailss not found' });

    let updatedResult = await Item_Details_Model.findByIdAndDelete({ _id: id })

    if (!updatedResult) return res.status(500).send({ Message: "Can't delete Item_Details right now" });

    return res.status(200).send({ Message: "Item_Details Permanently deleted Successfully" });

})

module.exports = router;