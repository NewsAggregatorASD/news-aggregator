"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BookmarkButton from "@/components/BookmarkButton";
import api from "@/services/api";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import { toast } from "react-hot-toast/headless";
import RelatedArticles from "@/components/RelatedArticles";
import ShareButtons from "@/components/ShareButtons";
const ArticlePage = () => {
    const params = useParams();
    const [article, setArticle] = useState<any>(null);
    const [relatedArticles, setRelatedArticles] = useState([]);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await api.get(`/articles/${params.id}`);
                setArticle(
                    response.data.article
                );

                setRelatedArticles(
                    response.data.relatedArticles
                );
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
            {/* HERO */}
            <section className="relative h-[55vh] sm:h-[65vh] md:h-[75vh] overflow-hidden">
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
                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-8 sm:pb-12 md:pb-16">
                        {/* CATEGORY */}
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/20 text-blue-300 text-xs sm:text-sm mb-4 md:mb-6 capitalize">
                            {article.category}
                        </span>

                        {/* TITLE */}
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white mb-5 md:mb-8 max-w-5xl">
                            {article.title}
                        </h1>

                        {/* META */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm text-zinc-400">
                            <span className="text-white font-medium">
                                {article.source}
                            </span>

                            <span className="hidden sm:inline">
                                •
                            </span>

                            <span>
                                {new Date(
                                    article.publishedAt
                                ).toLocaleDateString()}
                            </span>

                            {article.author && (
                                <>
                                    <span className="hidden sm:inline">
                                        •
                                    </span>

                                    <span className="truncate max-w-40 sm:max-w-none">
                                        {article.author}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ARTICLE BODY */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16">
                {/* ACTION BAR */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 md:mb-14 border-b border-zinc-800 pb-6 md:pb-8">
                    <div className="flex items-center gap-4 flex-wrap">
                         <BookmarkButton articleId={article._id} />
                         <ShareButtons
                             title={article.title}
                                url={typeof window !== "undefined" ? window.location.href : ""}
                    />
                    </div>

                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto text-center px-5 py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 transition-all text-zinc-300 hover:text-white"
                    >
                        Read Original
                    </a>
                </div>

                {/* CONTENT */}
                <article
                    className="
        prose
        prose-invert
        prose-sm
        sm:prose-base
        lg:prose-lg
        max-w-none

        prose-headings:text-white
        prose-p:text-zinc-300
        prose-p:leading-7
        sm:prose-p:leading-8

        prose-a:text-blue-400

        prose-img:rounded-2xl

        prose-blockquote:border-blue-500
      "
                    dangerouslySetInnerHTML={{
                        __html:
                            article.fullContent ||
                            article.content ||
                            "<p>No content available.</p>",
                    }}
                />

                {/* RELATED */}
                <RelatedArticles
                    articles={relatedArticles}
                />
            </main>
        </div>
    );
};
export default ArticlePage;