                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
import { useState, useEffect } from 'react'

// global variables
const PREFIX = 'react-whatsapp-clone'

export default function useLocalStorage(key, initialValue) 
{
	const prefixKey = `${PREFIX}-${key}`
	
  const [ value, setValue ] = useState(() => {
  	return getSavedValue(prefixKey, initialValue)
  })
  
  useEffect(() => {
  	localStorage.setItem(prefixKey, JSON.stringify(value))
  }, [ prefixKey, value ])
  
  return [ value, setValue ]
}

function getSavedValue(prefixKey, initialValue) 
{
	if ( initialValue instanceof Function ) return initialValue()
	
	const savedValue = JSON.parse(localStorage.getItem(prefixKey))
	
	if ( savedValue ) return savedValue
	
	return initialValue
}