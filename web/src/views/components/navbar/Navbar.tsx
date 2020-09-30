import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

export type Nav = {
  path: string;
  content: ReactElement;
}

type PropTypes = {
  children?: never;
  navs: Nav[];
}

export const Navbar: FC<PropTypes> = (
  { navs }: PropTypes,
) => {
  const pageNavs = navs.map((nav) => {
    return (
      <div key={nav.path}>
        <Link to={nav.path}>
          { nav.content }
        </Link>
      </div>
    );
  });

  return (
    <nav>
      { pageNavs }
    </nav>
  );
};
