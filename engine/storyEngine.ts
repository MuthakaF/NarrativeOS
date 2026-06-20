// storyEngine.ts

export type Role = "reader" | "writer" | "dev";

export type Chapter = {
  id: string;
  title: string;
  content: string;
  order: number;

  // narrative hooks (your "advanced layer")
  hooks?: {
    emotionalBeat?: string;   // e.g. "tension", "calm", "reveal"
    intensity?: number;       // 1 - 10
  };
};

export type Story = {
  id: string;

  metadata: {
    title: string;
    authorId: string;
    createdAt: string;

    tags: string[];
    genre: string;

    visibility: "public" | "private";
  };

  narrativeLayer: {
    tone: string;        // "dark", "warm", "mysterious"
    pacing: "slow" | "medium" | "fast";
    perspective: "first" | "third" | "mixed";
  };

  content: {
    chapters: Chapter[];
  };
};

// -------------------------
// STORAGE KEY
// -------------------------

const STORAGE_KEY = "narrative_os_stories";

// -------------------------
// HELPERS
// -------------------------

const readStore = (): Story[] => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

const writeStore = (stories: Story[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
};

// -------------------------
// CORE ENGINE FUNCTIONS
// -------------------------

export const createStory = (data: {
  title: string;
  authorId: string;
  genre: string;
  tags?: string[];
  tone?: string;
  pacing?: "slow" | "medium" | "fast";
  perspective?: "first" | "third" | "mixed";
}): Story => {
  const newStory: Story = {
    id: crypto.randomUUID(),

    metadata: {
      title: data.title,
      authorId: data.authorId,
      createdAt: new Date().toISOString(),
      tags: data.tags || [],
      genre: data.genre,
      visibility: "private",
    },

    narrativeLayer: {
      tone: data.tone || "neutral",
      pacing: data.pacing || "medium",
      perspective: data.perspective || "third",
    },

    content: {
      chapters: [],
    },
  };

  const stories = readStore();
  stories.push(newStory);
  writeStore(stories);

  return newStory;
};

// -------------------------

export const addChapter = (
  storyId: string,
  chapter: Omit<Chapter, "id">
) => {
  const stories = readStore();

  const updated = stories.map((story) => {
    if (story.id !== storyId) return story;

    const newChapter: Chapter = {
      id: crypto.randomUUID(),
      ...chapter,
    };

    return {
      ...story,
      content: {
        chapters: [...story.content.chapters, newChapter].sort(
          (a, b) => a.order - b.order
        ),
      },
    };
  });

  writeStore(updated);
  return updated.find((s) => s.id === storyId);
};

// -------------------------

export const getStoriesByAuthor = (authorId: string): Story[] => {
  const stories = readStore();
  return stories.filter((s) => s.metadata.authorId === authorId);
};

// -------------------------

export const getStoryById = (id: string): Story | undefined => {
  const stories = readStore();
  return stories.find((s) => s.id === id);
};

export const updateStoryChapters = (
  storyId: string,
  chapters: Chapter[]
) => {
  const stories = readStore();

  const updated = stories.map((story) => {
    if (story.id !== storyId) return story;

    return {
      ...story,
      content: {
        chapters: chapters.sort((a, b) => a.order - b.order),
      },
    };
  });

  writeStore(updated);

  return updated.find((s) => s.id === storyId);
};
// -------------------------

export const deleteStory = (id: string) => {
  const stories = readStore().filter((s) => s.id !== id);
  writeStore(stories);
};