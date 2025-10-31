import React, { useCallback } from "react"
import { useForm } from "react-hook-form"
import { Button, Input, RTE, Select } from ".."
import appwriteService from "../../appwrite/config"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

// PostForm component for creating and updating posts
export default function PostForm({ post }) {
  // Initialize form control and default values using react-hook-form
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  })

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  // Handles form submission for both create and update actions
  const submit = async (data) => {
    if (post) {
      // If editing an existing post, upload new image if provided
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

      // Delete the previous image if a new one was uploaded
      if (file) appwriteService.deleteFile(post.featuredImage)

      // Update existing post data
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      })

      // Redirect to updated post page after successful update
      if (dbPost) navigate(`/post/${dbPost.$id}`)
    } else {
      // Handle new post creation
      const file = await appwriteService.uploadFile(data.image[0])

      if (file) {
        data.featuredImage = file.$id
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        })

        // Redirect to created post page after successful submission
        if (dbPost) navigate(`/post/${dbPost.$id}`)
      }
    }
  }

  // Utility to auto-generate slug from title input
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")
    return ""
  }, [])

  // Watch title input and update slug in real time
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true })
      }
    })

    // Cleanup watcher to prevent unnecessary re-renders
    return () => subscription.unsubscribe()
  }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
          }
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}
