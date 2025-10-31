import React, { useState, useEffect } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
  // State to store the current post details
  const [post, setPost] = useState(null)

  // Extract slug (unique post identifier) from the URL
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch post details if slug exists, else redirect to home
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post)
      })
    } else {
      navigate('/')
    }
  }, [slug, navigate])

  // Render the PostForm only when post data is available
  return post ? (
    <div className='py-8'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPost
