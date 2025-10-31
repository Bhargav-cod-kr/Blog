import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    // Local state for current post data
    const [post, setPost] = useState(null);

    // Extract slug from URL and get navigation function
    const { slug } = useParams();
    const navigate = useNavigate();

    // Get logged-in user data from Redux store
    const userData = useSelector((state) => state.auth.userData);

    // Check if the logged-in user is the author of the post
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    // Fetch post details when component mounts or slug changes
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/"); // Redirect if post not found
            });
        } else navigate("/"); // Redirect if slug missing
    }, [slug, navigate]);

    // Delete post and its image, then redirect to home
    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    // Render post details
    return post ? (
        <div className="py-8">
            <Container>
                {/* Post image section */}
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFileView(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {/* Show Edit/Delete options only to author */}
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Post title */}
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>

                {/* Render post content (HTML parsed to React elements) */}
                <div className="browser-css">{parse(post.content)}</div>
            </Container>
        </div>
    ) : null;
}
