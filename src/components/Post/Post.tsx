import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { IPost } from "@/const/type/postType";
import { formatDate } from "@/utils/postUtils";
import { CalendarDays, User } from "lucide-react";

interface PostProps {
  post: IPost;
}
const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <>
      <Card className="shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
        <img
          src={post.thumbnailURL}
          alt=""
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        <CardHeader>
          <div className="flex justify-between items-center">
            <Badge variant="secondary">{post.categories.name}</Badge>
            <span className="text-xs text-muted-foreground">
              {post.lastReadAt}
            </span>
          </div>
          <CardTitle className="">
            <h3 className="font-semibold text-lg">
              <a href="#">{post.title}</a>
            </h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{post.content}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default Post;
