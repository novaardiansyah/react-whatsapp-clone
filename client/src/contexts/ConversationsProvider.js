                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
import React, { useContext, useState, useEffect, useCallback } from 'react'

// hooks
import useLocalStorage from '../hooks/useLocalStorage'

// contexts
import { useContacts } from './ContactsProvider'
import { useSocket } from './SocketProvider'

const ConversationsContext = React.createContext()

export function ConversationsProvider({ id, children }) 
{
	const [ conversations, setConversations ] = useLocalStorage('conversations', [])
	const { contacts } = useContacts()
	const socket = useSocket()
	const [ selectedConversationIndex, setSelectedConversationIndex ] = useState(0)
	
	function createConversation(recipients)
	{
		setConversations(prevConversations => {
			return [...prevConversations, { recipients, messages: [] }]
		})
	}
	
	const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
		setConversations(prevConversations => {
			let madeChange = false
			const newMessage = { sender, text }
			
			const newConversations = prevConversations.map(conversation => {
				if (arrayEquality(conversation.recipients, recipients))
				{
					madeChange = true
					
					return { ...conversation, messages: [ ...conversation.messages, newMessage ] }
				}
				
				return conversation
			})
			
			if (madeChange)
			{
				return newConversations
			} else {
				return [ ...prevConversations, { recipients, messages: [newMessage] }]
			}
		})
	}, [ setConversations ])
	
	useEffect(() => {
		if (socket == null) return
		
		socket.on('receive-message', addMessageToConversation)
		
		return () => socket.off('receive-message')
	}, [ socket, addMessageToConversation ])
	
	function sendMessage(recipients, text)
	{
		socket.emit('send-message', {recipients, text})
		addMessageToConversation({ recipients, text, sender: id })
	}
	
	const formattedConversations = conversations.map((conversation, index) => {
		const recipients = conversation.recipients.map(reciplent => {
			const contact = contacts.find(contact => {
				return contact.id === reciplent
			})
			
			const fullName = (contact && contact.fullName) || reciplent
			
			return { id: reciplent, fullName }
		})
		
		const messages = conversation.messages.map(message => {
			const contact = contacts.find(contact => {
				return contact.id === message.sender
			})
			
			const fullName = (contact && contact.fullName) || message.sender
			
			const fromMe = id === message.sender
			
			return { ...message, senderName: fullName, fromMe }
		})
		
		const selected = index === selectedConversationIndex
		
		return { ...conversation, messages, recipients, selected }
	})
	
	const value = {
		conversations: formattedConversations,
		selectConversationIndex: setSelectedConversationIndex,
		selectedConversation: formattedConversations[selectedConversationIndex],
		createConversation,
		sendMessage
	}
	
  return (
    <ConversationsContext.Provider value={ value }>
    	{ children }
    </ConversationsContext.Provider>
  )
}

export function useConversations()
{
	return useContext(ConversationsContext)
}

function arrayEquality(a, b)
{
	if (a.length !== b.length) return false
	
	a.sort()
	b.sort()
	
	return a.every((element, index) => {
		return element === b[index]
	})
}