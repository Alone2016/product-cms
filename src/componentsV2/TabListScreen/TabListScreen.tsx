import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { IconPlus } from "@tabler/icons-react";
import { Grid, Flex, Text, Title, MantineProvider, Checkbox, Menu, Group } from "@mantine/core";
import { useForm } from "@/componentsV3/FormBuilder";
import { useIsFetching } from "@/libs/ReactQuery";
import Button from "@/componentsV3/Button";
import { useParams } from "@/hooks/useParams";
import { useAuth } from "@/libs/Auth";
import { ListScreenCardStyled } from "./Styled";
import Content from "./Content";
import Tabs from "./Tabs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "@/services/ProductService";
import FilterBlock from "@/componentsV3/FilterBlock";
import AutoCompleteSearchInput from "../AutoCompleteSearchInput";
import AroCOLLABProduct from "@/icons/AroCOLLABProduct";
import RegularProduct from "@/icons/RegularProduct";
import { PlusIcon } from "@/icons/Plus";

export const TabList = forwardRef((props: any, ref) => {
  const {
    variant,
    title,
    createdPath,
    createdAroCollabPath,
    initialParams,
    columns,
    fetchProps,
    rowActions,
    tabs,
    createdButtonText,
    mockData = {},
    setDataInStock,
    setDataOutOfStock,
    setDataHide,
    createdServiceProductPath,
  } = props;
  const router = useRouter();

  const { user } = useAuth();

  const [shopUuid] = useState(user?.shops[0]?.uuid);
  const [promotionId] = useState(router?.query?.promotionId);
  const [fetchQueryKey] = useState("tabListScreen");
  const [mergeInitialAllParams] = useState(() => ({ ...initialParams }));
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 });
  const refBody: any = useRef();
  const isFetching = useIsFetching({ queryKey: [fetchProps?.queryKeyAction || fetchQueryKey] });

  const [params, setParams]: any = useParams({ initialValues: mergeInitialAllParams });
  const form = useForm({
    initialValues: {
      certification: "",
      material: "",
      category: "",
    },
  });

  const mergeParams = useMemo(() => ({ ...params, per_page: pagination?.pageSize, page: pagination?.pageIndex + 1 }), [params, pagination, form.values]);

  const { data: dataCategory } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategories(),
    select: (data) =>
      data?.data?.data?.items?.map((item: any) => {
        return { label: item.name, key: item.id };
      }),
  });

  const {
    data: dataStocking,
    isLoading: loadStock,
    refetch: refetchStock,
  } = fetchProps?.action({
    key: fetchQueryKey,
    params: { ...mergeParams, ...form.values, out_of_stock: false },
    select: (data: any) => data?.data?.data,
  });

  const {
    data: dataOutOfStock,
    isLoading,
    refetch,
  } = fetchProps?.action({
    key: fetchQueryKey,
    params: { ...mergeParams, ...form.values, out_of_stock: true },
    select: (data: any) => data?.data?.data,
  });

  const {
    data: dataHideStock,
    isLoading: hideLoad,
    refetch: refetchHide,
  } = fetchProps?.action({
    key: fetchQueryKey,
    params: { ...mergeParams, ...form.values, visible: false },
    select: (data: any) => data?.data?.data,
  });

  useImperativeHandle(ref, () => ({
    getAllRefetch() {
      refetch();
      refetchStock();
      refetchHide();
    },
  }));

  useEffect(() => {
    setDataInStock(dataStocking?.items);
    setDataOutOfStock(dataOutOfStock?.items);
    setDataHide(dataHideStock?.items);
  }, [dataOutOfStock, dataStocking, dataHideStock]);

  const filters: any = useMemo(
    () => [
      {
        name: "category",
        enableClearAll: false,
        enableMultiSelect: false,
        placeholder: "Danh mục sản phẩm",
        options: dataCategory,
      },
      {
        name: "material",
        enableClearAll: false,
        placeholder: "Chất liệu",
        options: [
          { label: "Đồng", key: "Đồng" },
          { label: "Gỗ ", key: "Gỗ " },
          { label: "Sắt", key: "Sắt" },
          { label: "Nhựa", key: "Nhựa" },
          { label: "Nhôm", key: "Nhôm" },
        ],
      },
      {
        name: "certification",
        placeholder: "Chứng nhận sản phẩm",
        enableClearAll: false,
        enableMultiSelect: false,
        options: [
          { label: "ROSH", key: "ROSH" },
          { label: "CE", key: "CE" },
          { label: "FCC", key: "FCC" },
          { label: "MSDS", key: "MSDS" },
          { label: "UN38.3", key: "UN38.3" },
        ],
      },
    ],
    [],
  );

  const filtersBusiness: any = useMemo(
    () => [
      {
        name: "category",
        enableClearAll: false,
        enableMultiSelect: false,
        placeholder: "Tất cả sản phẩm",
        options: dataCategory,
      },
      {
        name: "category",
        enableClearAll: false,
        enableMultiSelect: false,
        placeholder: "Danh mục sản phẩm",
        options: dataCategory,
      },
      {
        name: "material",
        enableClearAll: false,
        placeholder: "Chất liệu",
        options: [
          { label: "Đồng", key: "Đồng" },
          { label: "Gỗ ", key: "Gỗ " },
          { label: "Sắt", key: "Sắt" },
          { label: "Nhựa", key: "Nhựa" },
          { label: "Nhôm", key: "Nhôm" },
        ],
      },
      {
        name: "certification",
        placeholder: "Chứng nhận sản phẩm",
        enableClearAll: false,
        enableMultiSelect: false,
        options: [
          { label: "ROSH", key: "ROSH" },
          { label: "CE", key: "CE" },
          { label: "FCC", key: "FCC" },
          { label: "MSDS", key: "MSDS" },
          { label: "UN38.3", key: "UN38.3" },
        ],
      },
    ],
    [],
  );

  const createProductBusinessOptions: any = useMemo(
    () => [
      // {
      //   leftIcon: <AroCOLLABProduct />,
      //   name: "AroCOLLABProduct",
      //   title: "Tạo sản phẩm AroCOLLAB",
      //   content:
      //     "AroCOLLAB là tất cả các sản phẩm (hàng hóa hoặc dịch vụ) mà Nhà Bán tạo riêng trong gian hàng của mình nhằm tối ưu quyền lợi cho Nhà Mua trên sàn.",
      //   rightIcon: <PlusIcon className="w-[20px] h-[20px]" />,
      // },
      {
        leftIcon: <RegularProduct />,
        name: "AroCOLLABProduct",
        title: "Tạo sản phẩm thông thường",
        content: "Có thể áp dụng voucher này cho một số sản phẩm nhất định trong Shop của bạn",
        rightIcon: <PlusIcon className="w-[20px] h-[20px]" />,
      },
    ],
    [],
  );

  const textSelectFilterRender = useCallback(({ value }: any) => {
    const valueLength = value?.length;
    if (valueLength === 0) return "";
    if (valueLength === 1) return value[0];
    return `${value[0]}, +${valueLength - 1}`;
  }, []);

  const dataProduct = () => {
    if (params?.tab === "inStock") {
      return dataStocking?.items;
    } else if (params?.tab === "stock") {
      return dataOutOfStock?.items;
    } else {
      return dataHideStock?.items;
    }
  };

  const refetchAPI = () => {
    if (params?.tab === "inStock") {
      return refetch();
    } else if (params?.tab === "stock") {
      return refetchStock();
    } else {
      return refetchHide();
    }
  };

  return (
    <ListScreenCardStyled shadow="sm" padding="lg" radius="md" withBorder>
      <Grid>
        <Grid.Col span={12} order={1}>
          <div className="text-[28px] font-[600] text-[#000] leading-[150%] mb-[8px] ">{title}</div>
        </Grid.Col>
        <Grid.Col span={12} order={2}>
          <AutoCompleteSearchInput className="w-full" onSearch={(value: any) => setParams({ query: value })} placeholder="Tìm kiếm Sản phẩm" />
        </Grid.Col>
        <Grid.Col span={12} order={variant === "business" ? 4 : 3}>
          <Tabs tabs={tabs} setParams={setParams} tab={params.tab || tabs[0].value} />
        </Grid.Col>
        <Grid.Col span={12} order={variant === "business" ? 3 : 4}>
          <div className="flex justify-between gap-2">
            <FilterBlock
              className="flex flex-1 !gap-2"
              items={variant === "business" ? filtersBusiness : filters}
              defaultActives={{ material: true, certification: true, category: true }}
              enableShowDeleteAll={false}
              enableShowSelectActives={false}
              itemRenderText={textSelectFilterRender}
              itemTargetClassName={`!bg-white !border !border-solid !border-neutral-300 ${
                variant === "business" ? "!px-1 rounded-3xl" : "!px-4"
              } !py-2 !text-neutral-800`}
              itemActiveTargetClassName="!bg-main-100 !border !border-solid !border-main-200 !px-4 !py-2 !text-main-600"
              menuActiveDropdownClassName="text-main-600"
            />
            {/* {variant !== "business" && (
              <span style={{ position: "relative", right: "0", zIndex: "101" }}>
                <Flex gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap">
                  {createdPath && (
                    <Button className="bg-main-600" size="md" onClick={() => router.push(createdPath)} leftIcon={<IconPlus size={14} />}>
                      {createdButtonText}
                    </Button>
                  )}
                </Flex>
              </span>
            )} */}
            {true && (
              <div style={{ position: "relative", zIndex: 30 }}>
                <Menu width={375} shadow="md" position="bottom-end">
                  <Menu.Target>
                    <Button position="relative" className="bg-main-600" size="md" leftIcon={<IconPlus size={14} />}>
                      {createdButtonText}
                    </Button>
                  </Menu.Target>

                  <Menu.Dropdown style={{ transform: "translate(-52%, 50px)" }}>
                    {/* <Menu.Item>
                      <Group>
                        <AroCOLLABProduct />
                        <div style={{ flex: 1 }} onClick={() => router.push(createdAroCollabPath)}>
                          <Text size="sm" fw={500}>
                            Tạo sản phẩm AroCOLLAB
                          </Text>
                          <Text>
                            AroCOLLAB là tất cả các sản phẩm (hàng hóa hoặc dịch vụ) mà Nhà Bán tạo riêng trong gian hàng của mình nhằm tối ưu quyền lợi cho Nhà
                            Mua trên sàn.
                          </Text>
                        </div>
                        <PlusIcon className="w-[20px] h-[20px]" />
                      </Group>
                    </Menu.Item> */}
                    <Menu.Item>
                      <Group>
                        <RegularProduct />
                        <div style={{ flex: 1 }} onClick={() => router.push(createdPath)}>
                          <Text size="sm" fw={500}>
                            Tạo sản phẩm thông thường
                          </Text>
                          <Text>Có thể áp dụng voucher này cho một số sản phẩm nhất định trong Shop của bạn</Text>
                        </div>
                        <PlusIcon className="w-[20px] h-[20px]" />
                      </Group>
                    </Menu.Item>
                    {/* <Menu.Item>
                      <Group>
                        <RegularProduct />
                        <div style={{ flex: 1 }} onClick={() => router.push(createdServiceProductPath)}>
                          <Text size="sm" fw={500}>
                            Tạo sản phẩm dịch vụ
                          </Text>
                          <Text>Tạo nhanh sản phẩm cho gian hàng của bạn</Text>
                        </div>
                        <PlusIcon className="w-[20px] h-[20px]" />
                      </Group>
                    </Menu.Item> */}
                    {createProductBusinessOptions.map((option: any, index: number) => {
                      <Menu.Item key={index}>
                        <Group>
                          <AroCOLLABProduct />
                          <div style={{ flex: 1 }}>
                            <Text size="sm" fw={500}>
                              {option.title}
                            </Text>
                            <Text>{option.content}</Text>
                          </div>
                          <PlusIcon className="w-[20px] h-[20px]" />
                        </Group>
                      </Menu.Item>;
                    })}
                  </Menu.Dropdown>
                </Menu>
              </div>
            )}
          </div>
        </Grid.Col>

        <Grid.Col span={12} order={5}>
          <div ref={refBody}>
            {!isEmpty(mockData) ? (
              <Content
                setPagination={setPagination}
                pagination={pagination}
                rowCount={mockData?.total_items || 0}
                columns={columns}
                data={mockData?.items || []}
                isLoading={isLoading || loadStock || hideLoad}
                isFetching={!!isFetching}
                rowActions={rowActions}
                shopUuid={shopUuid}
                refetch={refetchAPI}
                refBody={refBody}
                createdPath={createdPath}
                createdButtonText={createdButtonText}
              />
            ) : (
              <Content
                setPagination={setPagination}
                pagination={pagination}
                rowCount={dataStocking?.total_items || dataOutOfStock?.total_items || dataHideStock?.total_items || 0}
                columns={columns}
                data={
                  dataProduct()
                  // (params?.tab === "inStock" && dataStocking?.items) ||
                  // (params?.tab === "stock" && dataOutOfStock?.items) ||
                  // (params?.tab === "hide" && dataHideStock?.items)
                }
                isLoading={isLoading || loadStock || hideLoad}
                isFetching={!!isFetching}
                rowActions={rowActions}
                shopUuid={shopUuid}
                refetch={refetchAPI}
                refBody={refBody}
                createdPath={createdPath}
                createdButtonText={createdButtonText}
              />
            )}
          </div>
        </Grid.Col>
      </Grid>
    </ListScreenCardStyled>
  );
});

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  description: string;
  selected: boolean;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ label, description, className, selected, ...others }: ItemProps, ref) => {
  return (
    <div
      ref={ref}
      {...others}
      className={`py-[10px] px-[20px] bg-[#fff] hover:bg-main-600 hover:text-white rounded-[4px] cursor-pointer ${selected ? "text-main-700" : ""}`}
    >
      {label}
    </div>
  );
});

interface ItemCheckboxProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  description: string;
  selected: boolean;
  value: string;
}

const CheckBoxItem = forwardRef<HTMLDivElement, ItemCheckboxProps>(({ label, description, className, selected, value, ...others }: ItemCheckboxProps, ref) => {
  return (
    <div ref={ref} {...others} className="py-[4px]">
      <Checkbox
        key={value}
        value={value}
        checked={selected}
        label={label}
        {...others}
        className={`py-[8px] px-[24px]`}
        classNames={{ input: `rounded-[4px]`, label: "text-[14px] font-[500]" }}
      />
    </div>
  );
});

export default TabList;
