import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
const Header = () => {
  return (
    <div className='flex flex-row justify-between p-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-2xl flxed'>
        <div className='flex flex-row '>
            <MarkChatReadIcon className='m-4'/>
            <h1 className='my-4 font-mono'>ConvoSphere</h1>
        </div>
        <div className=''>
            <SearchIcon className='m-4'/>
            <AddIcon className='m-4'/>
            <GroupIcon className='m-4'/>
            <NotificationsIcon className='m-4'/>
            <ExitToAppIcon className='m-4'/>
        </div>
      
    </div>
  )
}

export default Header
