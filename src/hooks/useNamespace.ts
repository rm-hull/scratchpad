import { useParams } from "react-router-dom";

function safeNamespace(namespace?: string): string | undefined {
  const safe = namespace?.trim().replace(/\W/g, "-").toLowerCase();
  if (safe === undefined || safe.length === 0) {
    return undefined;
  }
  return safe;
}

export function useNamespace(): string | undefined {
  const { "*": namespace } = useParams();

  return safeNamespace(namespace);
}
