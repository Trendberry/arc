/* eslint-disable no-console */
import isEqual from 'lodash/isEqual'
import isFunction from 'lodash/isFunction'
import isObject from 'lodash/isObject'
import union from 'lodash/union'
import keysf from 'lodash/keys'

/*
Drop this mixin into a component that wastes time according to Perf.getWastedTime() to find
out what state/props should be preserved. Once it says "Update avoidable!" for {state, props},
you should be able to drop in React.addons.PureRenderMixin

React.createClass {
  mixins: [WhyDidYouUpdateMixin]
}
*/
function isRequiredUpdateObject(o) {
  return Array.isArray(o) || (o && o.constructor === Object.prototype.constructor)
}

export function deepDiff(o1, o2, p) {
  const notify = (status) => {
    console.warn('Update %s', status)
    console.log('%cbefore', 'font-weight: bold', o1)
    console.log('%cafter ', 'font-weight: bold', o2)
  }
  if (!isEqual(o1, o2)) {
    console.group(p)
    if ([o1, o2].every(isFunction)) {
      notify('avoidable?')
    } else if (![o1, o2].every(isRequiredUpdateObject)) {
      notify('required.')
    } else {
      const keys = union(keysf(o1), keysf(o2))
      keys.forEach((key) => {
        deepDiff(o1[key], o2[key], key)
      })
    }
    console.groupEnd()
  } else if (o1 !== o2) {
    console.group(p)
    notify('avoidable!')
    if (isObject(o1) && isObject(o2)) {
      const keys = union(keysf(o1), keysf(o2))
      keys.forEach((key) => {
        deepDiff(o1[key], o2[key], key)
      })
    }
    console.groupEnd()
  }
}

const WhyDidYouUpdateMixin = {
  componentDidUpdate(prevProps, prevState) {
    deepDiff({ props: prevProps, state: prevState },
             { props: this.props, state: this.state },
             this.constructor.displayName)
  },
}

export default WhyDidYouUpdateMixin
