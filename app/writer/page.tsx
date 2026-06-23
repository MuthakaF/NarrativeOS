"use client";

import { useEffect, useState } from "react";
import {
  createStory,
  getStoriesByAuthor,
  addChapter,
  updateStoryChapters,
  Story,
  Chapter,
} from "../../engine/storyEngine";

export default function WriterDashboard() {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [tone, setTone] = useState("");
  const []

  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterContent, setChapterContent] = useState("");

  const authorId = "demo-user";

  useEffect(() => {
    const data = getStoriesByAuthor(authorId);
    setStories(data);
  }, []);

  const refresh = () => {
    const data = getStoriesByAuthor(authorId);
    setStories(data);
  };

  const handleCreateStory = () => {
    if (!title || !genre) return;

    createStory({
      title,
      genre,
      authorId,
      tone,
      tags: [],
      pacing: "medium",
      perspective: "third",
    });

    refresh();

    setTitle("");
    setGenre("");
    setTone("");
  };

  const handleAddChapter = () => {
    if (!selectedStory || !chapterTitle || !chapterContent) return;

    const newChapter: Chapter = {
      id: crypto.randomUUID(),
      title: chapterTitle,
      content: chapterContent,
      order: selectedStory.content.chapters.length + 1,
      hooks: {
        emotionalBeat: "neutral",
        intensity: 5,
      },
    };

    const updated = {
      ...selectedStory,
      content: {
        chapters: [...selectedStory.content.chapters, newChapter],
      },
    };

    updateStoryChapters(selectedStory.id, updated.content.chapters);

    setSelectedStory(updated);
    refresh();

    setChapterTitle("");
    setChapterContent("");
  };

  const publishStory = (storyId: string) => {
    const story = stories.find((s) => s.id === storyId);
    if (story) {
      story.metadata.visibility = "public";
      refresh();
    }

  return (
    <div className="min-h-screen w-full bg-[#FAF6EE] p-10 font-[Times_New_Roman]">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl tracking-widest text-[#7A5F43] uppercase mb-2">
          THE WRITER'S WORKBENCH
        </h1>
        <p className="text-[#8B7E74] mb-8">
          Build your stories, chapter by chapter.
        </p>

        {/* CREATE STORY */}
        <div className="bg-white/70 p-6 rounded-2xl border border-[#7A5F43]/10 mb-10">
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
            placeholder="Tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          />

          <button
            onClick={handleCreateStory}
            className="px-6 py-3 bg-[#8E5A36] text-white rounded-full"
          >
            CREATE STORY
          </button>
          <button
  onClick={() => {
    publishStory(selectedStory?.id || "");
    refresh();
  }}
>
  Publish
</button>

{selectedStory?.metadata.visibility === "public"
  ? "Published"
  : "Draft"}
        </div>

        {/* STORY LIST */}
        <div className="mb-10 space-y-3">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className={`p-4 rounded-xl border cursor-pointer ${
                selectedStory?.id === story.id
                  ? "border-[#7A5F43] bg-white/70"
                  : "border-[#7A5F43]/10 bg-white/40"
              }`}
            >
              <h2 className="text-[#7A5F43]">{story.metadata.title}</h2>
              <p className="text-sm text-gray-600">
                {story.metadata.genre} • {story.narrativeLayer.tone}
              </p>
            </div>
          ))}
        </div>

        {/* CHAPTER EDITOR */}
        {selectedStory && (
          <div className="bg-white/70 p-6 rounded-2xl border border-[#7A5F43]/10">
            <h2 className="text-[#7A5F43] mb-4">
              Editing: {selectedStory.metadata.title}
            </h2>

            <input
              className="w-full p-3 mb-3 bg-[#FDFBF7] border border-[#7A5F43]/15 text-sm"
              placeholder="Chapter Title"
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
            />

            <textarea
              className="w-full p-3 mb-3 bg-[#FDFBF7] border border-[#7A5F43]/15 text-sm min-h-[120px]"
              placeholder="Chapter Content"
              value={chapterContent}
              onChange={(e) => setChapterContent(e.target.value)}
            />

            <button
              onClick={handleAddChapter}
              className="px-6 py-3 bg-[#2D1F18] text-white rounded-full"
            >
              ADD CHAPTER
            </button>

            {/* CHAPTER LIST */}
            <div className="mt-6 space-y-2">
              {selectedStory.content.chapters.map((ch) => (
                <div key={ch.id} className="text-sm text-gray-700">
                  {ch.order}. {ch.title}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}