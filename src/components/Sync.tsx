import { useCallback, useEffect } from "react";
import { useBlocks } from "../hooks/useBlocks";
import { useGeneralSettings } from "../hooks/useGeneralSettings";
import { useGoogleDrive } from "../hooks/useGoogleDrive";
import { type Block } from "../models/block";
import { useNamespace } from "../hooks/useNamespace";
import { toaster } from "./ui/toaster";

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

function removeEmpty(blocks: Record<string, Block>): Record<string, Block> {
  return Object.values(blocks).reduce((accum: Record<string, Block>, curr: Block) => {
    if (curr.text.trim().length === 0) {
      return accum;
    } else {
      return {
        ...accum,
        [curr.id]: curr,
      };
    }
  }, {});
}

export function Sync({ onFinished, onError }: SyncProps) {
  const namespace = useNamespace();
  const syncFilename =
    namespace === undefined ? "scratchpad_sync.json" : `scratchpad_sync_${namespace.replace("-", "_")}.json`;
  const { drive, login, error } = useGoogleDrive(syncFilename);
  const [settings, updateSettings] = useGeneralSettings();
  const [blocks, updateBlocks] = useBlocks();

  const handleError = useCallback(
    (error: Error) => {
      console.log({ error });
      toaster.dismiss();
      toaster.create({
        title: "Unable to sync with Google Drive",
        description: error.message,
        type: "error",
        duration: 9000,
        closable: true,
      });
      onError(error);
    },
    [onError]
  );

  const sync = useCallback(async (): Promise<void> => {
    if (error !== undefined) {
      throw error as Error;
    }

    if (drive === undefined) {
      login();
      return;
    }

    toaster.create({
      title: "Syncing with Google Drive",
      description: "Please wait while data is being synced...",
      type: "info",
      duration: 9000,
      closable: true,
    });

    const downloaded = await drive.download();
    const newSettings = { ...downloaded.settings, ...settings };
    const merged = removeEmpty(merge(downloaded.blocks, blocks));

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

    toaster.dismiss();
    toaster.create({
      title: "Syncing with Google Drive",
      description: "Sync was successful",
      type: "success",
      duration: 9000,
      closable: true,
    });
  }, [blocks, drive, error, login, onFinished, settings, updateBlocks, updateSettings]);

  useEffect(() => {
    sync().catch(handleError);
  }, [handleError, sync]);

  return null;
}
