import { Button } from "@/components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  handlePostFormSubmit,
  postFormSchema,
} from "@/utils/validations/postSchema.ts";

import { Badge } from "@/components/ui/badge.tsx";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import type { Author, Categories } from "@/modules/posts/shared/data/PostType.ts";
import type { PostFormValues } from "@/utils/validations/postSchema.ts";
import { Select } from "@radix-ui/react-select";
import { X } from "lucide-react";
import { useState } from "react";
interface PostForm {
  authorList: Author[];
  categoriesList: Categories[];
}

const PostForm: React.FC<PostForm> = ({ authorList, categoriesList }) => {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      author: "",
      category: "",
      tag: "",
      thumbnailURL: "",
      estimatedReadTime: "",
      content: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const [inputTagValue, setInputTagValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const handleAddTag = () => {
    const newTag = inputTagValue.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setInputTagValue("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit((data) => handlePostFormSubmit(data))}
        className="space-y-8"
      >
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter post title..."
                  {...register("title")}
                />
              </FormControl>
              <FormMessage>{errors.title?.message}</FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>Excerpt *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description of the post..."
                  {...register("excerpt")}
                />
              </FormControl>
              <FormMessage>{errors.excerpt?.message}</FormMessage>
              <span className="text-xs text-muted-foreground">
                {/* {field.value?.length || 0}/200 characters */}
              </span>
            </FormItem>
            <div className="grid grid-cols-2 gap-4">
              <FormItem>
                <FormLabel>Author *</FormLabel>
                <Select
                  value={form.watch("author")}
                  onValueChange={(value) =>
                    form.setValue("author", value, { shouldValidate: true })
                  }
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an author" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {authorList.map((a) => (
                      <SelectItem key={a.id} value={a.value}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage>{errors.author?.message}</FormMessage>
              </FormItem>
              <FormItem>
                <FormLabel>Category *</FormLabel>
                <Select
                  value={form.watch("category")}
                  onValueChange={(value) =>
                    form.setValue("category", value, { shouldValidate: true })
                  }
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoriesList.map((c) => (
                      <SelectItem key={c.name} value={c.name}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage>{errors.category?.message}</FormMessage>
              </FormItem>
            </div>
            {/* tags */}
            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2">
                <FormItem className="flex-1">
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter post title..."
                      value={inputTagValue}
                      onChange={(e) => setInputTagValue(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <Button
                  type="button"
                  className="bg-white text-black hover:bg-neutral-100 border"
                  onClick={handleAddTag}
                >
                  Add
                </Button>
              </div>
              <div className="flex gap-0.5">
                {tags.map((tag, index) => (
                  <Badge key={index} className="leading-none py-1">
                    {tag}
                    <span
                      className="cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X width={16} height={16} />
                    </span>
                  </Badge>
                ))}
              </div>
            </div>
            {/* img */}
            <FormItem className="flex-1">
              <FormLabel>Featured Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/image.jpg"
                  {...register("thumbnailURL")}
                />
              </FormControl>
              <FormMessage>{errors.thumbnailURL?.message}</FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>Estimated Read Time *</FormLabel>
              <FormControl>
                <Input
                  placeholder="5 min read"
                  {...register("estimatedReadTime")}
                />
              </FormControl>
              <FormMessage>{errors.estimatedReadTime?.message}</FormMessage>
            </FormItem>
          </div>
          <FormItem className="h-full flex flex-col">
            <FormLabel>Content *</FormLabel>
            <FormControl>
              <Textarea
                className="h-full"
                placeholder="Write your blog post content here..."
                {...register("content")}
              />
            </FormControl>
            <FormMessage>{errors.content?.message}</FormMessage>
            <span className="text-xs text-muted-foreground">
              {/* {field.value?.length || 0} characters */}
            </span>
          </FormItem>
        </div>
        <div className="flex justify-end gap-4 pt-4 border-t ">
          <Button
            type="submit"
            className="bg-white text-black hover:bg-neutral-100"
          >
            Cancel
          </Button>
          <Button type="submit" className="">
            Publish Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
