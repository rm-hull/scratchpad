import {
  Button,
  Code,
  Divider,
  Heading,
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

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps): JSX.Element | null {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>About</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="left">
            <Text>
              Scratchpad is a small web-app where you can store notes in local storage, and sync with your Google Drive.
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
                Google API client ID: <Code wordBreak="break-all">{import.meta.env.VITE_GOOGLE_API_CLIENT_ID}</Code>
              </Text>
              <Text>
                FX data sourced from daily <strong>{data.sender}</strong>{" "}
                <Link isExternal color="blue.400" href={data.url}>
                  {data.subject}
                </Link>{" "}
                from {data.date}.
              </Text>

              {/* <Text>
  Google API client ID: <Code>{import.meta.env.VITE_GOOGLE_API_CLIENT_ID}</Code>
</Text> */}
            </VStack>

            <Divider mt={3} mb={3} />
            <Heading size="sm">MIT License</Heading>
            <Text>Copyright &copy; {new Date().getFullYear()} Richard Hull</Text>

            <Text>
              Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
              associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction,
              including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
              and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
              subject to the following conditions:
            </Text>

            <Text>
              The above copyright notice and this permission notice shall be included in all copies or substantial
              portions of the Software.
            </Text>

            <Text>
              THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
              BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
              NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
              OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
              CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            </Text>
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
