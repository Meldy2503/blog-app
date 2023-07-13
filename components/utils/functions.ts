import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const handleGoBack = (router: AppRouterInstance) => {
  router.back();
};

// to capitalize names
export const capitalizeName = (name: string | undefined): string => {
  if (!name) {
    return "";
  }
  return name.replace(/\b\w/g, (letter) => letter.toUpperCase());
};

// to format date
export const formatDate = (date: number) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// to calculate read time
export function calculateReadTime(content: string) {
  const wordCount = content.trim().split(/\s+/).length;
  const averageReadingSpeed = 150;
  const readTime = Math.ceil(wordCount / averageReadingSpeed);
  return readTime;
}
