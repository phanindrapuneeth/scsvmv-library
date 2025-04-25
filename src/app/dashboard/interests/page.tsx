"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const INTEREST_OPTIONS = [
  "AI",
  "Databases",
  "Algorithms",
  "Web Development",
  "Mobile Development",
  "Cloud Computing",
  "Cybersecurity",
];

export default function InterestsPage() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleInterestChange = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = () => {
    // Implement logic to save selected interests
    alert(`Selected interests: ${selectedInterests.join(", ")}`);
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

      <Button onClick={handleSubmit} disabled={selectedInterests.length === 0}>
        Save Interests
      </Button>
    </div>
  );
}
