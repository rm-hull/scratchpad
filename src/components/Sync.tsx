import { useToast } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import useBlocks from "../hooks/useBlocks";
import useGeneralSettings from "../hooks/useGeneralSettings";
import useGoogleDrive from "../hooks/useGoogleDrive";
import { type Block } from "../models/block";

interface SyncProps {
  onFinished: () => void;
  onError: (err: Error) => void;
}

function merge(a: Record<string, Block>, b: Record<string, Block>): Record<string, Block> {
  const result: Record<string, Block> = { ...a };

  for (const key in b) {
    if (Object.prototype.hasOwnProperty.call(b, key)) {
      if (result[key] !== undefined) {
        // Resolve conflicts by comparing updatedAt values
        if ((b[key].updatedAt ?? 0) > (result[key].updatedAt ?? 0)) {
          result[key] = b[key];
        }
      } else {
        result[key] = b[key];
      }
    }
  }

  return result;
}

export default function Sync({ onFinished, onError }: SyncProps): null {
  const toast = useToast();
  const { drive, login, error } = useGoogleDrive("scratchpad_sync.json");
  const [settings, updateSettings] = useGeneralSettings();
  const [blocks, updateBlocks] = useBlocks();

  const handleError = useCallback(
    (error: Error) => {
      console.log({ error });
      toast.closeAll();
      toast({
        title: "Unable to sync with Google Drive",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      onError(error);
    },
    [onError, toast]
  );

  const sync = useCallback(async (): Promise<void> => {
    if (error !== undefined) {
      throw error as Error;
    }

    if (drive === undefined) {
      login();
      return;
    }

    toast({
      title: "Syncing with Google Drive",
      description: "Please wait while data is being synced...",
      status: "info",
      duration: 9000,
      isClosable: true,
    });

    const downloaded = await drive.download();
    const newSettings = { ...downloaded.settings, ...settings };
    const merged = merge(downloaded.blocks, blocks);

    await drive.upload({
      settings: newSettings,
      blocks: merged,
      lastSync: {
        on: new Date().toUTCString(),
        from: "TBC", // await ipAddress(),
        url: window.location.href,
      },
    });

    updateBlocks(merged);
    updateSettings(newSettings);
    onFinished();

    toast.closeAll();
    toast({
      title: "Syncing with Google Drive",
      description: "Sync was successful",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }, [blocks, drive, error, login, onFinished, settings, toast, updateBlocks, updateSettings]);

  useEffect(() => {
    sync().catch(handleError);
  }, [handleError, sync]);

  return null;
}
