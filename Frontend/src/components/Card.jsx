function Card({ title, body, darkMode }) {
  return (
    <article className={`flex min-h-48 flex-col rounded-xl border p-5 shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
      darkMode
        ? "border-slate-700 bg-slate-800 shadow-slate-950/40 hover:border-emerald-500/60"
        : "border-gray-200 bg-white"
    }`}>

      <h2 className={`mb-3 text-base font-semibold ${
        darkMode ? "text-white" : "text-gray-900"
      }`}>
        {title}
      </h2>

      <p className={`mb-3 text-sm leading-5 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        {body}
      </p>

      <button className={`mt-auto self-start rounded-md px-4 py-2 text-sm font-medium text-white transition ${
        darkMode
          ? "bg-emerald-600 hover:bg-emerald-500"
          : "bg-blue-500 hover:bg-blue-600"
      }`}>
        Read More →
      </button>

    </article>
  )
}

export default Card