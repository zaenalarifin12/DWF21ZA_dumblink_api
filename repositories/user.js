const { User } = require("../models");
exports.userById = async (req, id) => {
  let user = null;

  let userFromDb = await User.findOne({
    where: {
      id: id,
    },
  }).then((u) => {
    user = {
      id: u.id,
      email: u.email,
      fullName: u.fullName,
    };
  });

  return user;
};
