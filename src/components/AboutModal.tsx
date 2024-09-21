import {
  Button,
  Code,
  Divider,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { type JSX } from "react";
import { data } from "../models/exchangeRates";
import { License } from "./License";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps): JSX.Element | null {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>About</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="left">
            <Text>
              Scratchpad is a small web-app where you can store notes in local storage, and sync with your Google Drive.
              Please read the{" "}
              <Link isExternal color="blue.400" href="/scratchpad/privacy_policy.txt">
                privacy policy
              </Link>{" "}
              and the{" "}
              <Link isExternal color="blue.400" href="/scratchpad/terms_of_service.txt">
                Terms of Service
              </Link>
              .
            </Text>

            <VStack gap={0} align="left">
              <Text>
                <Link isExternal color="blue.400" href="https://github.com/rm-hull/scratchpad">
                  https://github.com/rm-hull/scratchpad
                </Link>
              </Text>
              <Text>
                Build info: <Code>{import.meta.env.VITE_GIT_COMMIT_HASH}</Code>, {import.meta.env.VITE_GIT_COMMIT_DATE}
              </Text>
              <Text>
                Google API client ID:{" "}
                <Code wordBreak="break-all">{import.meta.env.VITE_GOOGLE_API_CLIENT_ID ?? "<not-set>"}</Code>
              </Text>
              <Text>
                FX data sourced from daily <strong>{data.sender}</strong>{" "}
                <Link isExternal color="blue.400" href={data.url}>
                  {data.subject}
                </Link>{" "}
                from {data.date}.
              </Text>
            </VStack>

            <Divider mt={3} mb={3} />
            <License />
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
