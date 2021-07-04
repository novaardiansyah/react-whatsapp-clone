                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
import React from 'react'
// bootstrap components
import { ListGroup } from 'react-bootstrap'

// contexts
import { useContacts } from '../contexts/ContactsProvider'

export default function Contacts() 
{
	const { contacts } = useContacts()
	
  return (
    <ListGroup variant="flush">
    	{
    		contacts.map(contact => (
    			<ListGroup.Item key={ contact.id }>
    				{ contact.fullName }
    			</ListGroup.Item>
    		))
    	}
    </ListGroup>
  )
}