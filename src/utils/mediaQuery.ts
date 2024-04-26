import { useMediaQuery } from 'react-responsive';
import { FC } from 'react';

export const useMediaQueries = () => {
  const isMediaQueryXl= useMediaQuery({
    query: '(min-width: 1280px)',
  })
  const isMediaQueryLg = useMediaQuery({
    query: '(min-width: 1024px)',
  });
  const isMediaQueryMd = useMediaQuery({
    query: '(min-width: 768px)',
  });
  const isMediaQuerySm = useMediaQuery({
    query: '(min-width: 640px)',
  });

  return {
    isMediaQueryXl,
    isMediaQueryLg,
    isMediaQueryMd,
    isMediaQuerySm
  }
}

interface IMediaProps {
  children: any;
}

export const Desktop: FC<IMediaProps> = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1280 })
  return isDesktop ? children : null
}
export const Tablet: FC<IMediaProps> = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1279 })
  return isTablet ? children : null
}
export const Mobile: FC<IMediaProps> = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 639 })
  return isMobile ? children : null
}
export const Default: FC<IMediaProps> = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 639 })
  return isNotMobile ? children : null
}