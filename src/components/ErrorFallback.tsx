import { Alert, Code, Container, Heading } from "@chakra-ui/react";

interface ErrorFallbackProps {
  error: unknown;
}

export function ErrorFallback({ error }: ErrorFallbackProps) {

  const err = error instanceof Error ? error : new Error(String(error));

  return (
    <Container maxWidth="container.lg">
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Something went wrong:</Alert.Title>
          <Alert.Description>{err.message}</Alert.Description>
        </Alert.Content>
      </Alert.Root>

      <Container m={5}>
        <Heading size="sm">Stack trace</Heading>
        <Code background="none">
          <pre>{err.stack}</pre>
        </Code>
      </Container>
    </Container>
  );
}
