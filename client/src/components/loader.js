import React from 'react';
import Loadable from 'react-loadable';
import Loading from './loading';

const MessageBox = (props, msg) => (
  <div id="notfound">
    <div className="notfound">
      <div className="notfound-404">
        <h1>Oops!</h1>
        <h2>{msg}</h2>
      </div>
      <button
        className="routing-retry--btn"
        type="button"
        onClick={props.retry}
      >
        Retry
      </button>
    </div>
  </div>
);

const isLoading = props => {
  if (props.error) {
    return MessageBox(props, 'Routing Error!');
  }
  if (props.timedOut) {
    return MessageBox(props, 'Taking a long time...');
  }
  if (props.pastDelay) {
    return Loading();
  }
  return null;
};

const Loader = opts =>
  Loadable(
    Object.assign(
      {
        loading: isLoading,
        delay: 200,
        timeout: 10000,
      },
      opts,
    ),
  );

export default Loader;
