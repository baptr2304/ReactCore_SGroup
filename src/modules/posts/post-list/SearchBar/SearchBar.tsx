import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import type { Author, Categories, Post } from "@/modules/posts/shared/data/PostType.ts";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import PostForm from "@/modules/posts/post-list/PostForm.tsx";
import { filterPosts, sortPosts } from "./PostFilter.ts";
interface ISearch {
  dataSearch: Post[];
  setDataSearch: React.Dispatch<React.SetStateAction<Post[]>>;
  authors: Author[];
  categories: Categories[];
}

const SearchBar: React.FC<ISearch> = ({
  dataSearch,
  setDataSearch,
  authors,
  categories,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedAuthor, setSelectedAuthor] = useState<Author>();
  const [selectedCategory, setSelectedCategory] = useState<Categories>();
  const [sortType, setSortType] = useState<"newest" | "oldest" | "az">("az");
  const [debouncedText, setDebouncedText] = useState<string>("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(searchText);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchText]);

  useEffect(() => {
    const filtered = filterPosts(dataSearch, {
      author: selectedAuthor,
      category: selectedCategory,
    });
    const searchFiltered = debouncedText.trim()
      ? filtered.filter((post) =>
          post.title.toLowerCase().includes(debouncedText.toLowerCase())
        )
      : filtered;
    const sorted = sortPosts(searchFiltered, sortType);
    setDataSearch(sorted);
  }, [
    debouncedText,
    selectedAuthor,
    selectedCategory,
    sortType,
    dataSearch,
    setDataSearch,
  ]);
  const sortOptions: {
    label: string;
    value: "az" | "newest" | "oldest";
  }[] = [
    { value: "az", label: "Title A-Z" },
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground text-sm">
            Discover insights, tutorials, and updates from our team
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-black text-white">
              <Plus className="h-4 w-4" />
              Add New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto w-full max-w-5xl">
            <DialogHeader>
              <DialogTitle>
                <span className="text-2xl font-bold">Create New Blog Post</span>
              </DialogTitle>
            </DialogHeader>
            <PostForm authorList={authors} categoriesList={categories} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 mb-8 p-4 bg-muted/50 rounded-lg">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10"
            ></Input>
          </div>
        </div>
        <div className="flex gap-4 lg:flex-row flex-col">
          {/* categories */}
          <Select
            onValueChange={(val) =>
              setSelectedCategory({ ...selectedCategory, name: val })
            }
            defaultValue="all"
          >
            <SelectTrigger className="lg:w-[180px] w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((item, index) => (
                <SelectItem key={index} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* author */}
          <Select
            defaultValue="all"
            onValueChange={(val) =>
              setSelectedAuthor({
                ...selectedAuthor,
                name: val,
                id: val,
                value: val,
              })
            }
          >
            <SelectTrigger className="lg:w-[180px] w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Authors</SelectItem>
              {authors.map((item) => (
                <SelectItem key={item.id} value={item.value}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* title */}
          <Select
            defaultValue="az"
            onValueChange={(val) =>
              setSortType(val as "newest" | "oldest" | "az")
            }
          >
            <SelectTrigger className="lg:w-[180px] w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
