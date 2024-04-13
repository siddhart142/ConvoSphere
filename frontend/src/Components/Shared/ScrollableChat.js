import { Avatar, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const ScrollableChat = ({messages}) => {

    console.log("scroll",messages)
    const user = useSelector((store)=>store.user)
    const isSameSender = (messages, message, i, userId) =>{
        return (
            i<messages.length -1 && 
            (messages[i+1].sender._id!==message.sender._id || messages[i+1].sender._id===undefined) && messages[i].sender._id!==userId
        )
    }

    const isDiffSender = (messages, message, i, userId) =>{
        return (
            (i>0 && (messages[i-1].sender._id!==message.sender._id || messages[i-1].sender._id===undefined) && messages[i].sender._id!==userId) ||
            (i===0 && messages[0].sender._id!==userId)
        )
    }

    const isLastMessage = (messages, i, userId) =>{
        return( 
            i===messages.length-1 && messages[messages.length-1].sender._id !== userId &&
            messages[messages.length-1].sender._id
        )
    }


  return (
<div className='overflow-x-hidden overflow-y-auto h-[900px] px-4 '>
    {messages && messages.map((message, i) => (
        <div className={`flex ${message.sender._id === user._id ? 'justify-end' : 'justify-start'} mb-4`} key={message._id}>
            {(isDiffSender(messages, message, i, user._id) && message.isGroupChat) &&
                <Tooltip label={message.sender.name} placement='bottom-start' hasArrow>
                    <Avatar size="sm" cursor='pointer' name={message.sender.name} src={message.sender.avatar} />
                </Tooltip>
            }
            <span className={`flex-shrink-0 ${message.sender._id === user._id ? 'bg-blue-200' : 'bg-green-300 text-gray-800'} ${!message.isGroupChat ? "ml-2" : isDiffSender(messages, message, i, user._id) && message.isGroupChat ? 'ml-2' : 'ml-10'} py-2 px-3 rounded-lg max-w-[75%]`}>{message.content}</span>
        </div>
    ))}
</div>



  )
}

export default ScrollableChat
