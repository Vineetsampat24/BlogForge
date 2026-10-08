import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context-api/AuthContext'
import Logout from './Logout'

function Navbar({ darkMode, onToggleTheme }) {
  const { token } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={`sticky top-0 z-50 border-t-4 border-green-950 shadow-md ${
      darkMode ? "bg-slate-900 text-gray-100" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-12 flex items-center justify-between">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className={`flex items-center gap-2 text-xl font-bold tracking-tight ${
              darkMode ? "text-emerald-400" : "text-emerald-700"
            }`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 32 32"
              className="h-7 w-7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 7.5C5 6.67 5.67 6 6.5 6H14c2.21 0 4 1.79 4 4v16c0-2.21-1.79-4-4-4H6.5C5.67 22 5 21.33 5 20.5v-13Z"
                fill="currentColor"
                opacity=".25"
              />
              <path
                d="M27 7.5C27 6.67 26.33 6 25.5 6H18c-2.21 0-4 1.79-4 4v16c0-2.21 1.79-4 4-4h7.5c.83 0 1.5-.67 1.5-1.5v-13Z"
                fill="currentColor"
                opacity=".55"
              />
              <path
                d="M16 10v16M8.5 10h4M19.5 10h4M8.5 14h4M19.5 14h4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="m22.5 3 .65 1.85L25 5.5l-1.85.65L22.5 8l-.65-1.85L20 5.5l1.85-.65L22.5 3Z"
                fill="currentColor"
              />
            </svg>
            BlogForge
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-5 lg:gap-8">
            <Link
              to="/"
              className={`font-medium transition hover:text-blue-500 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
            >
              Home
            </Link>

            <Link
              to="/admin"
              className={`font-semibold transition hover:text-blue-500 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
            >
              Admin
            </Link>

            {token ? (
              <>
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                    darkMode
                      ? "border-slate-600 text-yellow-300 hover:bg-slate-800"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                  aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
                >
                  {darkMode ? "☀ Light" : "☾ Dark"}
                </button>
                <Logout />
              </>
            ) : (
              <Link
                to="/"
                className="bg-blue-600 text-white rounded-md hover:bg-blue-800 px-3 py-2 font-medium transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`text-2xl focus:outline-none md:hidden ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className={`border-t py-4 md:hidden ${
            darkMode ? "border-slate-700" : "border-gray-200"
          }`}>
            <div className="flex flex-col gap-4">

              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className={`font-medium hover:text-blue-500 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
              >
                Home
              </Link>

              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className={`font-medium hover:text-blue-500 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
              >
                Admin
              </Link>

              {token ? (
                <>
                  <button
                    type="button"
                    onClick={onToggleTheme}
                    className={`rounded-md border px-3 py-2 text-left text-sm font-medium transition ${
                      darkMode
                        ? "border-slate-600 text-yellow-300 hover:bg-slate-800"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {darkMode ? "☀ Light mode" : "☾ Dark mode"}
                  </button>
                  <Logout />
                </>
              ) : (
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="bg-blue-600 text-white rounded-md hover:bg-blue-800 px-3 py-2 font-medium text-center"
                >
                  Login
                </Link>
              )}

            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar