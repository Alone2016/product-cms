import { FC, ReactNode } from "react";
import styled from "styled-components";

interface IProps {
  children: ReactNode;
  classNames?: string;
}

const ContainerStyled = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding-right: 16px;
  padding-left: 16px;
`;

const Container: FC<IProps> = ({ children, classNames }) => {

  return <ContainerStyled className={classNames ?? ''}>{children}</ContainerStyled>;
};


export default Container;


const ContainerCartStyled = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding-right: 16px;
  padding-left: 16px;
`;

export const ContainerCart: FC<IProps> = ({ children, classNames }) => {

  return <ContainerCartStyled className={classNames ?? ''}>{children}</ContainerCartStyled>;
};