import { Menu } from "@chakra-ui/react";
import { useNamespace } from "../hooks/useNamespace";
import { listNamespaces } from "../models/block";
import { Link } from "react-router-dom";

export function GotoNamespace() {
  const namespace = useNamespace();
  const customNamespaces = listNamespaces();

  if (customNamespaces.length === 0) {
    return null;
  }

  return (
    <Menu.RadioItemGroup defaultValue={namespace ?? "root"} title="Goto scratchpad">
      <Menu.Item value="root" asChild>
        <Link to="/">«root»</Link>
      </Menu.Item>
      {customNamespaces.map((ns) => (
        <Menu.Item value={ns} key={ns} asChild>
          <Link to={`/${ns}`}>{ns}</Link>
        </Menu.Item>
      ))}
    </Menu.RadioItemGroup>
  );
}
