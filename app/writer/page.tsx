"use client";

import { useEffect, useState } from "react";
import {
  createStory,
  getStoriesByAuthor,
  addChapter,
  Story,
} from "../../engine/storyEngine";

export default function WriterDashboard() {
  const [stories, setStories] = useState<Story[]>([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [tone, setTone] = useState("");

  const authorId = "demo-user"; // replace later with auth user

  // load stories
  useEffect(() => {
    const data = getStoriesByAuthor(authorId);
    setStories(data);
  }, []);

  const handleCreateStory = () => {
    if (!title || !genre) return;

    const newStory = createStory({
      title,
      genre,
      authorId,
      tone,
      tags: [],
      pacing: "medium",
      perspective: "third",
    });

    setStories((prev) => [...prev, newStory]);

    setTitle("");
    setGenre("");
    setTone("");
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF6EE] p-10 font-[Times_New_Roman]">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <h1 className="text-3xl tracking-widest text-[#7A5F43] uppercase mb-2">
          THE WRITER'S WORKBENCH
        </h1>
        <p className="text-[#8B7E74] mb-8">
          Create, shape, and structure your narrative worlds.
        </p>

        {/* CREATE STORY FORM */}
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-[#7A5F43]/10 mb-10">
          <input
            className="w-full p-3 mb-3 bg-[#FDFBF7] border border-[#7A5F43]/15 text-sm placeholder:text-gray-500"
            placeholder="Story Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="w-full p-3 mb-3 bg-[#FDFBF7] border border-[#7A5F43]/15 text-sm placeholder:text-gray-500"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />

          <input
            className="w-full p-3 mb-4 bg-[#FDFBF7] border border-[#7A5F43]/15 text-sm placeholder:text-gray-500"
            placeholder="Tone (optional)"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          />

          <button
            onClick={handleCreateStory}
            className="px-6 py-3 bg-[#8E5A36] text-white rounded-full shadow-md hover:shadow-lg transition"
          >
            CREATE STORY
          </button>
        </div>

        {/* STORY LIST */}
        <div className="space-y-4">
          {stories.map((story) => (
            <div
              key={story.id}
              className="p-4 bg-white/60 border border-[#7A5F43]/10 rounded-xl"
            >
              <h2 className="text-lg text-[#7A5F43]">
                {story.metadata.title}
              </h2>
              <p className="text-sm text-gray-600">
                {story.metadata.genre} • {story.narrativeLayer.tone}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}