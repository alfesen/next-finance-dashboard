import React, { Fragment, ReactNode } from 'react'
import Navigation from './navigation.component'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <Navigation />
      {children}
    </Fragment>
  )
}

export default Layout