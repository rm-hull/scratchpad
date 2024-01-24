import {
  Button,
  Heading,
  Img,
  Kbd,
  Link,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { type JSX } from "react";
import screenshot from "../../doc/screenshots/main.webp";

interface GettinngStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GettingStartedModal({ isOpen, onClose }: GettinngStartedModalProps): JSX.Element | null {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Getting Started</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="left">
            <Text>
              Scratchpad is a small web app that allows you to store snippets & miscellaneous notes as
              &quot;blocks&quot; in your browser&apos;s local storage. They never leave your machine (unless you want to
              sync them to your Google Drive). Many file formats are supported, and it will do syntax coloring and
              pretty-print formatting (especially useful for JSON).
            </Text>
            <Img src={screenshot} width={500} />
            <Text>Right-click on any block to bring up a context menu.</Text>
            <Text>
              <Link isExternal href="https://mathjs.org/docs/index.html" color="blue.400">
                Math.JS
              </Link>{" "}
              is integrated as a file type, giving a capable calculator functionality with currency conversion (FX rates
              provided by an ECB API). Each block has a toolbar of options, and you can right-click to get a context
              menu allowing you to alter settings and sync to Google.
            </Text>
            <Heading size="md">Keyboard shortcuts</Heading>
            On MacOS,
            <List pl={4}>
              <ListItem>
                <Kbd>⌘</Kbd> <Kbd>/</Kbd> - Search
              </ListItem>
              <ListItem>
                <Kbd>⌘</Kbd> <Kbd>Enter</Kbd> - Add new block
              </ListItem>
              <ListItem>
                <Kbd>⌘</Kbd> <Kbd>.</Kbd> - Base64-decode selected text
              </ListItem>
            </List>
            <Text>
              For Windows/Linux, use <Kbd>CTRL</Kbd> rather than <Kbd>⌘</Kbd>.
            </Text>
            <Heading size="md">Namespaces</Heading>
            <Text>
              The &quot;default&quot; namespace is hosted at{" "}
              <Link isExternal href="https://www.destructuring-bind.org/scratchpad" color="blue.400">
                https://www.destructuring-bind.org/scratchpad
              </Link>
              , but you can add anything after the main URL to organise scratchpad blocks into separate namespaces, so
              you could have the following URLs, all which are isolated (both the blocks, their own settings
              configuration and Google Drive synchronisation):
            </Text>
            <UnorderedList pl={4}>
              <ListItem>
                <Link isExternal href="https://www.destructuring-bind.org/scratchpad/diary/2024" color="blue.400">
                  https://www.destructuring-bind.org/scratchpad/diary/2024
                </Link>
              </ListItem>
              <ListItem>
                <Link isExternal href="https://www.destructuring-bind.org/scratchpad/recipies" color="blue.400">
                  https://www.destructuring-bind.org/scratchpad/recipies
                </Link>
              </ListItem>
              <ListItem>
                <Link isExternal href="https://www.destructuring-bind.org/scratchpad/work-stuff" color="blue.400">
                  https://www.destructuring-bind.org/scratchpad/work-stuff
                </Link>
              </ListItem>
            </UnorderedList>
            <Text>There is no practical limit to the number of namespaces, however note that:</Text>
            <UnorderedList pl={4}>
              <ListItem>
                non-alphabetical characters are treated the same so{" "}
                <Link isExternal href="https://www.destructuring-bind.org/scratchpad/diary/2024" color="blue.400">
                  https://www.destructuring-bind.org/scratchpad/diary/2024
                </Link>{" "}
                and{" "}
                <Link isExternal href="https://www.destructuring-bind.org/scratchpad/diary-2024" color="blue.400">
                  https://www.destructuring-bind.org/scratchpad/diary-2024
                </Link>{" "}
                resolve to the same namespace.
              </ListItem>
              <ListItem>
                namespaces are case-insensitive, so{" "}
                <Link isExternal href="https://www.destructuring-bind.org/scratchpad/recipies" color="blue.400">
                  https://www.destructuring-bind.org/scratchpad/recipies
                </Link>{" "}
                and
                <Link isExternal href="https://www.destructuring-bind.org/scratchpad/Recipies" color="blue.400">
                  https://www.destructuring-bind.org/scratchpad/Recipies
                </Link>{" "}
                would resolve the the same namespace.
              </ListItem>
            </UnorderedList>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
