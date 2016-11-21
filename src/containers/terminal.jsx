import { connect } from 'react-redux'
import Terminal from '../components/Terminal.js'

const mapStateToProps = (state) => {
  return {
    ...state.Terminal
  }
}

const App = connect(
  mapStateToProps
)(Terminal)

export default App
