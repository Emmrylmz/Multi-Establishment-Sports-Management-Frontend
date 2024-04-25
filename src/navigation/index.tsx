// initial page to redirect user to related stack page
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text } from 'react-native'
import React,{useEffect,useState} from 'react'
import CoachNavigation from './CoachNavigation'
import LoginNavigation from './LoginNavigation'
import PlayerNavigation from './PlayerNavigation'
export default function AppNavigator () {
  type User = {
    role: string
  }
  const [user,setUser] = useState<User>({
    role: ''
  })
  //! sayfa ilk açıldığında database e istek atar gelen kullanıcı bilgilerine göre sayfalara yönlendirir
  useEffect(() => {
    const getUser = async () => {
      // fetch user data from async storage
    }
  },[])

  //* kullanıcı rolüne göre gerekli sayfaya yönlendirilir
  switch(user.role){
    case 'player':
      return <PlayerNavigation/>
    case 'coach':
      return <CoachNavigation/>
    default: 
    return <LoginNavigation/>
  }
  
}