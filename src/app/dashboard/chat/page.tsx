"use client";

import { recommendBooks } from "@/ai/flows/recommend-books";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Book } from "@/services/book-recommendation"; // Import Book interface


export default function ChatPage() {
  const [prompt, setPrompt] = useState("");
  const [recommendations, setRecommendations] = useState<Book[]>([]); // Use Book interface
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load interests from local storage on component mount
    const storedInterests = localStorage.getItem("selectedInterests");
    if (storedInterests) {
      setInterests(JSON.parse(storedInterests));
    }
  }, []);

  const handleRecommendation = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const result = await recommendBooks({ prompt: prompt, interests: interests });
      setRecommendations(result.recommendations);
      if (!result.recommendations || result.recommendations.length === 0) {
        setError("No recommendations found for the given prompt and interests.");
      }
    } catch (e: any) {
      console.error("Error fetching recommendations:", e);
      setError("Failed to fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-semibold">Chat with AI</h1>
      <p className="text-muted-foreground">
        Get personalized book recommendations.
      </p>

      <Textarea
        placeholder="Enter your request (e.g., Recommend books on AI)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="resize-none"
      />
      <Button onClick={handleRecommendation} disabled={interests.length === 0 || loading}>
        {loading ? "Loading..." : "Get Recommendations"}
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendations && recommendations.length > 0 && (
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
