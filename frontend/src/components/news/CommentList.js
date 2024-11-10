import React, { useState } from 'react';

const CommentList = ({ comments }) => {
  const [showAllComments, setShowAllComments] = useState(false);

  // Control which comments are displayed (limit to 1 by default)
  const visibleComments = showAllComments ? comments : comments.slice(-1);  // Show the latest comment by default

  const toggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    <div>
      {visibleComments.map((comment) => (
        <div className="comment-container" key={comment._id}>
        <div className="comment-user-avatar">
          {/* Placeholder pour l'avatar de l'utilisateur */}
          <img src={comment.user.avatarUrl} alt="" />
        </div>
        <div className="comment-content">
          <div className="comment-header">
            <span className="comment-author">{comment.user.firstName}</span>
            <span className="comment-date">{new Date(comment.createdAt).toLocaleString()}</span>
          </div>
          <p className="comment-text">{comment.text}</p>
        </div>
      </div>
      
      ))}
      {comments.length > 1 && (
        <button onClick={toggleComments} className="show-more-comments">
          {showAllComments ? 'Hide comments' : 'Show more comments'}
        </button>
      )}
    </div>
  );
};

export default CommentList;
