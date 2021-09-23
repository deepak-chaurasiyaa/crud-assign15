const express = require("express");
const mongoose = require("mongoose");
const app = new express();
app.use(express.json());

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/books");
};

const bookSchema = new mongoose.Schema({
  Author: { type: String, required: true },
  book_name: { type: String, required: true },
  pages: { type: Number, required: true },
  published_year: { type: Number, required: true },
});
const Book = mongoose.model("book", bookSchema);

// Get all books
app.get("/", async (req, res) => {
  const book = await Book.find().lean().exec();
  return res.send({ book });
});

// Post a Book

app.post("/books", async (req, res) => {
  const book = await Book.create(req.body);
  return res.send({ book });
});

// Get a specific book by id

app.get("/books/:id", async (req, res) => {
  const book = await Book.findById(req.params.id).lean().exec();
  return res.send({ book });
});

// Update book by Id

app.patch("/books/:id", async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.send({ book });
});

// Delete books by Id
app.delete("/books/:id", async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  return res.send({ book });
});

app.listen(3333, async (req, res) => {
  await connect();
  console.log("I am Listening");
});
