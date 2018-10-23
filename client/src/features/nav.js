import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
/* --- Components --- */
import * as data from '../shared/data';
import Ul from '../shared/ul';
import Buttons from '../shared/buttons';
/* --- Actions --- */
import { startLogout } from './auth/login.action';

// Preload Nav Component on mouseover Login button when on Homepage
// Use State to keep track of routes.
class Nav extends Component {
  constructor() {
    super();
    this.handleUserLogout = this.handleUserLogout.bind(this);
  }

  handleUserLogout = ev => {
    ev.preventDefault();
    this.props.startLogout();
  };

  render() {
    const isHomepage = this.props.history.location.pathname === '/';
    return (
      <div className="nav">
        <div className="flex justify-between nav--top">
          <a
            className="contact mh-auto pa1 f-mini b td-none br white"
            href="tel:+82-54-745-0999"
          >
            상담전화&#8201;
            <span>&#8201;&#40;054&#41; 745&#8201;&#45;&#8201;0999</span>
          </a>
          <Link className="login-btn td-none c-text br f-mini" to="/login">
            로그인
          </Link>
          {/* <Buttons
            handleClick={this.handleUserLogout}
            variantValue="contained"
            colorValue="secondary"
            classNameValue="button"
            name="로그아웃"
          /> */}
        </div>
        <h1 className="tc c-point1">
          <Link className="f-regular td-none c-point1" to="/">
            YUCHUNG
          </Link>
        </h1>
        <div className="bt">{isHomepage && <Ul anchor={data.nav} />}</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
});

export default withRouter(
  connect(
    undefined,
    mapDispatchToProps,
  )(Nav),
);
