import React from "react";
import { BsLayoutWtf, BsBookmarks } from "react-icons/bs";
import { MdOutlineDrafts, MdOutlineAnalytics } from "react-icons/md";
import { IconType } from "react-icons";

export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string | any;
}

interface LinkItemProps {
  name: string;
  icon?: IconType;
  children?: { subIcon?: IconType; subName?: string; href?: string | any }[];
}

export const categories = [
  { value: "technology", label: "Technology" },
  { value: "science", label: "Science" },
  { value: "health", label: "Health" },
  { value: "business", label: "Business" },
  { value: "politics", label: "Politics" },
  { value: "sports", label: "Sports" },
  { value: "travel", label: "Travel" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "programming", label: "Programming" },
  { value: "health", label: "Health" },
  { value: "crypto", label: "Crypto" },
  { value: "marketing", label: "Marketing" },
  { value: "design", label: "Design" },
  { value: "productivity", label: "Productivity" },
  { value: "motivation", label: "Motivation" },
  { value: "psychology", label: "Psychology" },
  { value: "entertainment", label: "Entertainment" },
  { value: "food", label: "Food" },
  { value: "education", label: "Education" },
  { value: "culture", label: "Culture" },
  { value: "coding", label: "Coding" },
  { value: "nature", label: "Nature" },
  { value: "fitness", label: "Fitness" },
];

export const avatars = [
  {
    name: "Ryan Florence",
    url: "https://bit.ly/ryan-florence",
  },
  {
    name: "Segun Adebayo",
    url: "https://bit.ly/sage-adebayo",
  },
  {
    name: "Kent Dodds",
    url: "https://bit.ly/kent-c-dodds",
  },
  {
    name: "Prosper Otemuyiwa",
    url: "https://bit.ly/prosper-baba",
  },
  {
    name: "Christian Nwamba",
    url: "https://bit.ly/code-beast",
  },
];

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    children: [
      {
        label: "Join our community",
        subLabel: "Be a part of our community today",
        href: "/",
      },
    ],
    href: "/",
  },
  {
    label: "Feed",
    children: [
      {
        label: "Explore our feeds",
        subLabel: "Checkout our feeds and get inspired",
        href: "/feed",
      },
    ],
    href: "/feed",
  },
];

export const follow = [
  {
    id: 1,
    name: "Anthony Smith",
    title: "programmer",
    src: "/assets/face-1.jpg",
  },
  {
    id: 2,
    name: "Mary Megan",
    title: "Writer",
    src: "/assets/face-5.jpg",
  },
  {
    id: 3,
    name: "Victor Omondi",
    title: "Architect",
    src: "/assets/face-6.jpg",
  },
];

export const LinkItems: Array<LinkItemProps> = [
  {
    name: "Overview",
    children: [
      {
        subIcon: BsLayoutWtf,
        subName: "Feed",
        href: "/dashboard",
      },
      {
        subIcon: BsBookmarks,
        subName: "Bookmarks",
        href: "/dashboard/bookmarks",
      },

      {
        subIcon: MdOutlineDrafts,
        subName: "Drafts",
        href: "/dashboard/drafts",
      },
      {
        subIcon: MdOutlineAnalytics,
        subName: "Analytics",
        href: "/dashboard/analytics",
      },
    ],
  },
];
