'use client'

import { useState } from 'react';

const Community = () => {
  // Initialize state for posts
  const [posts, setPosts] = useState([
    { id:   1, title: 'Question   1', content: 'Content for question   1' },
    { id:   2, title: 'Question   2', content: 'Content for question   2' },
    // ... more static posts
  ]);

  // Function to handle adding a new post
  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newPost = {
      id: Date.now(), // Use timestamp as a unique ID
      title: formData.get('title'),
      content: formData.get('content'),
    };
    addPost(newPost);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Map over the posts state to display each post */}
        {posts.map((post) => (
          <article key={post.id} className="mb-4 bg-white shadow-lg rounded-lg overflow-hidden">
            <header className="bg-green-500 text-white p-4">
              <h2 className="text-lg font-bold">{post.title}</h2>
            </header>
            <div className="p-4">
              <p className="text-gray-700">{post.content}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="w-full max-w-md mt-8">
        <h1 className="text-2xl font-bold mb-4">Add Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
            <input type="text" id="title" name="title" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
            <textarea id="content" name="content" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"></textarea>
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-green-500 hover:bg-blue-700 text-white font-bold rounded-md">Submit</button>
        </form>
      </div>
    </main>
  );
};

export default Community;
