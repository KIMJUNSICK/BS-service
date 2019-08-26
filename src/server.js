import express from "express";
import bodyParser from "body-parser";
import { prisma } from "../generated/prisma-client";

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

const homeController = async (req, res) => {
  const posts = await prisma.posts();
  res.json(posts);
};

const postController = async (req, res) => {
  const {
    params: { id }
  } = req;
  const post = await prisma.post({ id });
  res.json(post);
};

const commentsController = async (req, res) => {
  const comments = await prisma.comments();
  res.json(comments);
};

const commentController = async (req, res) => {
  const {
    params: { id }
  } = req;
  const comment = await prisma.comment({ id });
  res.json(comment);
};

const addCommentController = async (req, res) => {
  const {
    body: { text }
  } = req;
  await prisma.createComment({
    text
  });
  res.redirect("/comments");
};

app.get("/", homeController);
app.get("/post/:id", postController);
app.get("/comments", commentsController);
app.get("/comment/:id", commentController);
app.post("/add-comment", addCommentController);

const handleListing = () =>
  console.log(`Listening on:✅  http://localhost:${PORT}`);

app.listen(PORT, handleListing);
