import React, { useCallback, useMemo, useState } from "react";
import isEqual from "lodash/isEqual";
import { useRouter } from "next/router";
import Container from "@/componentsV2/Container";
import BlockImage from "@/componentsV2/Image";
import { sortBy } from "lodash";
import { mappingMultiArrayString } from "@/utils/common";
import { formatCurrencyVN } from "@/utils/currency";
import dataProduct from "@/data-mock/Product.json";
import MantineTable from "@/componentsV2/MantineTable";
import { Grid } from "@mantine/core";
import MoreAction from "@/componentsV2/MoreAction";

const ShopProduct = ({ query }: any) => {
  const router = useRouter();

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 });

  const columns = useMemo(
    () => [
      {
        accessorKey: "image",
        header: "Hình ảnh",
        maxSize: 42,
        Cell: ({ row }: any) => <BlockImage src={row?.original?.image_urls[0]} className="w-[42px] h-[34px] !rounded-[4px]" />,
      },
      {
        accessorKey: "name",
        header: "Tên sản phẩm",
        minSize: 250,
        Cell: ({ row }: any) => <p style={{ minWidth: 250, overflow: "hidden", whiteSpace: "break-spaces" }}>{row?.original?.name}</p>,
      },
      {
        accessorKey: "id",
        header: "Phân loại hàng",
        Cell: ({ row }: any) => {
          const result: Record<string, string[]> = (row?.original?.product_variants ?? []).reduce((r: any, a: any) => {
            r[a.group] = r[a.group] || [];
            r[a.group].push(a.name);
            return r;
          }, Object.create(null));

          const productNameVariantsMapping: string[][] = mappingMultiArrayString(result);

          return (
            <>
              {productNameVariantsMapping.map((inArrStr) => (
                <p>{inArrStr.join(", ")};</p>
              ))}
            </>
          );
        },
      },
      {
        accessorKey: "price",
        header: "Giá sản phẩm",
        Cell: ({ row }: any) => {
          const result: Record<string, string[]> = (row?.original?.product_variants ?? []).reduce((r: any, a: any) => {
            r[a.group] = r[a.group] || [];
            r[a.group].push(a.id);
            return r;
          }, Object.create(null));

          const productIdVariantsMapping: string[][] = mappingMultiArrayString(result);

          return sortBy(row?.original?.product_prices, ["id"]).map((priceObj: any) => {
            const idx = productIdVariantsMapping.findIndex((ids) => isEqual(priceObj?.product_variant_ids?.sort(), ids?.sort()));
            return <>{idx > -1 ? <p>{formatCurrencyVN(idx > -1 ? priceObj.price : 0, "vnd")}</p> : ""}</>;
          });
        },
      },
      {
        accessorKey: "stock",
        header: "Kho hàng",
        Cell: ({ row }: any) => {
          const result: Record<string, string[]> = (row?.original?.product_variants ?? []).reduce((r: any, a: any) => {
            r[a.group] = r[a.group] || [];
            r[a.group].push(a.id);
            return r;
          }, Object.create(null));

          const productIdVariantsMapping: string[][] = mappingMultiArrayString(result);

          return sortBy(row?.original?.product_prices, ["id"]).map((priceObj: any) => {
            const idx = productIdVariantsMapping.findIndex((ids) => isEqual(priceObj?.product_variant_ids?.sort(), ids?.sort()));
            return <>{idx > -1 ? <p>{formatCurrencyVN(idx > -1 ? priceObj.stock : 0, "vnd")}</p> : ""}</>;
          });
        },
      },
      {
        accessorKey: "sold",
        header: "Đã bán",
      },
      {
        accessorKey: "like",
        header: "Thích",
      },
      {
        accessorKey: "view",
        header: "Lượt xem",
      },
    ],
    [],
  );

  const rowActions = useCallback(
    ({ row }: any) => [
      {
        name: `${row.visible ? "Ẩn" : "Hiện"}`,
        icon: "/assets/images/row-actions/outline-eye.svg",
        type: "NO_CALLAPI_REFETCH",
        // action: () => {
        //   mutate({ data: { visible: !row.visible }, productId: row.id });
        // },
      },
      {
        name: "Chỉnh sửa",
        icon: "/assets/images/row-actions/outline-edit.svg",
        type: "NO-CALLAPI",
        action: () => {
          router.push(`/shop/${query?.shopId}/product/${row?.id}/update`);
        },
      },
      { name: "Giá và tồn kho", icon: "/assets/images/row-actions/outline-money.svg", action: () => console.log("aa") },
      {
        name: "Sao chép",
        icon: "/assets/images/row-actions/outline-copy-success.svg",
        type: "NO-CALLAPI",
        // action: () => {
        //   postMutation({ productId: row.id });
        // },
      },
      {
        name: "Chọn ưu tiên",
        type: "NO-CALLAPI",
        icon: "/assets/images/row-actions/outline-sidebar-top.svg",
        action: () => {},
      },
      {
        name: "Xoá",
        className: "text-[#E84E49]",
        type: "NO-CALLAPI",
        icon: "/assets/images/row-actions/trash.svg",
        // action: () => {
        //   setIdProduct(row.id);
        //   setOpen(true);
        // },
      },
    ],
    [],
  );

  return (
    <Container>
      <Grid>
        <Grid.Col span={12} order={1}>
          <div className="mt-10 text-[28px] font-[600] text-[#000] leading-[150%] mb-[8px] ">{`Sản phẩm của tôi (${
            dataProduct?.data?.items?.length || 0
          })`}</div>
        </Grid.Col>
      </Grid>
      <MantineTable
        manualPagination={true}
        rowCount={dataProduct?.data?.items?.length}
        pagination={pagination}
        data={dataProduct?.data?.items}
        columns={columns}
        // isFetching={isFetching}
        // isLoading={isLoading}
        // onPaginationChange={setPagination}
        renderRowActions={({ row }: any) => {
          const actions = rowActions({ row: row.original });
          return (
            <MoreAction
              actions={actions}
              // refetch={refetch}
              // onAction={({ name, path, action, type }: any) => handleOnAction({ row: row.original, name, path, action, type })}
            />
          );
        }}
        enableRowSelection={true}
        // onRowSelectionChange={setRowSelection}
        // state={{ rowSelection: rowSelection }}
        enableRowNumbers={true}
        rowNumberMode="original"
        // renderEmptyRowsFallback={renderEmptyRows}
      />
    </Container>
  );
};

ShopProduct.getInitialProps = ({ query }: any) => {
  return { query };
};

export default ShopProduct;
