                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
import React, { useContext } from 'react'

// hooks
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()

export function ContactsProvider({ children }) 
{
	const [ contacts, setContacts ] = useLocalStorage('contacts', [])
	
	function createContact(id, fullName)
	{
		setContacts(prevContacts => {
			return [...prevContacts, { id, fullName }]
		})
	}
	
  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
    	{ children }
    </ContactsContext.Provider>
  )
}

export function useContacts()
{
	return useContext(ContactsContext)
}