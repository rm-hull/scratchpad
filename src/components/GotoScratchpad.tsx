import { Divider, MenuOptionGroup, MenuItemOption } from "@chakra-ui/react";
import { type JSX } from "react";
import { useNamespace } from "../hooks/useNamespace";
import { listNamespaces } from "../models/block";
import { Link } from "react-router-dom";

export function GotoNamespace(): JSX.Element | null {
  const namespace = useNamespace();
  const customNamespaces = listNamespaces();

  if (customNamespaces.length === 0) {
    return null;
  }

  return (
    <>
      <Divider />
      <MenuOptionGroup defaultValue={namespace ?? "root"} title="Goto scratchpad" type="radio">
        <MenuItemOption value="root" as={Link} to="/">
          «root»
        </MenuItemOption>
        {customNamespaces.map((ns) => (
          <MenuItemOption value={ns} key={ns} as={Link} to={`/${ns}`}>
            {ns}
          </MenuItemOption>
        ))}
      </MenuOptionGroup>
    </>
  );
}
