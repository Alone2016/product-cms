import Meta from "@/componentsV3/Meta";
import DefaultLayout from "@/layouts/DefaultLayout";
import NewDefaultLayout from "@/layouts/NewDefaultLayout";

import { SourcingService } from "@/containers/home/NewSections";

import ArobidEvent from "@/containers/home/NewSections/ArobidEvent";
import Banner from "@/containers/home/NewSections/Banner";
import Exhibitions from "@/containers/home/NewSections/Exhibitions";
import { MarketNews } from "@/containers/home/NewSections/MarketNews";
import NewProducts from "@/containers/home/NewSections/NewProducts";
import OnlineEvents from "@/containers/home/NewSections/OnlineEvents";
import RecommendEnterprise from "@/containers/home/NewSections/RecommendEnterprise";
import RecommendSuppliers from "@/containers/home/NewSections/RecommendSuppliers";
import References from "@/containers/home/NewSections/References";
import RequestSuppliers from "@/containers/home/NewSections/RequestSuppliers";
import Sale from "@/containers/home/NewSections/Sale";
import ServiceProviders from "@/containers/home/NewSections/ServiceProviders";
import Spotlight from "@/containers/home/NewSections/Spotlight";
import { Subscribe } from "@/containers/home/NewSections/Subscribe";
import { SupplierCountries } from "@/containers/home/NewSections/SupplierCountries";
import TraditionalVillages from "@/containers/home/NewSections/TraditionalVillages";
import TraditionalVillagesBusiness from "@/containers/home/NewSections/TraditionalVillagesBusiness";
import TypifySuppliers from "@/containers/home/NewSections/TypifySuppliers";
import Villages from "@/containers/home/NewSections/Villages";
import ExhibitionsBusiness from "@/containers/home/NewSections/business/ExhibitionsBusiness";
import SupplierWeek from "@/containers/home/NewSections/business/SupplierWeek";
import {
  BannerBusiness,
  BannerProduct,
  Communication,
  Dedication,
  DownLoad,
  Event,
  FilterBusiness,
  MemberRank,
  Partner,
  PromotionalAdvertising,
  RFQ,
  Recommend,
  SamplingBusiness,
  Service,
  TogetherWholesale,
  TopProduct,
  TraditionalVillage,
  TrendProduct,
} from "@/containers/home/Sections";
import Demands from "@/containers/home/NewSections/business/Demands";
import SpotlightBusiness from "@/containers/home/NewSections/business/SpotlightBusiness";
import { useQuery } from "@tanstack/react-query";
import { getAdBanner, getListSuppliers, getRecomendSuppliers } from "@/services/ConfigServices";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import PageDevelopingModal from "@/componentsV3/PageDevelopingModal";
import { isEnableB2C } from "@/utils/common";
import { getCategoryList } from "@/services/CategoryService";
import { useAuth } from "@/libs/Auth";

const Home = ({ query }: any) => {
  const [opened, { open, close }] = useDisclosure(false);

  const activeBusinessTab = query.type === "business";
  const activeOldLayout = query.layout === "old";
  const videos = ["/assets/images/new-layout/new-product.mp4", "/assets/images/new-layout/exhibition.mp4"];

  const { user } = useAuth();
  const { data: banner } = useQuery({
    queryKey: ["get_ad_banner"],
    queryFn: () => getAdBanner(),
    select: (data) => data,
  });

  const [suppliers, setSuppliers] = useState<any>([]);

  useEffect(() => {
    const getSuppliers = async () => {
      if (0 === suppliers.length) {
        setSuppliers(await getRecomendSuppliers());
      }
    };

    getSuppliers();
  }, []);

  const getProductCategoriesResponse = useQuery(["home-categories", "business"], () =>
    getCategoryList({
      params: {
        pinned: true,
        per_page: 11,
        type: "product",
        deep: true,
      },
    }),
  );

  const getServiceCategoriesResponse = useQuery(["home-categories", "business"], () =>
    getCategoryList({
      params: {
        pinned: true,
        per_page: 11,
        type: "service",
        deep: true,
      },
    }),
  );

  const getBannerImg = (banner: any) => {

    if (banner?.length > 0) {
      return banner[0]?.button?.image_url || null;
    }

    return null;
  }

  return (
    <>
      {!activeOldLayout ? (
        activeBusinessTab ? (
          <NewDefaultLayout enableStickyCategory enableLightMode meta={<Meta title="Arobid" description="Arobid" />}>
            <Banner banner={banner} openModal={open} type={"product"} />
            <RecommendEnterprise /> 
            <TypifySuppliers />
            <img src={getBannerImg(banner?.advertisement_banners_5) || "/assets/images/new-layout/supplier-week-banner.jpg"} className="w-full" />
            <SupplierWeek getCategoriesResponse={getProductCategoriesResponse} />
            <SpotlightBusiness />
            <RequestSuppliers showHeader />
            {user?.email && <Demands getCategoriesResponse={getProductCategoriesResponse}/>}
            <ServiceProviders suppliers={suppliers} image="/assets/images/new-layout/service_provider-2.jpg" />
            <TraditionalVillagesBusiness getProductCategoriesResponse={getProductCategoriesResponse} />
            {/**<ExhibitionsBusiness video={{ src: videos[1] }} /> 
            <OnlineEvents />
            */}
            <ArobidEvent banner="/assets/images/new-layout/award-business.jpg" />
            <SourcingService />
            {/* <MarketNews banner={banner} /> */}
            <SupplierCountries />
            <Subscribe />
            <References />
          </NewDefaultLayout>
        ) : (
          <>
            <NewDefaultLayout enableStickyCategory enableLightMode meta={<Meta title="Arobid" description="Arobid" />}>
              <Banner banner={banner} openModal={open} type={"service"} />
              <RecommendEnterprise />
              <Spotlight />
              <NewProducts video={{ src: videos[0] }} />
              <ServiceProviders suppliers={suppliers} image="/assets/images/new-layout/service-provider.jpg" />
              {/* <Sale banner={banner} openModal={open} /> */}
              <TraditionalVillages />
              <Villages getProductCategoriesResponse={getProductCategoriesResponse} />
              <RecommendSuppliers />
              <RequestSuppliers />
              <ArobidEvent banner="/assets/images/new-layout/award.jpg" />
              {/**<Exhibitions video={{ src: videos[1] }} banner={banner} />
              <OnlineEvents />
              */}
              <SourcingService />
              {/* <MarketNews banner={banner} openModal={open} /> */}
              <SupplierCountries />
              <Subscribe />
              <References />
            </NewDefaultLayout>
          </>
        )
      ) : (
        <>
          <DefaultLayout enableStickyCategory enableLightMode meta={<Meta title="Arobid" description="Arobid" />}>
            {activeBusinessTab ? (
              <>
                <BannerBusiness />
                <SamplingBusiness />
                <TraditionalVillage />
                <Service />
                <MemberRank />
                <Event />
                <TrendProduct />
                <FilterBusiness />
              </>
            ) : (
              <>
                <BannerProduct />
                <TopProduct />
                <Communication />
                <TraditionalVillage />
                <Dedication />
                <RFQ />
                <Recommend />
                <PromotionalAdvertising />
                <TogetherWholesale />
                <Event />
              </>
            )}
            <DownLoad />
            <Partner />
          </DefaultLayout>
        </>
      )}
      {/* Add modal function is developping */}
      <PageDevelopingModal open={opened} setOpen={close} />
    </>
  );
};

Home.getInitialProps = ({ query }: any) => {
  return { query };
};

export default Home;
