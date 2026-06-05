"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import api from "@/services/api";

const CATEGORIES = [
  "technology",
  "business",
  "science",
  "sports",
  "entertainment",
  "health",
  "politics",
];

interface Props {
  currentInterests: string[];
}

export default function InterestSelector({
  currentInterests,
}: Props) {
  const [
    interests,
    setInterests,
  ] = useState(
    currentInterests
  );

  const toggleInterest = (
    category: string
  ) => {
    setInterests((prev) =>
      prev.includes(category)
        ? prev.filter(
            (item) =>
              item !== category
          )
        : [
            ...prev,
            category,
          ]
    );
  };

  const saveInterests =
    async () => {
      try {
        await api.patch(
          "/users/interests",
          {
            interests,
          }
        );

        toast.success(
          "Preferences updated"
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to save preferences"
        );
      }
    };

  return (
    <div className="news-card p-6 mb-10">
      <h3 className="text-xl font-semibold text-white mb-4">
        News Interests
      </h3>

      <div className="flex flex-wrap gap-3">
        {CATEGORIES.map(
          (category) => (
            <button
              key={category}
              onClick={() =>
                toggleInterest(
                  category
                )
              }
              className={`px-4 py-2 rounded-full border transition-all ${
                interests.includes(
                  category
                )
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-zinc-900 text-zinc-400 border-zinc-700"
              }`}
            >
              {category}
            </button>
          )
        )}
      </div>

      <button
        onClick={
          saveInterests
        }
        className="mt-6 px-5 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-medium"
      >
        Save Preferences
      </button>
    </div>
  );
}