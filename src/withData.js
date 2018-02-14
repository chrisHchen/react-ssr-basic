import React from 'react';
// this is an alternative to context
/* eslint-disable */
export default (Cmp) => {
  if (typeof window !== 'undefined' && window.__initState__) {
    const initData = window.__initState__;
    delete window.__initState__;
    return props => <Cmp data={initData} {...props} />;
  } else {
    return props => <Cmp {...props} />;
  }
};
