const Comment = require('../models/commentModel');
const Review = require('../models/reviewModel');
const Notification = require('../models/notificationModel');

// Create a Comment on a Review
const createComment = async (req, res) => {
  try {
    const { content, reviewId } = req.body; // Extract content and reviewId from request body
    const userId = req.user._id;

    // Ensure the review exists
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Create and save the comment
    const comment = new Comment({
      content,
      user: userId,
      review: reviewId,
    });

    await comment.save();

    // Create a notification for the review owner if the commenter is not the review owner
    if (review.user.toString() !== userId.toString()) {
      const notification = new Notification({
        review: reviewId,
        user: userId, // ID of the commenter
        reviewOwner: review.user, // ID of the review owner
        message: 'Someone commented on your review',
      });
      await notification.save();
    }

    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    console.error('Error creating comment on review:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get All Comments for a Specific Review
const getAllComments = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const comments = await Comment.find({ review: reviewId })
      .populate('user', 'username') // Populate comment author's username
      .sort({ createdAt: -1 }); // Sort comments by creation date (newest first)

    const commentCount = comments.length;

    res.status(200).json({ comments, commentCount });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Edit Comment on a Review (only by the comment author)
const editComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { commentId } = req.params;

    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, user: req.user._id },
      { content },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found or unauthorized' });
    }

    res.status(200).json({ message: 'Comment updated successfully', comment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete Comment on a Review (by comment author or review author)
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Attempt to find and delete the comment
    const comment = await Comment.findOneAndDelete({
      _id: commentId,
      user: req.user._id,
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found or unauthorized' });
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createComment,
  getAllComments,
  editComment,
  deleteComment
};
