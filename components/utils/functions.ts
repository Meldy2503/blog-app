import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const handleGoBack = (router: AppRouterInstance) => {
  router.back();
};

export const capitalizeName = (name: string | undefined): string => {
  if (!name) {
    return "";
  }
  return name.replace(/\b\w/g, (letter) => letter.toUpperCase());
};

export const formatDate = (date: number) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
