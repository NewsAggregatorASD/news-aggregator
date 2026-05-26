"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BookmarkButton from "@/components/BookmarkButton";
import api from "@/services/api";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import { toast } from "react-hot-toast/headless";
const ArticlePage = () => {
    const params = useParams();
    const [article, setArticle] = useState<any>(null);
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await api.get(`/articles/${params.id}`);
                setArticle(response.data);
            }
            catch (error) {
                toast.error("Failed to fetch article");
            }
        };
        fetchArticle();
    }, [params.id]);

    if (!article) {
        return (<ArticleSkeleton />);
    }
    return (
        <div className="min-h-screen bg-black">
            {/* HERO IMAGE */}
            <section className="relative h-[70vh] overflow-hidden">
                {article.imageUrl ? (
                    <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-blue-500/20 via-zinc-900 to-black" />
                )}

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/20" />

                {/* CONTENT */}
                <div className="absolute bottom-0 w-full">
                    <div className="max-w-5xl mx-auto px-6 pb-16">
                        {/* CATEGORY */}
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/20 text-blue-300 text-sm mb-6 capitalize">
                            {article.category}
                        </span>

                        {/* TITLE */}
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white mb-8 max-w-5xl">
                            {article.title}
                        </h1>

                        {/* META */}
                        <div className="flex flex-wrap items-center gap-6 text-zinc-400">
                            <div>
                                <p className="text-sm text-zinc-500">
                                    Source
                                </p>

                                <p className="text-white font-medium">
                                    {article.source}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-zinc-500">
                                    Published
                                </p>

                                <p className="text-white font-medium">
                                    {new Date(
                                        article.publishedAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            {article.author && (
                                <div>
                                    <p className="text-sm text-zinc-500">
                                        Author
                                    </p>

                                    <p className="text-white font-medium">
                                        {article.author}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ARTICLE BODY */}
            <main className="max-w-5xl mx-auto px-6 py-16">
                {/* ACTION BAR */}
                <div className="flex items-center justify-between mb-12 border-b border-zinc-800 pb-8">
                    <div className="flex items-center gap-4">
                        <BookmarkButton
                            articleId={article._id}
                        />
                    </div>

                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 transition-all text-zinc-300 hover:text-white"
                    >
                        Read Original
                    </a>
                </div>

                {/* ARTICLE CONTENT */}
                <article
                    className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-zinc-300 prose-a:text-blue-400"
                    dangerouslySetInnerHTML={{
                        __html:
                            article.fullContent ||
                            article.content,
                    }}
                />
            </main>
        </div>
    );
};
export default ArticlePage;