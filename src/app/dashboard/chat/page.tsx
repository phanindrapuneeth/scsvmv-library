"use client";

import { recommendBooks } from "@/ai/flows/recommend-books";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

export default function ChatPage() {
  const [prompt, setPrompt] = useState("");
  const [recommendations, setRecommendations] = useState<
    { title: string; author: string; difficulty: string }[]
  >([]);
  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    // Load interests from local storage on component mount
    const storedInterests = localStorage.getItem("selectedInterests");
    if (storedInterests) {
      setInterests(JSON.parse(storedInterests));
    }
  }, []);

  const handleRecommendation = async () => {
    const result = await recommendBooks({ prompt: prompt, interests: interests });
    setRecommendations(result.recommendations);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-semibold">Chat with AI</h1>
      <p className="text-muted-foreground">
        Get personalized book recommendations.
      </p>

      <Textarea
        placeholder="Enter your request (e.g., Recommend beginner-level books on AI)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="resize-none"
      />
      <Button onClick={handleRecommendation} disabled={interests.length === 0}>Get Recommendations</Button>

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
