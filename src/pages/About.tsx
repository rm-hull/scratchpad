import { Code, Container, Heading, Link, Stack, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { type JSX } from "react";

export default function About(): JSX.Element | null {
  return (
    <Container maxW="3xl" centerContent>
      <Stack
        boxShadow="2xl"
        bg={useColorModeValue("white", "gray.800")}
        rounded="xl"
        p={10}
        mt={10}
        spacing={4}
        align="left"
      >
        <Heading size="md">About</Heading>
        <Text>Scratchpad is a small web-app where you can store notes.</Text>

        <VStack gap={0} align="left">
          <Text>
            <Link isExternal color="blue.400" href="https://github.com/rm-hull/scratchpad">
              https://github.com/rm-hull/scratchpad
            </Link>
          </Text>
          <Text>
            Build info: <Code>{import.meta.env.VITE_GIT_COMMIT_HASH}</Code>, {import.meta.env.VITE_GIT_COMMIT_DATE}
          </Text>

          {/* <Text>
          Google API client ID: <Code>{import.meta.env.VITE_GOOGLE_API_CLIENT_ID}</Code>
        </Text> */}
        </VStack>

        <Heading size="md">MIT License</Heading>
        <Text>Copyright &copy; {new Date().getFullYear()} Richard Hull</Text>

        <Text>
          Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
          documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without
          limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
          Software, and to permit persons to whom the Software is furnished to do so, subject to the following
          conditions:
        </Text>

        <Text>
          The above copyright notice and this permission notice shall be included in all copies or substantial portions
          of the Software.
        </Text>

        <Text>
          THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
          NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
          EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
          AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
          OR OTHER DEALINGS IN THE SOFTWARE.
        </Text>
      </Stack>
    </Container>
  );
}
