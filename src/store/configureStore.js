import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import {responsiveStoreEnhancer, createResponsiveStoreEnhancer } from 'redux-responsive';
import rootReducer from '../reducers'
import fakeAPI from '../middleware/fakeAPI'

export const history = createHistory()

const initialState = {}
const enhancers = [
  responsiveStoreEnhancer,
]
const middleware = [
  fakeAPI,
  routerMiddleware(history),

]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store