"use client";

import { useEffect, useState }
    from "react";

import Navbar
    from "@/components/Navbar";

import { DashboardData } from "@/types/dashboard";
import api from "@/services/api";
import FeedSection from "@/components/FeedSection";
import InterestSelector from "@/components/InterestSelector";

export default function ProfilePage() {
    const [data, setData] =
        useState<DashboardData | null>(
            null
        );

    useEffect(() => {
        const fetchDashboard =
            async () => {
                try {
                    const response =
                        await api.get(
                            "/users/dashboard"
                        );

                    setData(
                        response.data
                    );
                } catch (error) {
                    console.error(error);
                }
            };

        fetchDashboard();
    }, []);

    if (!data)
        return (
            <div>
                Loading...
            </div>
        );

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-8">
                <h1 className="text-4xl font-bold text-white mb-8">
                    Profile Dashboard
                </h1>

                {/* USER CARD */}

                <div className="news-card p-8 mb-8">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center text-3xl font-bold text-blue-400">
                            {data.user.username[0].toUpperCase()}
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-white">
                                {data.user.username}
                            </h2>

                            <p className="text-zinc-400">
                                {data.user.email}
                            </p>

                            <p className="text-sm text-zinc-500 mt-2">
                                Member since{" "}
                                {new Date(
                                    data.user.createdAt
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                <InterestSelector
                    currentInterests={
                        data.user.interests
                    }
                />

                {/* STATS */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="news-card p-6">
                        <h3 className="text-zinc-400">
                            Articles Read
                        </h3>

                        <FeedSection
                            title="Continue Reading"
                            articles={data.readingHistory}
                        />
                    </div>

                    <div className="news-card p-6">
                        <h3 className="text-zinc-400">
                            Saved Articles
                        </h3>

                        <FeedSection
                            title="Saved Articles"
                            articles={data.bookmarks}
                        />
                    </div>

                    <div className="news-card p-6">
                        <h3 className="text-zinc-400">
                            Recommendations
                        </h3>

                        <FeedSection
                            title="Recommended For You"
                            articles={data.recommendations}
                        />
                    </div>
                </div>

                <div className="news-card p-6 mb-10">
                    <h3 className="text-zinc-400">
                        Favorite Category
                    </h3>

                    <p className="text-2xl text-white font-bold mt-2 capitalize">
                        {data.stats.favoriteCategory}
                    </p>
                </div>
                
                <div className="news-card p-6 mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">
                        Your Interests
                    </h3>

                    <div className="flex flex-wrap gap-3">
                        {data.user.interests.map(
                            (interest: string) => (
                                <span
                                    key={interest}
                                    className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300"
                                >
                                    {interest}
                                </span>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}