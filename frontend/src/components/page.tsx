"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";
import FeedSection from "@/components/FeedSection";
import Navbar from "@/components/Navbar";
const HomePage = () => {
    const [data, setData] = useState<any>(null);
    useEffect(() => {
        const fetchHome = async () => {
            try {
                const response = await api.get(
                    "/home"
                );
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchHome();
    }, []);
    if (!data) {
        return (
            <div className="p-10 text-center">
                Loading...
            </div>
        );
    }
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto p-6">
                <FeedSection
                    title="Trending"
                    articles={data.trending}
                />
                <FeedSection
                    title="Latest"
                    articles={data.latest}
                />
                {data.recommendations?.length > 0 && (
                    <FeedSection
                        title="Recommended For You"
                        articles={data.recommendations}
                    />
                )}
                <FeedSection
                    title="Technology"
                    articles={data.categories.technology}
                />
                <FeedSection
                    title="Sports"
                    articles={data.categories.sports}
                />
            </div>
        </div>
    );
};
export default HomePage;
