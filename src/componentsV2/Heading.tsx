import { FC } from "react";

import toUpper from "lodash/toUpper";

interface IHeadingSubProps {
  children: string;
  className?: string;
}

const HeadingLevel1: FC<IHeadingSubProps> = ({ children, className }) => {
  return <h1 className={`leading-normal font-bold ${className}`}>{children}</h1>;
};

const HeadingLevel2: FC<IHeadingSubProps> = ({ children, className }) => {
  return <h2 className={`leading-normal text-base font-bold ${className}`}>{children}</h2>;
};

const HeadingLevel3: FC<IHeadingSubProps> = ({ children, className }) => {
  return <h3 className={`leading-normal text-sm font-bold ${className}`}>{children}</h3>;
};

const HeadingLevel4: FC<IHeadingSubProps> = ({ children, className }) => {
  return <h4 className={`leading-normal text-xs font-bold ${className}`}>{children}</h4>;
};

interface IProps {
  children: string;
  uppercase?: boolean;
  className?: string;
  level?: 1 | 2 | 3 | 4;
}

const Heading: FC<IProps> = (props) => {
  const { children, uppercase, level = 4, className = "" } = props;

  let newChildren = uppercase ? toUpper(children) : children;

  if (level === 1) return <HeadingLevel1 className={className}>{newChildren}</HeadingLevel1>;

  if (level === 2) return <HeadingLevel2 className={className}>{newChildren}</HeadingLevel2>;

  if (level === 3) return <HeadingLevel3 className={className}>{newChildren}</HeadingLevel3>;

  if (level === 4) return <HeadingLevel4 className={className}>{newChildren}</HeadingLevel4>;

  return null;
};

export default Heading;
