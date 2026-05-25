"use client";
import Link from "next/link";
import { Article } from "@/types/article";
interface Props {
article: Article;
}
const ArticleCard = ({ article }: Props) => {
return (
<Link href={`/article/${article._id}`}>
<div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-
[1.02] transition-all cursor-pointer">
{article.imageUrl && (
<img
src={article.imageUrl}
alt={article.title}
className="w-full h-52 object-cover"
/>
)}
<div className="p-4">
<p className="text-sm text-gray-500 mb-2">
{article.source}
</p>
<h2 className="font-bold text-lg mb-2 line-clamp-2">
{article.title}
</h2>
<p className="text-gray-700 line-clamp-3">
{article.description}
</p>
</div>
</div>
</Link>
);
};
export default ArticleCard;