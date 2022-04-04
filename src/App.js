import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Grommet } from 'grommet'
import store, { history } from 'store'
import Routes from 'routes'
import { Main } from 'components/atoms'

const App = () => (
  <Grommet>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Main>
          <Routes />
        </Main>
      </ConnectedRouter>
    </Provider>
  </Grommet>
)

export default App
