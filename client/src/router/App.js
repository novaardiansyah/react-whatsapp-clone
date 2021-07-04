                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// contents
import Login from '../contents'
import Dashboard from '../contents/Dashboard'

// hooks
import useLocalStorage from '../hooks/useLocalStorage'

// contexts
import { ContactsProvider } from '../contexts/ContactsProvider'
import { ConversationsProvider } from '../contexts/ConversationsProvider'
import { SocketProvider } from '../contexts/SocketProvider'

export default function App() 
{
	const [ id, setId ] = useLocalStorage('id', '')
	
	const dashboard = (
		<SocketProvider id={ id } >
			<ContactsProvider>
				<ConversationsProvider id={ id }>
					<Dashboard id={ id } />
				</ConversationsProvider>
			</ContactsProvider>
		</SocketProvider>
	)
	
  return (
    <Router>
    	<div className="content">
	      <Switch>
	        <Route exact path="/">
	        	{
	        		id ? dashboard : <Login onIdSubmit={ setId } />
	        	}
	        </Route>
	      </Switch>
      </div>
    </Router>
  )
}