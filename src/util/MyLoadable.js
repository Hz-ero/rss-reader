import React from 'react'
import Loadable from 'react-loadable';

const LoadingComponent = (props) => {
  if (props.isLoading) {
    // 当进入加载过程
    if (props.timedOut) {
      // 超时返回：
      return <div>Loader timed out!</div>;
    } else if (props.pastDelay) {
      // 延时中返回：
      return <div>Loading...</div>;
    }
    // 
    return null;
  } else if (props.error) {
    // 遇到错误返回：
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
