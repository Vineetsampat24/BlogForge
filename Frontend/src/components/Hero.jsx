function Hero({ darkMode }) {
  return (
    <section className={`${darkMode ? "bg-slate-900 text-gray-100" : "bg-gray-100"} px-4 pb-16 pt-12 transition-colors sm:pt-14`}>
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          From Browser to Backend -{" "}
          <span className={darkMode ? "text-emerald-400" : "text-green-700"}>
            JavaScript Everywhere
          </span>
        </h1>
        <p className={`mx-auto mt-5 max-w-3xl text-sm leading-5 sm:text-base ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}>
          Node.js® is a free, open-source, cross-platform JavaScript runtime
          environment that lets developers create servers, web apps, command
          line tools and scripts.
        </p>
        <a
          href="#latest-blogs"
          className={`mt-5 inline-block rounded-md px-4 py-2 text-sm text-white transition ${
            darkMode
              ? "bg-emerald-600 hover:bg-emerald-500"
              : "bg-green-800 hover:bg-green-900"
          }`}
        >
          Explore
        </a>
      </div>
    </section>
  );
}

export default Hero