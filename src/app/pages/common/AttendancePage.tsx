import { View, Text,TouchableOpacity,Linking,Alert, Platform } from 'react-native'
import React from 'react'
import { AppLayout } from '../../components'
import AttendanceCard from '../../components/ui/attendance/AttendanceCard'
import AttendanceBars from '../../components/ui/attendance/AttendanceBars'

const AttendancePage:React.FC<{route:any}> = ({route}) => {
  const {userId} = (route.params) // fetch the attendace data for the user with this id
  type ParentsData = {
    name: string
    phone: string
    email: string
  }
  const [parentsData, setParentsData] = React.useState<ParentsData>({
    name: 'Hakan Elimine',
    phone: '+905380381648',
    email: 'hakanelimine@gmail.com'
  }) // fetch the parents data for the user with this id
  const [showParentsData, setShowParentsData] = React.useState(false)

  const trainings = [
    {
      id: 1,
      attendance: 'attended',
    },
    {
      id: 2,
      attendance: 'attended',
    },
    {
      id: 3,
      attendance: 'absent',
    },
    {
      id: 4,
      attendance: 'attended',
    },
    {
      id: 5,
      attendance: 'attended',
    },
    {
      id: 6,
      attendance: 'absent',
    },
    {
      id: 7,
      attendance: 'attended',
    },
    {
      id: 8,
      attendance: 'attended',
    },
    {
      id: 9,
      attendance: 'absent',
    },
    {
      id: 10,
      attendance: 'attended',
    },
    {
      id: 11,
      attendance: 'attended',
    },
    {
      id: 12,
      attendance: 'attended',
    },
    {
      id: 13,
      attendance: 'absent',
    },
    {
      id: 14,
      attendance: 'attended',
    },
    {
      id: 15,
      attendance: 'absent',
    },
    {
      id: 16,
      attendance: 'attended',
    },
    {
      id: 17,
      attendance: 'absent',
    },
    {
      id: 18,
      attendance: 'attended',
    },
    {
      id: 19,
      attendance: 'absent',
    },
    {
      id: 20,
      attendance: 'attended',
    },
    {
      id: 21,
      attendance: 'attended',
    },
    {
      id: 22,
      attendance: 'attended',
    },
    {
      id: 23,
      attendance: 'attended',
    },
    {
      id: 24,
      attendance: 'absent',
    },
    {
      id: 25,
      attendance: 'attended',
    },
    {
      id: 26,
      attendance: 'attended',
    },
    {
      id: 27,
      attendance: 'attended',
    },
    {
      id: 28,
      attendance: 'attended',
    },
    {
      id: 29,
      attendance: 'absent',
    },
    {
      id: 30,
      attendance: 'attended',
    }
  ]
  const games = [
    {
      id: 1,
      attendance: 'attended',
    },
    {
      id: 2,
      attendance: 'attended',
    },
    {
      id: 3,
      attendance: 'absent',
    },
    {
      id: 4,
      attendance: 'attended',
    },
    {
      id: 5,
      attendance: 'attended',
    },
    {
      id: 6,
      attendance: 'absent',
    },
    {
      id: 7,
      attendance: 'attended',
    },
    {
      id: 8,
      attendance: 'attended',
    },
    {
      id: 9,
      attendance: 'absent',
    },
    {
      id: 10,
      attendance: 'attended',
    },
    {
      id: 11,
      attendance: 'attended',
    },
    {
      id: 12,
      attendance: 'attended',
    },
    {
      id: 13,
      attendance: 'absent',
    },
    {
      id: 14,
      attendance: 'attended',
    },
    {
      id: 15,
      attendance: 'absent',
    },
    {
      id: 16,
      attendance: 'attended',
    },
    {
      id: 17,
      attendance: 'absent',
    },
    {
      id: 18,
      attendance: 'attended',
    },
    {
      id: 19,
      attendance: 'absent',
    },
    {
      id: 20,
      attendance: 'attended',
    },
    {
      id: 21,
      attendance: 'attended',
    },
    {
      id: 22,
      attendance: 'attended',
    },
    {
      id: 23,
      attendance: 'attended',
    },
    {
      id: 24,
      attendance: 'attended',
    },
    {
      id: 25,
      attendance: 'attended',
    },
    {
      id: 26,
      attendance: 'attended',
    },
    {
      id: 27,
      attendance: 'attended',
    },
    {
      id: 28,
      attendance: 'attended',
    },
    {
      id: 29,
      attendance: 'attended',
    },
    {
      id: 30,
      attendance: 'attended',
    }
  ]

  const trainings_attended = trainings.filter(training => training.attendance === 'attended').length
  const games_attended = games.filter(game => game.attendance === 'attended').length

  



  return (
    <AppLayout>
        <>
          <View className="flex-row items-center justify-between my-3">
            <AttendanceCard cardTitle='Games' attended={trainings_attended} absent={trainings.length - trainings_attended}/>
            <AttendanceCard cardTitle='Trainings' attended={games_attended} absent={games.length - games_attended}/>
          </View>
          <View className='px-4 py-3 bg-dacka-gray rounded-xl'>
            <Text className="text-lg">Attendance</Text>
            <AttendanceBars title='Recent Month' attendandPercentage={56}/>
            <AttendanceBars title='Recent Year' attendandPercentage={80}/>
          </View>
          <TouchableOpacity className="px-4 my-3" onPress={() => setShowParentsData((prevState) => !prevState)}>
            <Text className="text-base text-white">{showParentsData ? 'hide parents information' : "monthly training attendance frequency is less than 60% click to see parent's information"}</Text>
          </TouchableOpacity>

          {showParentsData && (
          <View className="px-4 py-3 bg-dacka-gray rounded-xl">
            <Text className="text-lg">Parents Data</Text>
            {Object.keys(parentsData).map((key, index) => (
              <View key={index} className="flex-row items-center justify-between py-1">
                <Text className="text-base font-bold text-dacka-black">{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                {key === 'phone' ? (
                  <TouchableOpacity onPress={() => console.log('foo bar')}>
                    <Text className="text-base font-bold text-dacka-black">{parentsData[key as keyof ParentsData]}</Text>
                  </TouchableOpacity>
                ) : (
                  <Text className="text-base font-bold text-dacka-black">{parentsData[key as keyof ParentsData]}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        </>
    </AppLayout>
  )
}

export default AttendancePage