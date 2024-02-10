// pages/community/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch the post data based on the id from the URL
    // For example, you might fetch from an API or local state
    // For simplicity, we'll just use a mock post
    const mockPost = {
      id: Number(id),
      title: 'Mock Post Title',
      content: 'Mock Post Content',
    };
    setPost(mockPost);
  }, [id]);

  // Function to handle adding a new comment
  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  // Function to handle form submission for comments
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newComment = {
      id: Date.now(), // Use timestamp as a unique ID
      author: formData.get('author'),
      text: formData.get('text'),
    };
    addComment(newComment);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2 px-4 sm:px-6 lg:px-8">
      <article className="mb-4 bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-green-500 text-white p-4">
          <h2 className="text-lg font-bold">{post.title}</h2>
        </header>
        <div className="p-4">
          <p className="text-gray-700">{post.content}</p>
        </div>
        <div className="p-4">
          {comments.map((comment) => (
            <div key={comment.id} className="mb-2">
              <p className="font-semibold">{comment.author}:</p>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
        <div className="p-4">
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            {/* Your form fields for comments here... */}
            <button type="submit" className="w-full py-2 px-4 bg-green-500 hover:bg-blue-700 text-white font-bold rounded-md">Submit Comment</button>
          </form>
        </div>
      </article>
    </main>
  );
};

export default PostDetail;
