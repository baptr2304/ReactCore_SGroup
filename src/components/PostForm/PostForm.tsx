"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  handlePostFormSubmit,
  postFormSchema,
} from "@/utils/validations/postSchema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { onlyAuthor, onlyCategories } from "@/const/mock/fakeData";
import type { PostFormValues } from "@/utils/validations/postSchema";
import { ImagePlus } from "lucide-react";
import { Textarea } from "../ui/textarea";

const PostForm = () => {
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
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => handlePostFormSubmit(data))}
        className="space-y-8"
      >
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description of the post..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0}/200 characters
                  </span>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select author" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {onlyAuthor.map((a) => (
                          <SelectItem key={a.id} value={a.value}>
                            {a.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {onlyCategories.map((c) => (
                          <SelectItem key={c.name} value={c.name}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-end gap-2">
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter post title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="bg-white text-black hover:bg-neutral-100 border">
                Add
              </Button>
            </div>
            <div className="flex items-end gap-2">
              <FormField
                control={form.control}
                name="thumbnailURL"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Featured Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="bg-white text-black hover:bg-neutral-100 border">
                <ImagePlus />
              </Button>
            </div>
            <FormField
              control={form.control}
              name="estimatedReadTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Read Time *</FormLabel>
                  <FormControl>
                    <Input placeholder="5 min read" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col flex-1">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="h-full flex flex-col">
                  <FormLabel>Content *</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-full"
                      placeholder="Write your blog post content here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} characters
                  </span>
                </FormItem>
              )}
            />
            {/* <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card> */}
          </div>
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
