import React from 'react'

function Footer({ darkMode }) {
  return (
   <footer className={`border-t py-3 ${
     darkMode ? "border-slate-700 bg-slate-900" : "border-gray-200 bg-white"
   }`}>
    <div className='mx-auto max-w-7xl px-4 text-center'>
      <p className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
        © 2026 BlogForge. All Rights Reserved.
      </p>
    </div>
   </footer>
  )
}

export default Footer