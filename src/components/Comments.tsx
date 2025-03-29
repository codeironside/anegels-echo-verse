import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ThumbsUp, Flag, Trash, Edit, Send } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: Date;
  likes: number;
  isLiked: boolean;
}

interface CommentsProps {
  contentId: string;
}

export const Comments: React.FC<CommentsProps> = ({ contentId }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      userId: 'user1',
      username: 'BookLover',
      content: 'This chapter was absolutely captivating! The character development is outstanding.',
      createdAt: new Date('2024-03-10T10:00:00'),
      likes: 15,
      isLiked: false
    },
    {
      id: '2',
      userId: 'user2',
      username: 'StorySeeker',
      content: 'The plot twist at the end left me speechless. Can't wait for the next chapter!',
      createdAt: new Date('2024-03-09T15:30:00'),
      likes: 8,
      isLiked: true
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      userId: user?.id || 'anonymous',
      username: user?.username || 'Anonymous',
      content: newComment,
      createdAt: new Date(),
      likes: 0,
      isLiked: false
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleLike = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      return comment;
    }));
  };

  const handleEdit = (commentId: string, newContent: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, content: newContent };
      }
      return comment;
    }));
    setEditingComment(null);
  };

  const handleDelete = (commentId: string) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif flex items-center gap-2">
        <MessageSquare size={24} />
        Comments ({comments.length})
      </h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full px-4 py-2 bg-[rgb(var(--color-background))] border border-[rgb(var(--color-border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-secondary))]"
          rows={3}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="px-6 py-2 bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] rounded-lg font-medium flex items-center gap-2"
        >
          <Send size={18} />
          Post Comment
        </motion.button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[rgb(var(--color-card))] p-6 rounded-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">{comment.username}</h3>
                <p className="text-sm text-[rgb(var(--color-text))]/70">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLike(comment.id)}
                  className={`p-2 rounded transition-colors ${
                    comment.isLiked ? 'text-[rgb(var(--color-secondary))]' : ''
                  }`}
                >
                  <ThumbsUp size={18} />
                </button>
                {user?.id === comment.userId && (
                  <>
                    <button
                      onClick={() => setEditingComment(comment.id)}
                      className="p-2 rounded hover:bg-[rgb(var(--color-background))]"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="p-2 rounded hover:bg-[rgb(var(--color-background))] text-red-500"
                    >
                      <Trash size={18} />
                    </button>
                  </>
                )}
                <button className="p-2 rounded hover:bg-[rgb(var(--color-background))]">
                  <Flag size={18} />
                </button>
              </div>
            </div>

            {editingComment === comment.id ? (
              <div className="space-y-2">
                <textarea
                  defaultValue={comment.content}
                  className="w-full px-4 py-2 bg-[rgb(var(--color-background))] border border-[rgb(var(--color-border))] rounded-lg"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(comment.id, comment.content)}
                    className="px-4 py-2 bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] rounded-lg"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingComment(null)}
                    className="px-4 py-2 bg-[rgb(var(--color-background))] rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p>{comment.content}</p>
            )}

            <div className="mt-2 text-sm text-[rgb(var(--color-text))]/70">
              {comment.likes} likes
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};