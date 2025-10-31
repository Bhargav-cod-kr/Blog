import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
    // State to store posts and loading status
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch user data from Redux store
    const user = useSelector((state) => state.auth.userData);

    useEffect(() => {
        // Fetch posts only if the user is logged in
        if (user) {
            appwriteService.getPosts().then((posts) => {
                if (posts) setPosts(posts.documents);
                setLoading(false);
            });
        } else {
            // Stop loading when no user is logged in
            setLoading(false);
        }
    }, [user]);

    // Loading state UI
    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-semibold">Loading...</h1>
                </Container>
            </div>
        );
    }

    // Show message when user is not logged in
    if (!user) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // Main content: list of posts for logged-in users
    return (
        <div className="w-full py-8">
            <Container>
                <h2 className="text-2xl font-bold mb-4">
                    Welcome, {user.name} 👋
                </h2>

                {posts.length === 0 ? (
                    <p>No posts available yet.</p>
                ) : (
                    <div className="flex flex-wrap">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard {...post} currentUser={user} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Home;
