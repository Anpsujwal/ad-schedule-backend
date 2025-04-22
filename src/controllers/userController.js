const { User } = require("../models");
const bcrypt = require("bcrypt");

const saltRounds = 10;
module.exports.addUser = async (req, res) => {
  try {
    const { name, client_id, email, phone_number, role, password } = req.body;

    if (!name | !client_id | !email | !phone_number | !role | !password) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    const hash = bcrypt.hashSync(password, saltRounds);

    await User.create({
        name,
        client_id,
        email,
        phone_number,
        role, 
        password:hash,
      });

    res.json({ message: "User created successfully." });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getUserData = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['user_id', 'name', 'email', 'role', 'client_id'], 
    });

    res.json({ users }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports.getClients = async (req, res) => {
  try {
    const clients = await User.findAll({
      where: { role: 'client' },
      attributes: [['user_id', 'client_id'], 'name'] 
    });
    res.json({ clients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
