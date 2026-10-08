import { useEffect, useState } from "react";
import { useAuth } from "../context-api/AuthContext";
import apiUrl from "../config/api";

function Admin() {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const getPosts = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/fetch`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setPosts(data.todos || []);
    } catch {
      setError("Server error. Please try again.");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(`${apiUrl}/api/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setTitle("");
      setDescription("");
      getPosts();
    } catch {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4">
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="font-medium text-red-700">{error}</p>
          </div>
        )}

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Administration
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-slate-500">Manage your posts from one place.</p>
        </div>

        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Create New Post
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Add a new post to your collection.
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
              <span className="text-lg font-bold text-emerald-600">+</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter post title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>
                <textarea
                  placeholder="Enter post description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows="1"
                  className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-emerald-700"
            >
              Create Post
            </button>
          </form>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">All Posts</h2>
            <p className="mt-1 text-sm text-slate-500">
              View your existing posts.
            </p>
          </div>
          <div className="rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            {posts.length} Posts
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post._id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                  <span className="font-bold text-emerald-600">
                    {post.title?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-400">POST</span>
              </div>

              <h3 className="mb-2 text-xl font-semibold capitalize text-slate-900">
                {post.title}
              </h3>
              <p className="mb-5 text-sm leading-6 text-slate-600">
                {post.description}
              </p>

              {post.createdBy && (
                <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                    <span className="text-xs font-bold text-emerald-700">
                      {post.createdBy.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Created by</p>
                    <p className="text-sm font-medium text-slate-700">
                      {post.createdBy.username}
                    </p>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
