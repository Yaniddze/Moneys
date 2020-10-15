import { FC } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Nav } from './types';

type PropTypes = {
  children?: never;
  navs: Nav[];
}

const StyledLink = styled.a`
  text-decoration: none;
`;

const Selected = styled.div`
  color: ${(props): string => props.theme.colors.primary.contrast};
`;

const NotSelected = styled.div`
  & * {
    text-decoration: none;
    color: ${(props): string => props.theme.colors.secondary.contrast};
  }
`;

export const Navbar: FC<PropTypes> = (
  { navs }: PropTypes,
) => {
  const location = useRouter();

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
        <Link href={nav.path}>
          <StyledLink>
            { nav.title }
          </StyledLink>
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
