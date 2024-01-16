import { Alert, AlertDescription, AlertTitle } from "@chakra-ui/react";
import { type JSX } from "react";
import { useBlocks } from "../hooks/useBlocks";
import { useGeneralSettings } from "../hooks/useGeneralSettings";
import { ResetDataButton } from "./ResetDataButton";

export function DangerZoneSettings(): JSX.Element {
  const [, updateBlocks] = useBlocks();
  const [, updateSettings] = useGeneralSettings();

  const handleResetData = (): void => {
    updateBlocks(undefined);
    updateSettings(undefined);
  };

  return (
    <Alert status="error" variant="left-accent" flexDirection="column" alignItems="start">
      <AlertTitle mb={1} fontSize="lg">
        Danger Zone
      </AlertTitle>
      <AlertDescription mb={3}>
        The operations in this section are destructive and not recoverable. Ensure that you definitely want proceed, as
        there is no way to subsequently revert any completed operations.
      </AlertDescription>
      <ResetDataButton onResetRequested={handleResetData} />
    </Alert>
  );
}
