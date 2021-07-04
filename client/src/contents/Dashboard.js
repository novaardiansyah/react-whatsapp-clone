                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
import React from 'react'

// components
import Sidebar from '../components/Sidebar'
import OpenConversations from '../components/OpenConversations'

// contexts
import { useConversations } from '../contexts/ConversationsProvider'

export default function Dashboard({ id }) 
{
	const { selectedConversation } = useConversations()
	
  return (
    <div className="d-flex" style={{ height: '100vh' }}>
    	<Sidebar id={ id } />
    	{ selectedConversation && <OpenConversations /> }
    </div>
  )
}