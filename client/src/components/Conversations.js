                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
import React from 'react'
import { ListGroup } from 'react-bootstrap'

// contexts
import { useConversations } from '../contexts/ConversationsProvider'

export default function Conversations() 
{
	const { conversations, selectConversationIndex } = useConversations()
	
  return (
    <ListGroup variant="flush">
    	{
    		conversations.map((conversation, index) => (
    			<ListGroup.Item 
    				key={ index }
    				action
    				onClick={ () => selectConversationIndex(index) }
    				active={ conversation.selected }
  				>
    				{ conversation.recipients.map(reciplent => reciplent.fullName).join(', ') }
    			</ListGroup.Item>
    		))
    	}
    </ListGroup>
  )
}