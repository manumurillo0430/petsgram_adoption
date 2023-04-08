import * as React from 'react'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'

import MainTemplate from './components/template/MainTemplate'
import AdminDasboard from './pages/AdminDashboard'
import Home from './pages/Home'
import MyPets from './pages/MyPets'
import Search from './pages/Search'
import ProfilesSettigs from './pages/ProfileSettings'
import AuthProvider from './context/AuthContext'
import SearchProvider from './context/SearchContext'
import PrivateRouteUser from './private_routes/PrivateRouteUser'
import PrivateRouteAdmin from './private_routes/PrivateRouteAdmin'
import PetDetailsPage from './components/pet/PetDetailsPage'
import AddNewPet from './pages/AddNewPet'
import PetForm from './components/Admin/PetForm'
import ProfileDetails from './pages/ProfileDetails'

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <MainTemplate>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<SearchProvider />}>
                <Route path="/search" element={<Search />} />
                <Route path="/pet/:id" element={<PetDetailsPage />} />
              </Route>
              <Route path="/profile" element={<Outlet />}>
                <Route element={<SearchProvider />}>
                  <Route
                    path="settings"
                    element={
                      <PrivateRouteUser>
                        <ProfilesSettigs />
                      </PrivateRouteUser>
                    }
                  />
                  <Route
                    path=":id"
                    element={
                      <PrivateRouteUser>
                        <ProfileDetails />
                      </PrivateRouteUser>
                    }
                  />

                  <Route
                    path="mypets"
                    element={
                      <PrivateRouteUser>
                        <MyPets />
                      </PrivateRouteUser>
                    }
                  />
                </Route>
              </Route>

              <Route path="/admin" element={<Outlet />}>
                <Route
                  path="new"
                  element={
                    <PrivateRouteAdmin>
                      <AddNewPet />
                    </PrivateRouteAdmin>
                  }
                />
                <Route
                  path="dashboard"
                  element={
                    <PrivateRouteAdmin>
                      <AdminDasboard />
                    </PrivateRouteAdmin>
                  }
                />
                <Route
                  path="editpet/:id"
                  element={
                    <PrivateRouteAdmin>
                      <PetForm />
                    </PrivateRouteAdmin>
                  }
                />
              </Route>
            </Routes>
          </MainTemplate>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
