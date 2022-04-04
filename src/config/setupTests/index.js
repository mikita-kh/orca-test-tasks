/* eslint-disable import/no-extraneous-dependencies */

import 'jest-enzyme'
import 'jest-styled-components'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { configure } from 'enzyme'
import './mockStore'

// eslint-disable-next-line jest/require-hook
configure({ adapter: new Adapter() })
