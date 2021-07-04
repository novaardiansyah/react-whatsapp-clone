                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuid } from 'uuid'

export default function Login({ onIdSubmit }) 
{
  const idRef = useRef()
  
  function handleSubmit(e)
  {
  	e.preventDefault()
  	onIdSubmit(idRef.current.value)
  }
  
  function handleClick()
  {
  	onIdSubmit(uuid())
  }
  
  return (
  	<Container className="d-flex align-items-center" style={{ height: '100vh' }}>
  		<Form onSubmit={ handleSubmit } className="w-100">
  			<Form.Group className="mb-3">
  				<Form.Label>Enter Your ID</Form.Label>
  				<Form.Control type="text" ref={ idRef } required />
  			</Form.Group>
  			
  			<Button type="submit" variant="primary">Login</Button>
  			<Button onClick={ handleClick } type="button" variant="secondary" className="ml-2">Create a New ID</Button>
  		</Form>
  	</Container>
  )
}