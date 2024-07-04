const Films = require("../module/films");
const jwt = require("jsonwebtoken");
const User = require("../module/user");
exports.getMovies = (req, res, next) => {
  const header = req.get("Authorization").split(" ")[1];
  if (header !== "null") {
    const decode = jwt.verify(header, "secret");
    User.findById(decode.id).then((user) => {
      Films.find().then((moveis) => {
        for (let i = 0; i < user.bookmarked.length; i++) {
          const movie = moveis.find((m) => {
            return m._id.toString() === user.bookmarked[i].toString();
          });
          if (movie) {
            movie.isBookmarked = true;
          }
        }
        return res.status(200).json({ moveis });
      });
    });
  } else {
    Films.find().then((moveis) => {
      return res.status(200).json({ moveis });
    });
  }
};
exports.postBookMark = (req, res, next) => {
  const header = req.get("Authorization").split(" ")[1];
  const moveID = req.body.id;
  if (header !== "null") {
    const decode = jwt.verify(header, "secret");
    User.findById(decode.id)
      .then((user) => {
        if (user.bookmarked.includes(moveID)) {
          return res
            .status(409)
            .json({ message: "movie is araldy bookmarked" });
        }
        user.bookmarked.push(moveID);
        user.save().then(() => {
          return res.status(201).json({ message: "move has been bookmarked" });
        });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    return res.status(409).json({ message: "token does not exists" });
  }
};
exports.deleteBookMarked = (req, res, next) => {
  const id = req.params.id;
  const header = req.get("Authorization").split(" ")[1];
  if (header !== "null") {
    const decode = jwt.verify(header, "secret");
    User.findById(decode.id)
      .then((user) => {
        const newBookMarked = user.bookmarked.filter((b) => {
          return b.toString() !== id.toString();
        });
        user.bookmarked = newBookMarked;
        user
          .save()
          .then((updatedUser) => {
            return res
              .status(204)
              .json({ message: `move ${id} has been removed from bookmarks` });
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        console.log("error is coming from null check");
        throw err;
      });
  } else {
    return res.status(409).json({ message: "token does not exists" });
  }
};
