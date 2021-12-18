const express = require("express");
const router = express.Router();
const Author = require("../models/authors");
// All authors route
router.get("/", async (req, res) => {
  try {
    const authors = await Author.find({});
    res.render("authors/index", { author: authors });
  } catch {
    res.redirect("/");
  }
});

//New authors
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// create Author route
router.post("/", async (req, res) => {
  const author = new Author({ name: req.body.name });
  try {
    const newAuthor = await author.save();
    res.redirect("authors");
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
  // author.save((err, newAuthor) => {
  //   if (err) {
  //     res.render("authors/new", {
  //       author: author,
  //       errorMessage: "Error creating Author",
  //     });
  //   } else {
  //     res.redirect("authors");
  //   }
  // });
});

module.exports = router;
