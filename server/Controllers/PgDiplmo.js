const PgDiplmo = require("../Modals/PgDiplmo");

const PostPgdiplmo = async (req, res) => {
  try {
    const { PgDipolmaCourseName, Duration } = req.body;

    const newPgDipolmaCourse = new PgDiplmo({
      PgDipolmaCourseName,
      Duration,
    });

    const savedPgDipolmaCourse = await newPgDipolmaCourse.save();
    res.status(200).json(savedPgDipolmaCourse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const GetPgdiplmo = async (req, res) => {
  try {
    const getPgdipolma = await PgDiplmo.find();
    res.status(200).json(getPgdipolma);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const PutPgdiplmo = async (req, res) => {
  try {
    const PgDipolmaId = req.params.id;
    const existingPgDipolmaCourse = await PgDiplmo.findById(PgDipolmaId);

    existingPgDipolmaCourse.PgDipolmaCourseName = req.body.PgDipolmaCourseName || existingPgDipolmaCourse.PgDipolmaCourseName;
    existingPgDipolmaCourse.Duration = req.body.Duration || existingPgDipolmaCourse.Duration;

    const updatedPgDipolmaCourse = await existingPgDipolmaCourse.save();
    res.status(200).json(updatedPgDipolmaCourse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const DeletePgdiplmo = async (req, res) => {
  const PgDipolmaId = req.params.id;

  try {
    const deletedPgDipolmaCourse = await PgDiplmo.findByIdAndDelete(PgDipolmaId);
    if (!deletedPgDipolmaCourse) {
      return res.status(404).json({ error: "PgDipolma course not found" });
    }
    res.status(200).json({ message: "PgDipolma course is deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = {
  PostPgdiplmo,GetPgdiplmo,PutPgdiplmo,DeletePgdiplmo
};
