import React from 'react'
import AppwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

// __define-ocg__
// Displays a clickable post card with image and title for each post item
function PostCard({ $id, title, featuredImage }) {
  return (
    // Entire card acts as a clickable link navigating to the post details page
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          {/* Fetch and render post image using Appwrite file view URL */}
          <img
            src={AppwriteService.getFileView(featuredImage)}
            alt={title}
            className='rounded-xl'
          />
        </div>
        {/* Display post title */}
        <h2 className='text-xl font-bold'>{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
