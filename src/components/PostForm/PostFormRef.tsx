"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { IAuthor, ICategories } from "@/const/type/postType";
import { Select } from "@radix-ui/react-select";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ErrorMessage from "./ErrorMessage";

interface IPostForm {
  authorList: IAuthor[];
  categoriesList: ICategories[];
}

const PostFormRef: React.FC<IPostForm> = ({ authorList, categoriesList }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [excerptLength, setExcerptLength] = useState<number>(0);
  const [contentLength, setContentLength] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setError = (id: string, message: string) => {
    setErrors((prev) => ({ ...prev, [id]: message }));
  };
  const clearError = (id: string) => {
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const postData = {
      title: formData.get("title") as string,
      excerpt: formData.get("excerpt") as string,
      author,
      category,
      thumbnailURL: formData.get("thumbnailURL") as string,
      estimatedReadTime: formData.get("estimatedReadTime") as string,
      content: formData.get("content") as string,
    };

    setErrors({});
    let hasError = false;
    //title
    if (!postData.title || postData.title.trim() === "") {
      setError("error-title", "Title is required.");
      hasError = true;
    } else if (postData.title.trim().length <= 5) {
      setError("error-title", "Title must be more than 5 characters.");
      hasError = true;
    }
    //excerpt
    if (!postData.excerpt || postData.excerpt.trim() === "") {
      setError("error-excerpt", "Excerpt is required.");
      hasError = true;
    } else if (postData.excerpt.trim().length <= 200) {
      setError("error-excerpt", "Excerpt must be more than 200 characters.");
      hasError = true;
    }
    //author
    if (!postData.author) {
      setError("error-author", "Author is required.");
      hasError = true;
    }
    //category
    if (!postData.category) {
      setError("error-category", "Category is required.");
      hasError = true;
    }
    //content
    if (!postData.content || postData.content.trim() === "") {
      setError("error-content", "Content is required.");
      hasError = true;
    } else if (postData.content.trim().length <= 200) {
      setError("error-content", "Content must be more than 200 characters.");
      hasError = true;
    }
    //estimatedReadTime
    if (!postData.estimatedReadTime) {
      setError("error-estimatedReadTime", "Estimated read time is required.");
      hasError = true;
    }

    if (hasError) return;
    console.log("Post submitted:", postData);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 p-4 ">
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <div className="grid w-full max-w-sm items-center gap-3 pb-3">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter post title..."
              onChange={() => clearError("error-title")}
            />
            <ErrorMessage id="error-title">
              {errors["error-title"]}
            </ErrorMessage>
          </div>
          <div className="grid w-full max-w-sm items-center gap-3 pb-3">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              placeholder="Short description..."
              onChange={(e) => {
                setExcerptLength(e.target.value.length);
                clearError("error-excerpt");
              }}
            />
            <ErrorMessage id="error-excerpt">
              {errors["error-excerpt"]}
            </ErrorMessage>
            <span className="text-xs text-muted-foreground">
              {excerptLength}/200 characters
            </span>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 items-start">
            <div className="grid w-full max-w-sm items-center gap-3 pb-3">
              <Label htmlFor="author">Author *</Label>
              <Select
                value={author}
                onValueChange={(value) => {
                  setAuthor(value);
                  clearError("error-author");
                }}
              >
                <SelectTrigger className="w-full border px-3 py-2 rounded-md">
                  <SelectValue placeholder="Select author" />
                </SelectTrigger>
                <SelectContent>
                  {authorList.map((author) => (
                    <SelectItem key={author.name} value={author.name}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorMessage id="error-author">
                {errors["error-author"]}
              </ErrorMessage>
            </div>
            <div className="grid w-full max-w-sm items-center gap-3 pb-3">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={category}
                onValueChange={(value) => {
                  setCategory(value);
                  clearError("error-category");
                }}
              >
                <SelectTrigger className="w-full border px-3 py-2 rounded-md">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoriesList.map((c) => (
                    <SelectItem key={c.name} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorMessage id="error-category">
                {errors["error-category"]}
              </ErrorMessage>
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-3 pb-3">
            <Label htmlFor="thumbnailURL">Thumbnail URL</Label>
            <Input
              id="thumbnailURL"
              name="thumbnailURL"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-3 pb-3">
            <Label htmlFor="estimatedReadTime">Estimated Read Time</Label>
            <Input
              id="estimatedReadTime"
              name="estimatedReadTime"
              placeholder="5 min read"
              onChange={() => clearError("error-estimatedReadTime")}
            />
            <ErrorMessage id="error-estimatedReadTime">
              {errors["error-estimatedReadTime"]}
            </ErrorMessage>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-3">
          <Label htmlFor="content">Content *</Label>
          <Textarea
            className="h-full w-full resize-y overflow-y-auto break-words"
            id="content"
            name="content"
            placeholder="Write your blog content..."
            rows={6}
            onChange={(e) => {
              setContentLength(e.target.value.length);
              clearError("error-content");
            }}
          />
          <ErrorMessage id="error-content">
            {errors["error-content"]}
          </ErrorMessage>
          <span className="text-xs text-muted-foreground">
            {contentLength} characters
          </span>
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-4 border-t cursor-pointer">
        <Button type="reset" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Publish Post</Button>
      </div>
    </form>
  );
};

export default PostFormRef;
