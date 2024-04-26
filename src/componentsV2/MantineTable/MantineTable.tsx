import React from "react";

import { MRT_Localization_VI } from "mantine-react-table/locales/vi";

import { MantineReactTableStyled } from "./Styled";

export default ({
  data,
  columns,
  isFetching,
  isLoading,
  pagination,
  onPaginationChange,
  rowCount,
  manualPagination = true,
  renderRowActions = () => {},
  enablePagination = true,
  enableRowActions = true,
  enableRowNumbers = false,
  state,
  displayColumnDefOptions = {},
  ...rest
}: any) => {
  return (
    <MantineReactTableStyled
      localization={MRT_Localization_VI}
      columns={columns}
      data={data ?? []} //fallback to array if data is undefined
      state={{
        density: "xs",
        isLoading: isFetching,
        showSkeletons: isLoading,
        pagination,
        columnPinning: { right: ["mrt-row-actions"] },
        ...state,
      }}
      enableRowNumbers={enableRowNumbers}
      enablePagination={enablePagination}
      enableTopToolbar={false}
      onPaginationChange={onPaginationChange}
      manualPagination={manualPagination}
      rowCount={rowCount}
      // enableClickToCopy
      enablePinning
      enableRowActions={enableRowActions}
      positionActionsColumn="last"
      displayColumnDefOptions={{ "mrt-row-actions": { header: "", size: 40 }, ...displayColumnDefOptions }}
      renderRowActionMenuItems={({ row, table }) => renderRowActions({ row, table })}
      {...rest}
    />
  );
};
