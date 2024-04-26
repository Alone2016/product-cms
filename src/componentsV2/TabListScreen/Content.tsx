import React, { memo, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { IconPlus } from "@tabler/icons-react";
import MantineTable from "@/componentsV2/MantineTable";
import Modal from "@/componentsV3/Modal";
import MoreAction from "@/componentsV3/MoreAction";
import Button from "@/componentsV3/Button";
import { showMessageSuccess } from "@/utils/toast";
import { MRT_RowSelectionState } from "mantine-react-table";
import { Box } from "@mantine/core";

export default memo(
  ({
    data,
    rowCount,
    columns,
    pagination,
    isFetching,
    isLoading,
    setPagination,
    rowActions,
    onAction,
    shopUuid,
    refetch,
    refBody,
    createdPath,
    createdButtonText,
  }: any) => {
    const router = useRouter();
    const [isOpenRemoveModal, setIsOpenRemoveModal] = useState<boolean>(false);
    const [isReactive, setIsReactive] = useState<boolean>(false);
    const handleOnAction = useCallback(async ({ name, row, path, action, type }: any) => {
      if (type === "NO-CALLAPI") {
        // await action({ shopUuid, promotionId: row?.id }).then(() => {
        //   showMessageSuccess({ content: "Xoá mã khuyến mãi thành công!" });
        //   refetch();
        // });
        action();
      } else if (name === "REACTIVE") {
        setIsReactive(true);
      } else if (name === "LAUNCH") {
        await action({
          shopUuid,
          promotionId: row?.id,
          data: {
            shop_id: shopUuid,
            id: row?.id,
          },
        }).then(() => {
          showMessageSuccess({ content: "Launch khuyến mãi thành công!" });
          refetch();
        });
      } else if (type === "NO_CALLAPI_REFETCH") {
        await action();
        refetch();
      } else if (name === "FINISH") {
        await action({
          shopUuid,
          promotionId: row?.id,
          data: {
            shop_id: shopUuid,
            id: row?.id,
          },
        }).then(() => {
          showMessageSuccess({ content: "Launch khuyến mãi thành công!" });
          refetch();
        });
      } else if (path) router.push(path);
      if (onAction) {
        onAction({ row });
      }
    }, []);

    const handleRemove = () => {
      setIsOpenRemoveModal(true);
    };

    const renderEmptyRows = () => {
      return (
        <Box
          component="div"
          sx={{
            maxWidth: `min(100vw, ${refBody?.current?.clientWidth}px)`,
            width: "100%",
            padding: "",
          }}
        >
          <div className="py-[50px]">
            <Box className="flex flex-col justify-center items-center overflow-hidden">
              <span>
                <PackIcon />
              </span>
              <p className="text-neutral-800 text-sm max-w-[200px] text-center mb-[24px]">Gian hàng của bạn chưa có sản phẩm nào</p>
              {createdPath && (
                <Button className="bg-main-600 text-[12px]" size="sm" onClick={() => router.push(createdPath)} leftIcon={<IconPlus size={14} />}>
                  {createdButtonText}
                </Button>
              )}
            </Box>
          </div>
        </Box>
      );
    };

    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    return (
      <>
        <MantineTable
          manualPagination={true}
          rowCount={rowCount}
          pagination={pagination}
          data={data}
          columns={columns}
          isFetching={isFetching}
          isLoading={isLoading}
          onPaginationChange={setPagination}
          renderRowActions={({ row }: any) => {
            const actions = rowActions({ row: row.original });
            return (
              <MoreAction
                actions={actions}
                refetch={refetch}
                onAction={({ name, path, action, type }: any) => handleOnAction({ row: row.original, name, path, action, type })}
              />
            );
          }}
          enableRowSelection={true}
          onRowSelectionChange={setRowSelection}
          state={{ rowSelection: rowSelection }}
          enableRowNumbers={true}
          rowNumberMode="original"
          renderEmptyRowsFallback={renderEmptyRows}
        />

        {/* Remove or reactive */}
        <Modal
          isShow={isOpenRemoveModal}
          onClose={() => setIsOpenRemoveModal(false)}
          title={isReactive ? "Kích hoạt lại mã giảm giá" : "Xóa mã giảm giá"}
          defaultData={{
            title: isReactive ? "Bạn có chắc muốn kích hoạt lại mã giảm giá này không?" : "Bạn có chắc muốn xoá mã giảm giá này không?",
            buttonGroup: [
              {
                text: "HỦY",
                variant: "outline",
                classNames: "min-w-[100px]",
                handleClick: () => setIsOpenRemoveModal(false),
              },
              {
                text: isReactive ? "ĐỒNG Ý" : "XÓA",
                variant: "filled",
                classNames: "bg-main-500 min-w-[100px]",
                handleClick: handleRemove,
              },
            ],
          }}
        />
      </>
    );
  },
);

const PackIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="186" height="136" viewBox="0 0 186 136" fill="none">
      <path
        d="M151.67 58.7265C151.67 71.9542 147.241 84.3837 139.859 94.1904C135.77 99.5499 130.887 104.225 125.209 107.874C116.123 113.918 105.108 117.339 93.4103 117.339C61.2711 117.453 35.1509 91.2256 35.1509 58.7265C35.1509 26.3414 61.1575 0 93.4103 0C105.108 0 116.01 3.42096 125.209 9.46466C130.887 13.1137 135.77 17.789 139.859 23.1485C147.241 33.0693 151.67 45.3847 151.67 58.7265Z"
        fill="#FAFAFC"
      />
      <path
        d="M49.0417 50.8744H48.3384C47.8109 50.8744 47.4592 50.7103 47.4592 50.4641C47.4592 50.2179 47.8109 50.0538 48.3384 50.0538H49.0417C49.5692 50.0538 49.9209 50.2179 49.9209 50.4641C49.9209 50.7103 49.5692 50.8744 49.0417 50.8744Z"
        fill="#2D5887"
      />
      <path
        d="M49.0417 54.1566H48.3384C47.8109 54.1566 47.4592 53.9925 47.4592 53.7463C47.4592 53.5002 47.8109 53.3361 48.3384 53.3361H49.0417C49.5692 53.3361 49.9209 53.5002 49.9209 53.7463C49.9209 53.9925 49.5692 54.1566 49.0417 54.1566Z"
        fill="#2D5887"
      />
      <path
        d="M49.0417 57.4388H48.3384C47.8109 57.4388 47.4592 57.2747 47.4592 57.0286C47.4592 56.7824 47.8109 56.6183 48.3384 56.6183H49.0417C49.5692 56.6183 49.9209 56.7824 49.9209 57.0286C49.9209 57.2747 49.5692 57.4388 49.0417 57.4388Z"
        fill="#2D5887"
      />
      <path
        d="M49.0417 60.7211H48.3384C47.8109 60.7211 47.4592 60.557 47.4592 60.3108C47.4592 60.0646 47.8109 59.9005 48.3384 59.9005H49.0417C49.5692 59.9005 49.9209 60.0646 49.9209 60.3108C49.9209 60.557 49.5692 60.7211 49.0417 60.7211Z"
        fill="#2D5887"
      />
      <path
        d="M81.1411 50.8744H69.5752C69.1063 50.8744 68.7937 50.7103 68.7937 50.4641C68.7937 50.2179 69.1063 50.0538 69.5752 50.0538H81.1411C81.61 50.0538 81.9226 50.2179 81.9226 50.4641C81.9226 50.7103 81.61 50.8744 81.1411 50.8744Z"
        fill="white"
      />
      <path
        d="M105.784 60.7211H69.5486C69.0957 60.7211 68.7937 60.557 68.7937 60.3108C68.7937 60.0646 69.0957 59.9005 69.5486 59.9005H105.784C106.237 59.9005 106.539 60.0646 106.539 60.3108C106.539 60.557 106.237 60.7211 105.784 60.7211Z"
        fill="url(#paint0_linear_1775_339906)"
      />
      <path
        d="M81.1862 54.1566H65.4273C64.9855 54.1566 64.6909 53.9925 64.6909 53.7463C64.6909 53.5002 64.9855 53.3361 65.4273 53.3361H81.1862C81.628 53.3361 81.9226 53.5002 81.9226 53.7463C81.9226 53.9925 81.628 54.1566 81.1862 54.1566Z"
        fill="#2D5887"
      />
      <path
        d="M93.4961 57.4388H65.4257C64.9848 57.4388 64.6909 57.2747 64.6909 57.0286C64.6909 56.7824 64.9848 56.6183 65.4257 56.6183H93.4961C93.937 56.6183 94.2309 56.7824 94.2309 57.0286C94.0839 57.2747 93.79 57.4388 93.4961 57.4388Z"
        fill="#2D5887"
      />
      <path
        d="M105.74 57.4388H95.0299C94.5504 57.4388 94.2307 57.2747 94.2307 57.0286C94.2307 56.7824 94.5504 56.6183 95.0299 56.6183H105.74C106.219 56.6183 106.539 56.7824 106.539 57.0286C106.539 57.2747 106.219 57.4388 105.74 57.4388Z"
        fill="white"
      />
      <path
        d="M112.327 57.4388H108.136C107.67 57.4388 107.36 57.2747 107.36 57.0286C107.36 56.7824 107.67 56.6183 108.136 56.6183H112.327C112.793 56.6183 113.104 56.7824 113.104 57.0286C113.104 57.2747 112.793 57.4388 112.327 57.4388Z"
        fill="url(#paint1_linear_1775_339906)"
      />
      <path d="M22.022 102.569H159.875" stroke="#D6DEE8" strokeWidth="2" strokeMiterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <g filter="url(#filter0_d_1775_339906)">
        <path d="M118.847 50.0538V102.569H44.3935C41.4564 102.569 39.2537 100.209 39.2537 97.4063V50.0538H118.847Z" fill="white" />
      </g>
      <path d="M148.387 50.0538V97.4063C148.387 100.357 145.938 102.569 143.03 102.569H118.847V50.0538H148.387Z" fill="#DAE1ED" />
      <g filter="url(#filter1_d_1775_339906)">
        <path d="M148.387 50.0538V97.4063C148.387 100.357 145.938 102.569 143.03 102.569H118.847V50.0538H148.387Z" fill="#E7EAF4" />
      </g>
      <path d="M67.9731 50.0538L83.6293 25.4371H163.978L147.879 50.0538H67.9731Z" fill="#C5CDDB" />
      <g filter="url(#filter2_d_1775_339906)">
        <path d="M67.9731 50.0538L83.6293 25.4371H163.978L147.879 50.0538H67.9731Z" fill="url(#paint2_linear_1775_339906)" />
      </g>
      <path
        opacity="0.3"
        d="M148.387 50.1976V77.9527H126.848C124.848 77.9527 123.463 76.6584 123.155 74.7889L118.847 50.0538L148.387 50.1976Z"
        fill="url(#paint3_linear_1775_339906)"
      />
      <g filter="url(#filter3_d_1775_339906)">
        <path
          d="M147.768 50.0538H118.847L133.533 72.312C134.582 73.786 136.23 74.6705 137.878 74.6705H160.356C161.854 74.6705 162.903 72.9016 162.004 71.7224L147.768 50.0538Z"
          fill="url(#paint4_linear_1775_339906)"
        />
      </g>
      <g filter="url(#filter4_d_1775_339906)">
        <path d="M118.847 50.0538L103.082 25.4371H22.022L38.3826 50.0538H118.847Z" fill="#E7EAF4" />
      </g>
      <path
        d="M78.9763 80.4143H47.9438C47.2187 80.4143 46.6387 79.8673 46.6387 79.1835C46.6387 78.4997 47.2187 77.9526 47.9438 77.9526H78.9763C79.7014 77.9526 80.2814 78.4997 80.2814 79.1835C80.1364 79.8673 79.7014 80.4143 78.9763 80.4143Z"
        fill="#DAE1ED"
      />
      <path
        d="M78.9763 86.1582H47.9438C47.2187 86.1582 46.6387 85.7935 46.6387 85.3376C46.6387 84.8818 47.2187 84.5171 47.9438 84.5171H78.9763C79.7014 84.5171 80.2814 84.8818 80.2814 85.3376C80.1364 85.7935 79.7014 86.1582 78.9763 86.1582Z"
        fill="#DAE1ED"
      />
      <path
        d="M62.5448 92.7227H47.9642C47.2278 92.7227 46.6387 92.358 46.6387 91.9021C46.6387 91.4462 47.2278 91.0815 47.9642 91.0815H62.5448C63.2812 91.0815 63.8703 91.4462 63.8703 91.9021C63.723 92.358 63.1339 92.7227 62.5448 92.7227Z"
        fill="#DAE1ED"
      />
      <defs>
        <filter
          id="filter0_d_1775_339906"
          x="17.2537"
          y="39.0538"
          width="123.594"
          height="96.5155"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="11" />
          <feGaussianBlur stdDeviation="11" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1775_339906" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1775_339906" result="shape" />
        </filter>
        <filter id="filter1_d_1775_339906" x="96.8474" y="39.0538" width="73.54" height="96.5155" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="11" />
          <feGaussianBlur stdDeviation="11" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1775_339906" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1775_339906" result="shape" />
        </filter>
        <filter
          id="filter2_d_1775_339906"
          x="45.9731"
          y="14.4371"
          width="140.005"
          height="68.6167"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="11" />
          <feGaussianBlur stdDeviation="11" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1775_339906" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1775_339906" result="shape" />
        </filter>
        <filter
          id="filter3_d_1775_339906"
          x="96.8474"
          y="39.0538"
          width="87.4895"
          height="68.6167"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="11" />
          <feGaussianBlur stdDeviation="11" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1775_339906" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1775_339906" result="shape" />
        </filter>
        <filter
          id="filter4_d_1775_339906"
          x="0.0219727"
          y="14.4371"
          width="140.825"
          height="68.6167"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="11" />
          <feGaussianBlur stdDeviation="11" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1775_339906" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1775_339906" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_1775_339906" x1="68.9633" y1="60.3274" x2="106.583" y2="60.3274" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF66A9" />
          <stop offset="1" stopColor="#F53689" />
        </linearGradient>
        <linearGradient id="paint1_linear_1775_339906" x1="107.398" y1="57.0035" x2="113.102" y2="57.0035" gradientUnits="userSpaceOnUse">
          <stop stopColor="#83A6FF" />
          <stop offset="1" stopColor="#5A78FF" />
        </linearGradient>
        <linearGradient id="paint2_linear_1775_339906" x1="115.944" y1="24.8677" x2="115.944" y2="50.3192" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDFEFF" />
          <stop offset="0.9964" stopColor="#ECF0F5" />
        </linearGradient>
        <linearGradient id="paint3_linear_1775_339906" x1="133.624" y1="78.5253" x2="133.624" y2="53.1128" gradientUnits="userSpaceOnUse">
          <stop offset="0.00289017" stopColor="#606673" stop-opacity="0" />
          <stop offset="1" stopColor="#AAB2C5" />
        </linearGradient>
        <linearGradient id="paint4_linear_1775_339906" x1="140.578" y1="49.4844" x2="140.578" y2="74.9359" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDFEFF" />
          <stop offset="0.9964" stopColor="#ECF0F5" />
        </linearGradient>
      </defs>
    </svg>
  );
};
