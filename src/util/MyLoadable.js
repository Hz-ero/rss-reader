import React from 'react'
import Loadable from 'react-loadable';

const LoadingComponent = (props) => {
  if (props.isLoading) {
    // While our other component is loading...
    if (props.timedOut) {
      // In case we've timed out loading our other component.
      return <div>Loader timed out!</div>;
    } else if (props.pastDelay) {
      // Display a loading screen after a set delay.
      return <div>Loading...</div>;
    }
    // Don't flash "Loading..." when we don't need to.
    return null;
  } else if (props.error) {
    // If we aren't loading, maybe
    return <div>Error! Component failed to load</div>;
  }
  // This case shouldn't happen... but we'll return null anyways.
  return null;
}

const MyLoadable = opts => Loadable(Object.assign({
  loading: LoadingComponent,
  delay: 200,
  timeout: 1000,
}, opts))

export default MyLoadable


/**
 * 使用方法
 */
// const About = MyLoadable({
//   loader: () => import('./AboutContainer')
// })
