import {
  Flex,
  HStack,
  IconButton,
  Text,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "../hooks/auth";
import { useDeletePost, useToggleLike } from "../hooks/likes-delete";
import { useComments } from "../hooks/comments";
import { BsChatDots } from "react-icons/bs";

const PostActions = ({ post }: any) => {
  const { colorMode } = useColorMode();

  const { likes, author, id } = post;
  const { user, isLoading: userLoading } = useAuth();
  const isLiked = likes?.includes(user?.email);
  const config = { id, isLiked, email: user?.email };
  const { toggleLike, isLoading: likeLoading } = useToggleLike(config);
  const { deletePost, isLoading: deleteLoading } = useDeletePost(id);
  const { comments } = useComments(post?.id);

  const path = usePathname();
  const router = useRouter();

  const handleToggleLike = () => {
    if (!user) {
      router.push("/auth/sign-in");
    } else {
      toggleLike();
    }
  };

  return (
    <Flex justify={"flex-end"}>
      <HStack gap={"20px"} w={"full"} justify={"flex-end"}>
        <HStack spacing={"0px"}>
          <IconButton
            onClick={handleToggleLike}
            isLoading={likeLoading || userLoading}
            icon={isLiked ? <AiFillLike color="red" /> : <AiOutlineLike />}
            variant={"ghost"}
            aria-label={"like"}
            isRound
          />
          <Text>{likes?.length}</Text>
        </HStack>

        <Link href={user ? `/dashboard/${post.id}` : "/auth/sign-in"}>
          <Flex align={"center"} gap=".5rem" cursor="pointer">
            <Icon
              as={BsChatDots}
              color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
            />
            <Text fontSize={".8rem"}>{comments?.length}</Text>
          </Flex>
        </Link>

        <HStack spacing={"1px"}>
          {!userLoading &&
            user?.email === author &&
            path.includes("/profile/") && (
              <IconButton
                mr="10px"
                aria-label="delete post"
                onClick={deletePost}
                isLoading={deleteLoading}
                size="md"
                colorScheme="red"
                variant="ghost"
                icon={<FaTrash />}
                isRound
              />
            )}
        </HStack>
      </HStack>
    </Flex>
  );
};

export default PostActions;
