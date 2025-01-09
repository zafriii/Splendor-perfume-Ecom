import React, { useState, useEffect } from 'react';
import './comments.css';
import axios from 'axios';
import { useAuth } from '../store/Auth';
import ConfirmModal from './ConfirmModal';

import { MdOutlineSend } from "react-icons/md";

//import Reply from './Reply';


function Comment({ reviewId, postAuthorId, onCommentCountUpdate }) {
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const { user, isLoggedin } = useAuth();
  const [commentCount, setCommentCount] = useState(0);

  // Fetching comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/comments/${reviewId}`);
        const formattedComments = response.data.comments.map(comment => ({
          ...comment,
          user: comment.user || { _id: 'anonymous', name: 'Anonymous user' }, // fallback for user data
        }));
        setComments(formattedComments);
        setCommentCount(response.data.commentCount);
        onCommentCountUpdate(response.data.commentCount);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [reviewId, onCommentCountUpdate]);

  // Create or edit a comment
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Please log in to comment.');

    try {
      if (editMode && editCommentId) {
        // Edit comment
        await axios.put(
          `http://localhost:5000/api/comments/${editCommentId}`,
          { content: commentContent, reviewId: reviewId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setComments(comments.map(comment =>
          comment._id === editCommentId ? { ...comment, content: commentContent } : comment
        ));
        setEditMode(false);
        setEditCommentId(null);
      } else {
        // Create comment
        const response = await axios.post(
          `http://localhost:5000/api/comments/${reviewId}`,
          { content: commentContent, reviewId: reviewId  },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setComments(prevComments => [...prevComments, response.data.comment]);
        setCommentCount(prevCount => prevCount + 1);
        onCommentCountUpdate(commentCount + 1); // Update parent with new count
      }
      setCommentContent('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  // Request to delete a comment
  const requestDeleteComment = (id) => {
    setDeleteCommentId(id);
    setShowConfirmModal(true);
  };

  // Confirm deletion of a comment
  const confirmDeleteComment = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please log in to delete.');

    if (deleteCommentId) {
      try {
        await axios.delete(
          `http://localhost:5000/api/comments/${deleteCommentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setComments(comments.filter(comment => comment._id !== deleteCommentId));
        setCommentCount(prevCount => prevCount - 1);
        onCommentCountUpdate(commentCount - 1); // Update parent with reduced count
        setShowConfirmModal(false);
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
  };

  // Enable edit mode
  const editComment = (id, content) => {
    setEditMode(true);
    setEditCommentId(id);
    setCommentContent(content);
  };

  // Calculate how much time ago a comment was created
  const timeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInMs = now - postDate;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="comments-section">
       <h4>{commentCount === 1 ? 'Comment' : 'Comments'} ({commentCount})</h4>

      {isLoggedin && (
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input
            type="text"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Add a comment..."
            required
          />
          {/* <button type="submit">{editMode ? 'Save' : 'submit'}</button> */}
          <button type="submit">{editMode ? 'Save' : <MdOutlineSend  size={20} color="#fff" />}</button>
        </form>
      )}

      <div className="comments-list">
        {/* <h4>{commentCount === 1 ? 'Comment' : 'Comments'} ({commentCount})</h4> */}
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment._id} className="comment">
              <p className="comment-author">
                {comment.user._id === postAuthorId ? `Author ~ ${comment.user.username}` : comment.user.username}  <span className="comment-date">{timeAgo(comment.createdAt)}</span>        
                {/* {comment.user.username} */}
              </p>
              <p className="comment-content">{comment.content}</p>
              {/* <p className="comment-date">{timeAgo(comment.createdAt)}</p> */}

              <div className="cmnt-options">
                {comment.user._id === user._id && (
                  <div className="comment-options">
                    <button className='cmnt-edit' onClick={() => editComment(comment._id, comment.content)}>Edit</button>
                    <button className='cmnt-dlt' onClick={() => requestDeleteComment(comment._id)}>Delete</button>
                  </div>
                )}
                
              </div>

              {/* <Reply
                commentId={comment._id}
                onReplyCountUpdate={newCount => onCommentCountUpdate(commentCount + newCount)}
                postAuthorId={postAuthorId}
              /> */}
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      <ConfirmModal
        show={showConfirmModal}
        message="Are you sure you want to delete this comment?"
        onConfirm={confirmDeleteComment}
        onCancel={() => setShowConfirmModal(false)}
      />
    </div>
  );
}

export default Comment;
