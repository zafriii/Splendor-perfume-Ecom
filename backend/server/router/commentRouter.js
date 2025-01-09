// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middlewares/auth-middleware');
// const {
//   editComment,
//   deleteComment,
// } = require('../controllers/commentController');


// router.put('/:commentId', authMiddleware, editComment);
// router.delete('/:commentId', authMiddleware, deleteComment);

// module.exports = router;




const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const {
  createComment,
  getAllComments,
  editComment,
  deleteComment,
} = require('../controllers/commentController');

// Route to create a comment for a review
router.post('/:reviewId', authMiddleware, createComment);

// Route to fetch all comments for a specific review
router.get('/:reviewId', getAllComments);

// Route to edit a comment (requires authentication)
router.put('/:commentId', authMiddleware, editComment);

// Route to delete a comment (requires authentication)
router.delete('/:commentId', authMiddleware, deleteComment);

module.exports = router;
