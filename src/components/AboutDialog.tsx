import { Button, CloseButton, Code, Dialog, Link, Separator, Text, VStack } from "@chakra-ui/react";
import { data } from "../models/exchangeRates";
import { License } from "./License";

interface AboutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutDialog({ isOpen, onClose }: AboutDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose} size="xl" scrollBehavior="inside">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
          <Dialog.Header>
            <Dialog.Title>About</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <VStack align="left">
              <Text>
                Scratchpad is a small web-app where you can store notes in local storage, and sync with your Google
                Drive. Please read the{" "}
                <Link target="_blank" rel="noopener noreferrer" color="blue.400" href="/scratchpad/privacy_policy.txt">
                  privacy policy
                </Link>{" "}
                and the{" "}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  color="blue.400"
                  href="/scratchpad/terms_of_service.txt"
                >
                  Terms of Service
                </Link>
                .
              </Text>

              <VStack gap={0} align="left">
                <Text>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    color="blue.400"
                    href="https://github.com/rm-hull/scratchpad"
                  >
                    https://github.com/rm-hull/scratchpad
                  </Link>
                </Text>
                <Text>
                  Build info: <Code>{import.meta.env.VITE_GIT_COMMIT_HASH}</Code>,{" "}
                  {import.meta.env.VITE_GIT_COMMIT_DATE}
                </Text>
                <Text>
                  Google API client ID:{" "}
                  <Code wordBreak="break-all">{import.meta.env.VITE_GOOGLE_API_CLIENT_ID ?? "<not-set>"}</Code>
                </Text>
                <Text>
                  FX data sourced from daily <strong>{data.sender}</strong>{" "}
                  <Link target="_blank" rel="noopener noreferrer" color="blue.400" href={data.url}>
                    {data.subject}
                  </Link>{" "}
                  from {data.date}.
                </Text>
              </VStack>

              <Separator mt={3} mb={3} />
              <License />
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
