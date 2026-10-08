import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Card from "./Card";
import Footer from "./Footer";
import apiUrl from "../config/api";

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/fetch`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Unable to load blogs.");
          return;
        }

        setPosts(data.todos || []);
      } catch {
        setError("Unable to load blogs. Please try again.");
      }
    };

    getPosts();
  }, []);

  return (
    <div className={`flex min-h-screen flex-col text-gray-900 transition-colors ${
      darkMode ? "bg-slate-950 text-gray-100" : "bg-gray-100"
    }`}>
      <Navbar darkMode={darkMode} onToggleTheme={() => setDarkMode((mode) => !mode)} />
      <main className="flex-1">
        <Hero darkMode={darkMode} />

        <section id="latest-blogs" className={`px-4 pb-14 pt-2 transition-colors sm:px-6 lg:px-8 ${
          darkMode ? "bg-slate-900" : "bg-gray-100"
        }`}>
          <h2 className={`mb-7 text-center text-2xl font-bold ${
            darkMode ? "text-emerald-300" : "text-gray-900"
          }`}>
            Latest Blogs
          </h2>

          {error ? (
            <p className={`mx-auto max-w-2xl rounded-md border px-4 py-3 text-center ${
              darkMode
                ? "border-red-900/70 bg-red-950/40 text-red-200"
                : "border-red-200 bg-red-50 text-red-700"
            }`}>
              {error}
            </p>
          ) : posts.length > 0 ? (
            <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Card
                  key={post._id}
                  title={post.title}
                  body={post.description}
                  darkMode={darkMode}
                />
              ))}
            </div>
          ) : (
            <p className={`text-center ${
              darkMode ? "text-slate-300" : "text-gray-600"
            }`}>
              No blogs available yet.
            </p>
          )}
        </section>
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default Home;