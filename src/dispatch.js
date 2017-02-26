import React from 'react'

class DispatcherContext extends React.Component {
  _fetchData() {
    const { action, dispatch } = this.props

    dispatch(action())
  }

  // We trigger a fetchData call the first time we're loaded, every time.
  //
  componentDidMount() { this._fetchData() }

  // If this component is passed different children at any point, we want to
  // trigger another fetchData call.
  //
  // Just putting a blanket update here tends to lead to infinite loops.
  //
  componentDidUpdate(previous) {
    const previousName = previous.children.type.displayName
    const currentName = this.props.children.type.displayName

    if (previousName !== currentName) { this._fetchData() }
  }

  // We're a bare wrapper around a component with fetchable actions.
  //
  render() { return this.props.children }
}

const dispatcherContext = store => {

  return function(nextState, replace, callback) {
      operation(nextState, replace).then(() => callback()).catch(() => callback(new Error()));
  };

  // We want to wrap every component with a fetchData static property. I.E.,
  // fetchables.
  //
  // const renderRouteComponent = child => {
  //   if (child.type.fetchData) {
  //     return(
  //       <DispatcherContext dispatch={ store.dispatch }
  //                          action={ child.type.fetchData }>
  //         { child }
  //       </DispatcherContext>
  //     )
  //   }

  //   return child
  // }

  // return { renderRouteComponent }
}

export default dispatcherContext
