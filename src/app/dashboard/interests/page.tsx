"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    // Load interests from local storage on component mount
    const storedInterests = localStorage.getItem("selectedInterests");
    if (storedInterests) {
      setSelectedInterests(JSON.parse(storedInterests));
    }
  }, []);

  const handleInterestChange = (interest: string) => {
    setSelectedInterests((prev) => {
      const newInterests = prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest];
      return newInterests;
    });
  };

  const handleGetRecommendations = () => {
    // Save selected interests to local storage
    localStorage.setItem(
      "selectedInterests",
      JSON.stringify(selectedInterests)
    );
    router.push("/dashboard/chat"); // Navigate to the chat page
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

      <Button
        onClick={handleGetRecommendations}
        disabled={selectedInterests.length === 0}
      >
        Get Recommendations
      </Button>
    </div>
  );
}
