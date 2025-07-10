import { RouterProvider } from 'react-router-dom'
import './App.css'
import Header from './components/haeder/Header'
import router from './routers/Routers'
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
