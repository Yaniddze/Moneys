import React, { FC } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Nav } from './types';

type PropTypes = {
  children?: never;
  navs: Nav[];
}

const Selected = styled.div`
  color: ${(props): string => props.theme.colors.primary.contrast};
`;

const NotSelected = styled.div`
  color: ${(props): string => props.theme.colors.secondary.contrast};
`;

export const Navbar: FC<PropTypes> = (
  { navs }: PropTypes,
) => {
  const location = useLocation();

  const navsToShow = navs.map((nav) => {
    if (nav.path === location.pathname) {
      return (
        <Selected key={nav.path}>
          { nav.title }
        </Selected>
      );
    }

    return (
      <NotSelected key={nav.path}>
        <Link to={nav.path}>
          { nav.title }
        </Link>
      </NotSelected>
    );
  });

  return (
    <div>
      { navsToShow }
    </div>
  );
};
