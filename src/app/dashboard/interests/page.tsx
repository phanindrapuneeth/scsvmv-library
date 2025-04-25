"use client";

import { getBookRecommendations } from "@/services/book-recommendation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";

const INTEREST_OPTIONS = [
  "AI",
  "Databases",
  "Algorithms",
  "Web Development",
  "Mobile Development",
  "Cloud Computing",
  "Cybersecurity",
  "Data Science",
  "Machine Learning",
  "Networking",
  "Operating Systems",
  "Computer Architecture",
  "Software Engineering",
  "Game Development",
  "UI/UX Design",
  "Quantum Computing",
  "Blockchain Technology",
  "Robotics",
  "Internet of Things (IoT)",
  "Virtual Reality (VR)",
  "Augmented Reality (AR)",
];

export default function InterestsPage() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<
    { title: string; author: string; difficulty: string }[]
  >([]);

  useEffect(() => {
    // Load interests from local storage on component mount
    const storedInterests = localStorage.getItem("selectedInterests");
    if (storedInterests) {
      setSelectedInterests(JSON.parse(storedInterests));
    }
  }, []);

  useEffect(() => {
    // Fetch recommendations whenever selectedInterests change
    const fetchRecommendations = async () => {
      if (selectedInterests.length > 0) {
        const recommendations = await getBookRecommendations(
          selectedInterests,
          "Beginner"
        );
        setRecommendations(recommendations);
      } else {
        setRecommendations([]); // Clear recommendations if no interests are selected
      }
    };

    fetchRecommendations();
  }, [selectedInterests]);

  const handleInterestChange = (interest: string) => {
    setSelectedInterests((prev) => {
      const newInterests = prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest];
      return newInterests;
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-semibold">Interest Selection</h1>
      <p className="text-muted-foreground">
        Choose your areas of interest to personalize your book recommendations.
      </p>

      <div className="flex flex-wrap gap-2">
        {INTEREST_OPTIONS.map((interest) => (
          <div key={interest} className="space-y-2">
            <Checkbox
              id={interest}
              checked={selectedInterests.includes(interest)}
              onCheckedChange={() => handleInterestChange(interest)}
            />
            <label
              htmlFor={interest}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {interest}
            </label>
          </div>
        ))}
      </div>

      {recommendations.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Recommendations:</h2>
          <ul>
            {recommendations.map((book, index) => (
              <li key={index} className="py-2">
                <span className="font-medium">{book.title}</span> by{" "}
                {book.author} ({book.difficulty})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

