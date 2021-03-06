                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'

// components
import Conversations from './Conversations'
import Contacts from './Contacts'

import ConversationModal from './modal/ConversationModal'
import ContactModal from './modal/ContactModal'

// hooks
import useLocalStorage from '../hooks/useLocalStorage'

// global variables
const CONVERSATIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'

export default function Sidebar({ id }) 
{
	const [ activeKey, setActiveKey ] = useLocalStorage('activeKey', CONVERSATIONS_KEY)
	const [ modalOpen, setModalOpen] = useState(false)
	const conversationsOpen = activeKey === CONVERSATIONS_KEY
	
	function closeModal()
	{
		setModalOpen(false)
	}
	
  return (
    <div style={{ width: '250px' }} className="d-flex flex-column">
    	<Tab.Container activeKey={ activeKey } onSelect={ setActiveKey }>
    		<Nav variant="tabs" className="justify-content-center">
    			<Nav.Item>
    				<Nav.Link className="text-capitalize" eventKey={ CONVERSATIONS_KEY }>{ CONVERSATIONS_KEY }</Nav.Link>
    			</Nav.Item>
    			<Nav.Item>
    				<Nav.Link className="text-capitalize" eventKey={ CONTACTS_KEY }>{ CONTACTS_KEY }</Nav.Link>
    			</Nav.Item>
    		</Nav>
    		
    		<Tab.Content className="border-right overflow-auto flex-grow-1">
    			<Tab.Pane eventKey={ CONVERSATIONS_KEY }>
    				<Conversations />
    			</Tab.Pane>
    			<Tab.Pane eventKey={ CONTACTS_KEY }>
    				<Contacts />
    			</Tab.Pane>
    		</Tab.Content>
    		
    		<div className="p-2 border-top border-right small">
    			Your ID: <span className="text-cl-dark">{ id }</span>
    		</div>
    		
    		<Button onClick={ () => setModalOpen(true) } className="rounded-0" >
    			New { conversationsOpen ? 'Conversation' : 'Contact' }
    		</Button>
    	</Tab.Container>
    	
    	<Modal 
    		show={ modalOpen } 
    		onHide={ closeModal } 
    		backdrop="static"
        keyboard={false}
    	>
    		{
    			conversationsOpen ? <ConversationModal closeModal={ closeModal } /> : <ContactModal closeModal={ closeModal } />
    		}
    	</Modal>
    </div>
  )
}