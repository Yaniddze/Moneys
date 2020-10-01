// Core
import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

// Hooks
import { useScreens } from '../../../hooks/useScreens';
import { Screens } from '../../../hooks/useScreens/types';

// Wrappers
import { MobileWrapper } from './MobileWrapper';
import { TableWrapper } from './TabletWrapper';
import { PcWrapper } from './PcWrapper';

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
  const screen = useScreens();
  let Wrapper: FC = () => (<div />);

  switch (screen) {
    case Screens.PC:
      Wrapper = PcWrapper;
      break;
    case Screens.Mobile:
      Wrapper = MobileWrapper;
      break;
    case Screens.Tablet:
      Wrapper = TableWrapper;
      break;
    default:
      // eslint-disable-next-line no-case-declarations,@typescript-eslint/no-unused-vars
      const x: never = screen;
  }

  const pageNavs = navs.map((nav) => (
    <div key={nav.path}>
      <Link to={nav.path}>
        { nav.content }
      </Link>
    </div>
  ));

  return (
    <Wrapper>
      <nav>
        { pageNavs }
      </nav>
    </Wrapper>
  );
};
