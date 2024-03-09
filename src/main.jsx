import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import store from './store/store'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

// yeh provider joh hum use kar rhe hai for passing the store to the app woh hume milta hai react-redux se joh package humne install kiya hai
// yeh provider joh hai woh prop leta hai and hume uske through joh store bnake import kiya tah usko bhej denge