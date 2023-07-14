import React, { useContext } from "react";
import { Input, useColorMode, Flex } from "@chakra-ui/react";
import { BlogContext } from "../context/blog-context";
import { usePosts } from "../hooks/posts";

const SearchBar = ({ w, mb }: any) => {
  const { searchTerm, setSearchTerm, setSearchResults } =
    useContext(BlogContext);
  const { posts } = usePosts();
  const { colorMode } = useColorMode();

  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filteredPosts = posts?.filter((post) => {
      const categoryLower = post?.category?.toLowerCase();
      const titleLower = post?.title?.toLowerCase();
      const authorLower = post?.author?.toLowerCase();
      const searchLower = value.toLowerCase();

      return (
        categoryLower.includes(searchLower) ||
        authorLower.includes(searchLower) ||
        titleLower.includes(searchLower)
      );
    });

    setSearchResults(filteredPosts);
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Input
        w={w}
        placeholder="Search...."
        value={searchTerm}
        onChange={handleSearch}
        border={`1px solid ${
          colorMode === "dark" ? "rgb(255, 255, 255, .6)" : "#d0d0d0"
        }`}
        borderRadius="5px"
        focusBorderColor="none"
        mb={mb}
      />
    </Flex>
  );
};

export default SearchBar;
