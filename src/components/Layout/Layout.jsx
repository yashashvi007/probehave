import React from 'react'
import Style from './Layout.module.css'
import Desktop from '../Header/Desktop/Desktop'
import Mobile from "../Header/Mobile/Mobile"
import Footer from "../Footer/Footer"

const Layout = ({ children }) => {
  return (
    <div className={Style.main}>
      <Desktop />
      <Mobile />
      {children}
      <Footer />
    </div>
  )
}

export default Layout