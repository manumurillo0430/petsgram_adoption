import * as React from 'react'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
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
import AddNewPetForm from './components/Admin/AddNewPetForm'
import ProfileDetails from './pages/ProfileDetails'
import SaveALife from '../../client/src/pages/SaveALife'

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
              <Route path="/myprofile" element={<Outlet />}>
                <Route element={<SearchProvider />}>
                  <Route
                    path="savealife"
                    element={
                      <PrivateRouteUser>
                        <SaveALife />
                      </PrivateRouteUser>
                    }
                  />
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
              <Route path="/profile" element={<Outlet />}>
                <Route element={<SearchProvider />}>
                  <Route
                    path=":id"
                    element={
                      <PrivateRouteUser>
                        <ProfileDetails />
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
                      <AddNewPetForm />
                    </PrivateRouteAdmin>
                  }
                />
                <Route
                  path="editpet/:id"
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
                      <AddNewPetForm />
                    </PrivateRouteAdmin>
                  }
                />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MainTemplate>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
