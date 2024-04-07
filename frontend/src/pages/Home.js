import React from 'react'
import AppLayout from '../Components/layout/AppLayout'

const Home = () => {
  return (
    <div>
      home
    </div>
  )
}

export default AppLayout()(Home)

// AppLayout is invoked as a function (AppLayout()).
// This invocation returns another function (HOC).
// The returned function is then immediately invoked with Home as an argument (AppLayout()(Home)), resulting in the Home component being wrapped by the HOC returned by AppLayout.