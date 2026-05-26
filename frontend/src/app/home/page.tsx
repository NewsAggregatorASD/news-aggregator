"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";
import FeedSection from "@/components/FeedSection";
import Navbar from "@/components/Navbar";
import FeedSkeleton from "@/components/FeedSkeleton";
import HeroSection from "@/components/HeroSection";
import FeaturedGrid from "@/components/FeaturedGrid";

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
            <div className="p-6">
                <FeedSkeleton />
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-black">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* HERO */}
                <HeroSection
                    article={data.hero}
                />

                {/* FEATURED GRID */}
                <FeaturedGrid
                    articles={data.latest}
                />

                {/* TRENDING */}
                <FeedSection
                    title="Trending Now"
                    articles={data.trending}
                />

                {/* RECOMMENDATIONS */}
                {data.recommendations
                    ?.length > 0 && (
                        <FeedSection
                            title="Recommended For You"
                            articles={
                                data.recommendations
                            }
                        />
                    )}


                
                {/* TECHNOLOGY */}
                <FeedSection
                    title="Technology"
                    articles={
                        data.categories
                            .technology
                    }
                />


                <FeedSection
                    title="Business"
                    articles={
                        data.categories.business
                    }
                />

    
                <FeedSection
                    title="Science"
                    articles={
                        data.categories.science
                    }
                />

                <FeedSection
                    title="Health"
                    articles={
                        data.categories.health
                    }
                />

                {/* SPORTS */}
                <FeedSection
                    title="Sports"
                    articles={
                        data.categories.sports
                    }
                />

                <FeedSection
                    title="Entertainment"
                    articles={
                        data.categories.entertainment
                    }
                />


               
            </div>
        </div>
    );
};
export default HomePage;