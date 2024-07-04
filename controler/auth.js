const User = require("../module/user");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.registerUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.status(409).json({ messege: "email is aralady used" });
      } else {
        bycript
          .hash(password, 12)
          .then((hasPasword) => {
            const newUser = new User({
              email: email,
              password: hasPasword,
            });
            newUser.save().then((createdUser) => {
              const token = jwt.sign(
                {
                  email: email,
                  id: createdUser._id,
                },
                "secret"
              );
              return res.status(201).json({ token: token });
            });
          })
          .catch((err) => {
            throw err;
          });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.logIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      bycript.compare(password, user.password).then((isEqual) => {
        if (isEqual) {
          const token = jwt.sign(
            {
              email: email,
              id: user._id,
            },
            "secret"
          );
          return res.status(200).json({ token: token });
        } else {
          return res.status(409).json({ message: "password is wrong" });
        }
      });
    } else {
      return res.status(409).json({ message: "user does not exists" });
    }
  });
};
