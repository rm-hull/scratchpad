import { Alert, AlertDescription, AlertIcon, AlertTitle, Code, Container, Heading } from "@chakra-ui/react";
import { type JSX } from "react";

interface ErrorFallbackProps {
  error: unknown;
}

export function ErrorFallback({ error }: ErrorFallbackProps): JSX.Element {

  const err = error instanceof Error ? error : new Error(String(error));

  return (
    <Container maxWidth="container.lg">
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Something went wrong:</AlertTitle>
        <AlertDescription>{err.message}</AlertDescription>
      </Alert>

      <Container m={5}>
        <Heading size="sm">Stack trace</Heading>
        <Code background="none">
          <pre>{err.stack}</pre>
        </Code>
      </Container>
    </Container>
  );
}
