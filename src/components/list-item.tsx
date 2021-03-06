import { useMedia } from "@/hooks";
import { useList } from "@/lib";
import { ListProps } from "@/types";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Spacer,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { motion, useIsPresent } from "framer-motion";
import { FC, memo } from "react";

interface ListItemProps {
  item: ListProps;
}

const ListItem: FC<ListItemProps> = ({ item }) => {
  const deleteItem = useList((state) => state.deleteItem);

  const hoverBgColor = useColorModeValue("gray.200", "gray.800");

  const isPresent = useIsPresent();

  const { isDesktop } = useMedia();

  const toast = useToast();

  return (
    <Box id={`item-${item.id}`} position="relative">
      <motion.div
        layout
        style={{
          position: isPresent ? "static" : "absolute",
          width: "100%",
        }}
        initial={{
          opacity: 0,
          y: -50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -50,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 50,
          mass: 1,
        }}
      >
        <Flex
          minH={12}
          align="center"
          key={item.id}
          p={{ base: 1, md: 2 }}
          my={2}
          borderRadius="md"
          cursor="pointer"
          _hover={{ bgColor: hoverBgColor }}
          role="group"
          onClick={() => {
            navigator.clipboard.writeText(item.title);
            toast({
              title: "Copied to clipboard",
              status: "success",
              duration: 3000,
            });
          }}
        >
          <Heading size="md" fontWeight="semibold">
            {item.title}
          </Heading>
          <Spacer />
          <IconButton
            size="sm"
            aria-label="Delete item"
            icon={<CloseIcon />}
            onClick={(e) => {
              e.stopPropagation();
              deleteItem(item.id);
            }}
            variant="float"
            display={isDesktop ? "none" : "block"}
            _groupHover={{ display: "block" }}
            position={isDesktop ? "absolute" : "static"}
            right={1}
          />
        </Flex>
      </motion.div>
    </Box>
  );
};

export default memo(ListItem);
