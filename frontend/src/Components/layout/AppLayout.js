import React from 'react'
import Header from './Header'
import Title from '../Shared/Title'

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    // console.log(props)
    return (
    <div>
        <Title/>
        <Header/>
        

        <div className='grid grid-cols-12'>
        <div className='col-span-4'>
                First
        </div>
        <div className='col-span-4'>
            <WrappedComponent {...props}/>
        </div>
        <div className='col-span-4'>
                Third
        </div>
        

        </div>
        
    </div>
    )
  }
}

export default AppLayout
