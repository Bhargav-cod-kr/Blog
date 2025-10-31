// __define-ocg__
import React, { useId } from 'react'

// Reusable dropdown component supporting dynamic options and forwarded ref
function Select({
  options,
  label,
  className = '',
  ...props
}, ref) {
  const id = useId()

  return (
    <div className='w-full'>
      {/* Renders label if provided */}
      {label && <label htmlFor={id} className=''>{label}</label>}

      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {/* Maps through provided options to generate dropdown items */}
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)
