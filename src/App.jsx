
import './App.css'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import ContentProvider from './Context/ContentContext'
import Sidebar from './Component/Sidebar'
import LoginContent from './Component/LoginContent'
import Signup from './Component/Signup'
import AddContent from './Component/AddContent'
import EditContent from './Component/EditContent'
import ViewContent from './Component/ViewContent'
import PrivateRoute from './Component/PrivateRoute'

function App() {

  return (
    <>
      <AuthProvider >
        <ContentProvider>


          <div className='app-container'>
            <Sidebar />

            <main className='main-content'>

              <Routes>
                <Route path='/login' element={<LoginContent />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/add' element={
                  <PrivateRoute>
                    <AddContent />
                  </PrivateRoute>
                } />
                <Route path='/edit/:id' element={
                  <PrivateRoute>
                    <EditContent />
                  </PrivateRoute>
                } />
                <Route path='/view' element={<ViewContent />} />
                <Route path='/' element={<Navigate to='login' replace />} />
              </Routes>

            </main>

          </div>

        </ContentProvider>
      </AuthProvider>
    </>
  )
}

export default App
