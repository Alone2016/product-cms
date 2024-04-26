import { useCallback } from "react";
import map from "lodash/map";

import { IconEdit, IconTrash, IconFlag, IconFlag2Off } from "@tabler/icons-react";

import Button from "@/componentsV3/Button";
import { Card, Menu, Popover } from "@mantine/core";

const MoreAction = ({ actions, onAction }: any) => {
  const handleOnClick = useCallback(({ name, path, action, type }: any) => {
    // if (name === "REMOVE") {
    // } else onAction({ name, path, action });
    onAction({ name, path, action, type });
  }, []);

  const iconRender = useCallback(({ name }: any) => {
    switch (name) {
      case "EDIT":
        return <IconEdit size={16} />;
      case "REMOVE":
        return <IconTrash size={16} />;
      case "LAUNCH":
        return <IconFlag size={16} />;
      case "FINISH":
        return <IconFlag2Off size={16} />;
      default:
        return;
    }
  }, []);

  return (
    <Card className="px-0 py-[8px]">
      {map(actions, (item, index) => (
        <Menu.Item key={index}>
          <div
            onClick={() => handleOnClick({ name: item.name, path: item.path, action: item.action, type: item.type })}
            className={`${item?.className} flex items-center cursor-pointer min-w-[160px]	${
              +index < actions?.length - 1 ? "" : ""
            }`}
          >
            <img src={item?.icon} className="mr-2" />
            {item.name}
          </div>
        </Menu.Item>
      ))}
    </Card>
  );
};

export default MoreAction;
