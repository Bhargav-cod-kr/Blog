import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'

function AllPosts() {
  // Local state to hold all fetched posts
  const [posts, setPosts] = useState([])

  // Fetch posts once when the component mounts
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents) // Update state with fetched posts
      }
    })
  }, [])

  return (
    <div className='w-full py-8'>
      <Container>
        {/* Grid layout for displaying all post cards */}
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
              {/* Render each post using PostCard component */}
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
