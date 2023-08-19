import { Flex, HStack, IconButton, Text, useColorMode } from "@chakra-ui/react";
import {
  AiFillLike,
  AiOutlineLike,
  AiOutlineStar,
  AiFillStar,
} from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "../hooks/auth";
import {
  useDeleteDraftPost,
  useDeletePost,
  useToggleLike,
} from "../hooks/likes-delete";
import { useComments } from "../hooks/comments";
import { BsChatDots } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import { useToggleBookmark } from "../hooks/bookmark-drafts";

const PostActions = ({ post }: any) => {
  const { likes, author, id, bookmarks } = post;
  const { user, isLoading: userLoading } = useAuth();
  const isLiked = likes?.includes(user?.email);
  const isBookmarked = bookmarks?.includes(user?.email);

  const config = { id, isLiked, email: user?.email, isBookmarked };
  const { toggleLike, isLoading: likeLoading } = useToggleLike(config);
  const { toggleBookmark, isLoading: bookmarkLoading } =
    useToggleBookmark(config);
  const { deletePost, isLoading: deleteLoading } = useDeletePost(id);
  const { deleteDraftPost, isLoading: deleteDraftLoading } =
    useDeleteDraftPost(id);
  const { comments } = useComments(post?.id);
  const path = usePathname();
  const router = useRouter();
  const { colorMode } = useColorMode();

  const handleToggleLike = () => {
    if (!user) {
      router.push("/auth/sign-in");
    } else {
      toggleLike();
    }
  };
  const handleToggleBookmark = () => {
    if (!user) {
      router.push("/auth/sign-in");
    } else {
      toggleBookmark();
    }
  };

  const deletePosts = () => {
    path.includes("drafts") ? deleteDraftPost() : deletePost();
  };

  return (
    <Flex justify={"flex-end"}>
      <HStack gap={"20px"} w={"full"} justify={"flex-end"}>
        {!path.includes("/dashboard/drafts") && (
          <HStack spacing={"0px"} data-tooltip-id="like-icon">
            <IconButton
              onClick={handleToggleLike}
              isLoading={likeLoading || userLoading}
              icon={isLiked ? <AiFillLike color="red" /> : <AiOutlineLike />}
              variant={"ghost"}
              aria-label="like"
              isRound
            />
            <Text>{likes?.length ?? 0}</Text>
          </HStack>
        )}
        <Tooltip
          id="like-icon"
          place="bottom"
          variant={colorMode === "dark" ? "info" : "dark"}
          content="Likes"
        />

        {!path.includes("/dashboard/drafts") && (
          <Link href={user ? `/dashboard/${post.id}` : "/auth/sign-in"}>
            <HStack
              align={"center"}
              spacing="0px"
              data-tooltip-id="comment-icon"
            >
              <IconButton
                icon={<BsChatDots color="teal" />}
                aria-label="comment"
                variant={"ghost"}
                isRound
              />
              <Text fontSize={".8rem"}>{comments?.length ?? 0}</Text>
            </HStack>
          </Link>
        )}
        <Tooltip
          id="comment-icon"
          place="bottom"
          variant={colorMode === "dark" ? "info" : "dark"}
          content="Comments"
        />

        {!path.includes("/dashboard/drafts") && (
          <HStack spacing={"0px"} data-tooltip-id="bookmark-icon">
            <IconButton
              onClick={handleToggleBookmark}
              isLoading={bookmarkLoading || userLoading}
              icon={
                isBookmarked ? <AiFillStar color="blue" /> : <AiOutlineStar />
              }
              variant={"ghost"}
              aria-label={"bookmark"}
              isRound
            />
            <Text>{bookmarks?.length ?? 0} </Text>
          </HStack>
        )}
        <Tooltip
          id="bookmark-icon"
          place="bottom"
          variant={colorMode === "dark" ? "info" : "dark"}
          content="Bookmarks"
        />

        {path.includes("/dashboard/drafts") && (
          <HStack spacing={"0px"} data-tooltip-id="edit-icon">
            <IconButton
              aria-label="edit post"
              size="md"
              colorScheme="blue"
              variant="ghost"
              icon={<FaEdit />}
              isRound
            />
          </HStack>
        )}
        <Tooltip
          id="edit-icon"
          place="bottom"
          variant={colorMode === "dark" ? "info" : "dark"}
          content="Edit"
        />

        <HStack spacing={"0px"} data-tooltip-id="delete-icon">
          {!userLoading && user?.email === post?.author && (
            <IconButton
              mr="12px"
              aria-label="delete post"
              onClick={deletePosts}
              isLoading={deleteLoading || deleteDraftLoading}
              size="sm"
              colorScheme="red"
              variant="ghost"
              icon={<FaTrash />}
              isRound
            />
          )}
        </HStack>
        <Tooltip
          id="delete-icon"
          place="bottom"
          variant={colorMode === "dark" ? "info" : "dark"}
          content="Delete"
        />
      </HStack>
    </Flex>
  );
};

export default PostActions;
