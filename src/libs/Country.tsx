import { INDOFlag, MAYFlag, PHIFlag, SAUDIFlag, SINIFlag, UAEFlag, VNFlag } from "@/icons/country";

export enum Country {
  VN = "VN",
  UAE = "UAE",
  INDO = "INDO",
  MAY = "MAY",
  PHI = "PHI",
  SAUDI = "SAUDI",
  SIN = "SIN",
}

const mapping = {
  [Country.VN]: (width: string = '14', height: string = '14') => <VNFlag width={width} height={height} />,
  [Country.UAE]: (width: string = '14', height: string = '14') => <UAEFlag width={width} height={height} />,
  [Country.INDO]: (width: string = '14', height: string = '14') => <INDOFlag width={width} height={height} />,
  [Country.MAY]: (width: string = '14', height: string = '14') => <MAYFlag width={width} height={height} />,
  [Country.PHI]: (width: string = '14', height: string = '14') => <PHIFlag width={width} height={height} />,
  [Country.SAUDI]: (width: string = '14', height: string = '14') => <SAUDIFlag width={width} height={height} />,
  [Country.SIN]: (width: string = '14', height: string = '14') => <SINIFlag width={width} height={height} />,
};

export const countryIconBuilder = (key: string) => {
  const findEnumKey = Object.keys(mapping).find((k) => k.toString() === key);
  return findEnumKey ? mapping[findEnumKey as Country]() : <></>;
};
