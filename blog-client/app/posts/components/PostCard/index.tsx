import Link from "next/link";
import { Post } from "@/app/lib/types";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`}>
      <article className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">
          {post.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
        <time className="text-sm text-gray-400">
          {new Date(post.created_at).toLocaleDateString("ja-JP")}
        </time>
      </article>
    </Link>
  );
}
