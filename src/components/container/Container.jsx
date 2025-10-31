import React from 'react'

// Reusable container component for consistent page layout and spacing
function Container({ children }) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>
      {children}
    </div>
  )
}

export default Container
