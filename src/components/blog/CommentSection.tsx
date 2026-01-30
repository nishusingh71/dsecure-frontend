import React, { useState, useEffect } from "react";
import "./BlogComponents.css";

interface Comment {
  id: string;
  author: string;
  email?: string; // OPTIONAL
  date: string;
  content: string;
  likes: number;
  replies: Comment[];
}

interface CommentSectionProps {
  blogId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ blogId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [replyAuthorName, setReplyAuthorName] = useState("");
  const [replyAuthorEmail, setReplyAuthorEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem(`comments_${blogId}`) || "[]"
    );
    setComments(saved);
  }, [blogId]);

  const saveComments = (data: Comment[]) => {
    setComments(data);
    localStorage.setItem(`comments_${blogId}`, JSON.stringify(data));
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const comment: Comment = {
        id: Date.now().toString(),
        author: authorName,
        email: authorEmail || undefined,
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        content: newComment,
        likes: 0,
        replies: [],
      };

      saveComments([comment, ...comments]);
      setNewComment("");
      setAuthorName("");
      setAuthorEmail("");
      setIsSubmitting(false);
    }, 500);
  };

  const handleLike = (id: string) => {
    const updateLikes = (list: Comment[]): Comment[] =>
      list.map((c) =>
        c.id === id
          ? { ...c, likes: c.likes + 1 }
          : { ...c, replies: updateLikes(c.replies || []) }
      );

    saveComments(updateLikes(comments));
  };

  const CommentItem = ({
    comment,
    depth = 0,
  }: {
    comment: Comment;
    depth?: number;
  }) => (
    <div className={`comment-card ${depth > 0 ? "reply" : ""}`}>
      <div className="comment-head">
        <div className="avatar">
          {comment.author.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="author">{comment.author}</div>
          <div className="date">{comment.date}</div>
        </div>
      </div>

      <p className="comment-text">{comment.content}</p>

      <div className="comment-actions">
        <button onClick={() => handleLike(comment.id)}>
          ❤️ {comment.likes}
        </button>
        <button onClick={() => setActiveReplyId(comment.id)}>Reply</button>
      </div>

      {activeReplyId === comment.id && (
        <form
          className="reply-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!replyContent.trim() || !replyAuthorName.trim()) return;

            const reply: Comment = {
              id: Date.now().toString(),
              author: replyAuthorName,
              email: replyAuthorEmail || undefined,
              date: new Date().toLocaleDateString("en-US"),
              content: replyContent,
              likes: 0,
              replies: [],
            };

            const addReply = (list: Comment[]): Comment[] =>
              list.map((c) =>
                c.id === comment.id
                  ? { ...c, replies: [...c.replies, reply] }
                  : { ...c, replies: addReply(c.replies || []) }
              );

            saveComments(addReply(comments));
            setReplyContent("");
            setReplyAuthorName("");
            setReplyAuthorEmail("");
            setActiveReplyId(null);
          }}
        >
          <textarea
            placeholder="Write your reply…"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />

          <div className="form-row">
            <input
              placeholder="Name *"
              value={replyAuthorName}
              onChange={(e) => setReplyAuthorName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email (optional)"
              value={replyAuthorEmail}
              onChange={(e) => setReplyAuthorEmail(e.target.value)}
            />
          </div>

          <button className="primary">Post Reply</button>
        </form>
      )}

      {comment.replies.map((r) => (
        <CommentItem key={r.id} comment={r} depth={depth + 1} />
      ))}
    </div>
  );

  return (
    <section className="comment-section">
      <h3>
        Comments <span>({comments.length})</span>
      </h3>

      <p className="comment-note">
        Your email address will not be published. Providing an email is optional.
      </p>

      <form className="comment-form" onSubmit={handlePostComment}>
        <textarea
          placeholder="Write your comment…"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />

        <div className="form-row">
          <input
            placeholder="Name *"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
          />
        </div>

        <button className="primary" disabled={isSubmitting}>
          {isSubmitting ? "Posting…" : "Post Comment"}
        </button>
      </form>

      <div className="comment-list">
        {comments.length === 0 ? (
          <p className="empty">No comments yet. Be the first to comment.</p>
        ) : (
          comments.map((c) => <CommentItem key={c.id} comment={c} />)
        )}
      </div>
    </section>
  );
};

export default CommentSection;
