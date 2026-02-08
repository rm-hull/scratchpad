import { Button, CloseButton, Dialog, Heading, Image, Kbd, Link, List, Text, VStack } from "@chakra-ui/react";
import { type JSX } from "react";
import screenshot from "../../doc/screenshots/main.webp";

interface GettinngStartedDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GettingStartedDialog({ isOpen, onClose }: GettinngStartedDialogProps): JSX.Element | null {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose} size="xl" scrollBehavior="inside">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
          <Dialog.Header>
            <Dialog.Title>Getting Started</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <VStack align="left">
              <Text>
                Scratchpad is a small web app that allows you to store snippets & miscellaneous notes as
                &quot;blocks&quot; in your browser&apos;s local storage. They never leave your machine (unless you want
                to sync them to your Google Drive). Many file formats are supported, and it will do syntax coloring and
                pretty-print formatting (especially useful for JSON).
              </Text>
              <Image src={screenshot} width={500} />
              <Text>Right-click on any block to bring up a context menu.</Text>
              <Text>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://mathjs.org/docs/index.html"
                  color="blue.400"
                >
                  Math.JS
                </Link>{" "}
                is integrated as a file type, giving a capable calculator functionality with currency conversion (FX
                rates provided by an ECB API). Each block has a toolbar of options, and you can right-click to get a
                context menu allowing you to alter settings and sync to Google.
              </Text>
              <Heading size="md">Keyboard shortcuts</Heading>
              On MacOS,
              <List.Root pl={4}>
                <List.Item>
                  <Kbd>⌘</Kbd> <Kbd>/</Kbd> - Search
                </List.Item>
                <List.Item>
                  <Kbd>⌘</Kbd> <Kbd>Enter</Kbd> - Add new block
                </List.Item>
                <List.Item>
                  <Kbd>⌘</Kbd> <Kbd>.</Kbd> - Base64-decode selected text
                </List.Item>
              </List.Root>
              <Text>
                For Windows/Linux, use <Kbd>CTRL</Kbd> rather than <Kbd>⌘</Kbd>.
              </Text>
              <Heading size="md">Namespaces</Heading>
              <Text>
                The &quot;default&quot; namespace is hosted at{" "}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.destructuring-bind.org/scratchpad"
                  color="blue.400"
                >
                  https://www.destructuring-bind.org/scratchpad
                </Link>
                , but you can add anything after the main URL to organise scratchpad blocks into separate namespaces, so
                you could have the following URLs, all which are isolated (both the blocks, their own settings
                configuration and Google Drive synchronisation):
              </Text>
              <List.Root pl={4}>
                <List.Item>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.destructuring-bind.org/scratchpad/diary/2024"
                    color="blue.400"
                  >
                    https://www.destructuring-bind.org/scratchpad/diary/2024
                  </Link>
                </List.Item>
                <List.Item>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.destructuring-bind.org/scratchpad/recipies"
                    color="blue.400"
                  >
                    https://www.destructuring-bind.org/scratchpad/recipies
                  </Link>
                </List.Item>
                <List.Item>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.destructuring-bind.org/scratchpad/work-stuff"
                    color="blue.400"
                  >
                    https://www.destructuring-bind.org/scratchpad/work-stuff
                  </Link>
                </List.Item>
              </List.Root>
              <Text>There is no practical limit to the number of namespaces, however note that:</Text>
              <List.Root pl={4}>
                <List.Item>
                  non-alphabetical characters are treated the same so{" "}
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.destructuring-bind.org/scratchpad/diary/2024"
                    color="blue.400"
                  >
                    https://www.destructuring-bind.org/scratchpad/diary/2024
                  </Link>{" "}
                  and{" "}
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.destructuring-bind.org/scratchpad/diary-2024"
                    color="blue.400"
                  >
                    https://www.destructuring-bind.org/scratchpad/diary-2024
                  </Link>{" "}
                  resolve to the same namespace.
                </List.Item>
                <List.Item>
                  namespaces are case-insensitive, so{" "}
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.destructuring-bind.org/scratchpad/recipies"
                    color="blue.400"
                  >
                    https://www.destructuring-bind.org/scratchpad/recipies
                  </Link>{" "}
                  and
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.destructuring-bind.org/scratchpad/Recipies"
                    color="blue.400"
                  >
                    https://www.destructuring-bind.org/scratchpad/Recipies
                  </Link>{" "}
                  would resolve the the same namespace.
                </List.Item>
              </List.Root>
            </VStack>
          </Dialog.Body>

          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              <Button variant="subtle">Close</Button>
            </Dialog.ActionTrigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
