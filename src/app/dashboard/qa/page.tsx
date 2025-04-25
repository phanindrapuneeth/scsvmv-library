"use client";

import { summarizePdf } from "@/ai/flows/summarize-pdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function QAPage() {
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [twoMarkQuestions, setTwoMarkQuestions] = useState<string[]>([]);
  const [tenMarkQuestions, setTenMarkQuestions] = useState<string[]>([]);
  const [sixteenMarkQuestions, setSixteenMarkQuestions] = useState<string[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const pdfDataUri = event.target?.result as string;
      setPdfDataUri(pdfDataUri);
    };
    reader.readAsDataURL(file);
  };

  const handleSummarize = async () => {
    if (!pdfDataUri) {
      alert("Please upload a PDF file.");
      return;
    }

    try {
      const result = await summarizePdf({ pdfDataUri });
      setSummary(result.summary);
      setTwoMarkQuestions(result.twoMarkQuestions);
      setTenMarkQuestions(result.tenMarkQuestions);
      setSixteenMarkQuestions(result.sixteenMarkQuestions);
    } catch (error: any) {
      console.error("Error summarizing PDF:", error);
      alert(
        "Failed to summarize PDF. Please ensure the file is valid and try again."
      );
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-semibold">Q/A with PDF</h1>
      <p className="text-muted-foreground">
        Upload a PDF and get a summary and potential questions.
      </p>

      <Input type="file" accept="application/pdf" onChange={handleFileChange} />
      <Button onClick={handleSummarize} disabled={!pdfDataUri}>
        Summarize PDF
      </Button>

      {summary && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Summary:</h2>
          <p>{summary}</p>
        </div>
      )}

      {twoMarkQuestions.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Possible 2-Mark Questions:</h2>
          <ul>
            {twoMarkQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      )}

      {tenMarkQuestions.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Possible 10-Mark Questions:</h2>
          <ul>
            {tenMarkQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      )}

      {sixteenMarkQuestions.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Possible 16-Mark Questions:</h2>
          <ul>
            {sixteenMarkQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
