const { History } = require("../config/db");

const handleHistory = async (req, res) => {
  try {
    const { query, result, userId } = req.body;
    await History.create({
      query,
      result,
      userId,
    });

    return res.status(201).json({ error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

const handleGetHistory = async (req, res) => {
  try {
    const { id } = req.query;
    const history = await History.findAll({
      where: {
        userId: id,
      },
    });
    res.status(200).json({ error: false, data: history });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = {
  handleHistory,
  handleGetHistory,
};
