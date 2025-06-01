import React from 'react'
import { Outlet } from "@tanstack/react-router"
import Header from './components/Header'
import Body from './components/Body'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="appContainer">
      <Header />
      <Navbar />
      <main>
        <Body /> 
      </main>
      <Footer />
    </div>
  )
}

export default App