import { Container, HStack } from "@chakra-ui/react";
import { useState } from "react";
// import { useParams } from "react-router-dom";
import TextEditor from "../components/TextEditor";
import Toolbar from "../components/Toolbar";
import { type JSX } from "react";

export default function Scratch(): JSX.Element {
  // const { id } = useParams();
  const [text, setText] = useState<string>("");

  return (
    <Container maxWidth="100%">
      <HStack justifyContent="space-between">
        <Toolbar />
      </HStack>
      <TextEditor code={text} onCodeChange={setText} />
    </Container>
  );
}
