const { User } = require("../models/User");

const userController = {
    getAllUser: async (req, res) => {
        try {
            const listUser = await User.find({});
            if (!listUser) {
                res.status(200).json("List is empty");
            }
            return res.status(200).json(listUser);
        } catch (error) {
            return res.status(404).json(error);
        }
    },
    deleteUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json('User not found with ID');
            }
            const result = await User.deleteById(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(404).json(error);
        }
    }
};

module.exports = userController;