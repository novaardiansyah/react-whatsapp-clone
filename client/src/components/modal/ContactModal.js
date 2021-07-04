                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../../contexts/ContactsProvider'

export default function ContactModal({ closeModal }) 
{
	const idRef       = useRef()
	const fullNameRef = useRef()
	
	const { createContact } = useContacts()
	
	function handleSubmit(e) 
	{
		e.preventDefault()
		
		createContact(idRef.current.value, fullNameRef.current.value)
		closeModal()
	}
	
  return (
    <>
    	<Modal.Header closeButton>
    		Create Contact
    	</Modal.Header>
    	
    	<Modal.Body>
    		<Form method="post" onSubmit={ handleSubmit }>
    			<Form.Group className="mb-3">
    				<Form.Label>ID</Form.Label>
    				<Form.Control type="text" ref={idRef} />
    			</Form.Group>
    			<Form.Group className="mb-3">
    				<Form.Label>Full Name</Form.Label>
    				<Form.Control type="text" ref={fullNameRef} />
    			</Form.Group>
    			<Button type="submit" variant="primary">Create</Button>
    		</Form>
    	</Modal.Body>
    </>
  )
}