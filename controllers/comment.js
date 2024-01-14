import { StatusCodes } from "http-status-codes";
import { Comment, replyComment } from "../models/comment.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";

export const createComment = async (req, res) => {
  const { postId } = req.params;
  req.body.post = postId;
  req.body.user = req.user.userId;
  const comment = await Comment.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ comment });
};

export const createReplyComment = async (req, res) => {
  const { commentId } = req.params;
  req.body.comment = commentId;
  const comment = await replyComment.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ comment });
};

export const getPostAllComments = async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ post: postId });
  res.status(StatusCodes.OK).json({ comments });
};

export const getPostAllReplyComments = async (req, res) => {
  const { commentId } = req.params;
  const replycomments = await replyComment.find({ comment: commentId });
  res.status(StatusCodes.OK).json({ replycomments });
};

export const updateComment = async (req, res) => {
  const {
    params: { commentId },
    user: { userId },
  } = req;
  const comment = await Comment.findOneAndUpdate({ _id: commentId, user: userId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!comment) {
    throw new NotFoundError(`Comment with id ${commentId} does not exist`);
  }
  res.status(StatusCodes.OK).json({ comment });
};
