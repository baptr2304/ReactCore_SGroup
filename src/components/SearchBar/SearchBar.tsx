import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IAuthor, ICategories, IPost } from "@/const/type/postType";
import { filterPosts, sortPosts } from "@/utils/postUtils";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
interface ISearch {
  dataSearch: IPost[];
  setDataSearch: React.Dispatch<React.SetStateAction<IPost[]>>;
  author: IAuthor[];
  categories: ICategories[];
}
const SearchBar: React.FC<ISearch> = ({
  dataSearch,
  setDataSearch,
  author,
  categories,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedAuthor, setSelectedAuthor] = useState<IAuthor>();
  const [selectedCategory, setSelectedCategory] = useState<ICategories>();
  const [sortType, setSortTye] = useState<"newest" | "oldest" | "az">("az");
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

  return (
    <div className="">
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground text-sm">
            Discover insights, tutorials, and updates from our team
          </p>
        </div>
        <Button className="bg-black text-white">
          <Plus />
          Add New Post
        </Button>
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
              {author.map((item) => (
                <SelectItem key={item.id} value={item.value}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* title */}
          <Select
            onValueChange={(val) =>
              setSortTye(val as "newest" | "oldest" | "az")
            }
            defaultValue="az"
          >
            <SelectTrigger className="lg:w-[180px] w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="az">Title A-Z</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
