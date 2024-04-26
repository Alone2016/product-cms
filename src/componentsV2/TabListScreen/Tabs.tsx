import { Fragment } from "react";
import TabsComponent from "@/componentsV3/Tabs";
import map from "lodash/map";

const Tabs = ({ tab, tabs, setParams }: any) => {
  return (
    <TabsComponent defaultValue={tab} onTabChange={(value: string) => setParams({ tab: value })}>
      <TabsComponent.List position="left">
        {map(tabs, (item, index: number) => (
          <Fragment key={index}>
            <TabsComponent.Tab value={item.value} style={{ padding: "16px 20px" }}>
              <span className={`text-[14px] font-[500] ${tab === item.value ? "text-[#ED6203]" : "text-[#38383D]"}`}>
                {`${item.label}`}
              </span>
            </TabsComponent.Tab>
          </Fragment>
        ))}
      </TabsComponent.List>
    </TabsComponent>
  );
};

export default Tabs;
