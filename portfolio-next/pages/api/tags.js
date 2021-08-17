import mongoose from '../../middleware/mongoose.js';
import prepareQuery from '../../middleware/prepareQuery.js';
import Tag from '../../models/tagModel.js'
import nextConnect from "next-connect";

const handler = nextConnect();

handler.use(mongoose())
handler.use(prepareQuery())

handler.get(async (req, res) => {
    const { perPage, sortObj, filterObj, skip } = req.mongoParams

    const total = await Tag.countDocuments(filterObj)
    const data = await Tag.find(filterObj).limit(perPage).skip(skip).sort(sortObj)

    res.json({
        total,
        data,
    })
})

export default handler;
