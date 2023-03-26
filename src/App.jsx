import Piano from './components/Piano'
import songData from './data/songData'
import './App.scss'

const App = () => (
  <div className="App">
    <Piano songData={songData} />
  </div>
)

export default App
