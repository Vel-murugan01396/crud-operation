

const PhdModel = require("../Modals/Phd");

const GetPhd = async (req, res) => {
    try {
        const phds = await PhdModel.find();
        res.status(200).json(phds);
    } catch (error) {
        console.error('Error in getPhd:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const PostPhd = async (req, res) => {
    try {
        const {  coursename, duration } = req.body;
        const newPhd = new PhdModel({coursename,  duration });
        const savedPhd = await newPhd.save();
        res.status(201).json(savedPhd);
    } catch (error) {
        console.error('Error in postPhd:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const PutPhd = async (req, res) => {
    try {
        const { id } = req.params;
        const {  coursename, duration } = req.body;
        const updatedPhd = await PhdModel.findByIdAndUpdate(id, {  coursename, duration }, { new: true });
        if (!updatedPhd) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(updatedPhd);
    } catch (error) {
        console.error('Error updating:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const DeletePhd = async (req, res) => {s
    try {
        const { id } = req.params;
        const deletedPhd = await PhdModel.findByIdAndDelete(id);
        if (!deletedPhd) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('Error deleting phd:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { PostPhd, GetPhd, PutPhd, DeletePhd };
