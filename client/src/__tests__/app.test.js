import React from 'react';
import { shallow } from 'enzyme';
import App from '../app';
import Loader from '../utils/loader';

describe('<App />', () => {
  const Nav = Loader({
    loader: () => import('./features/nav' /* webpackChunkName: 'Nav' */),
  });
  const NavWrapper = shallow(<Nav />);

  it('renders correctly with Nav on index page', () => {
    const props = {
      history: { location: { pathname: '/' } },
      Nav: NavWrapper,
    };
    const wrapper = shallow(<App {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with Nav on sub pages', () => {
    const props = {
      history: { location: { pathname: '/login' } },
      Nav: NavWrapper,
    };
    const wrapper = shallow(<App {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
