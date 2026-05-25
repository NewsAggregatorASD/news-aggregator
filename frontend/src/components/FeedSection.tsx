import ArticleCard from "./ArticleCard";
import { Article } from "@/types/article";
interface Props {
    title: string;
    articles: Article[];
}
const FeedSection = ({
    title,
    articles,
}: Props) => {
    return (
        <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">
                {title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {articles.map((article) => (
                    <ArticleCard
                        key={article._id}
                        article={article}
                    />
                ))}
            </div>
        </section>
    );
};
export default FeedSection;