import { View, Text } from 'react-native'
import React from 'react'
import CoachNotes from '../../components/ui/Notes/CoachNotes';

const CoachNotesPage = () => {
    const playerNotes = [
        {
          id: '1',
          content: 'Showed great improvement in ball handling skills during today\'s practice.',
          timestamp: '2023-07-10 14:30',
          coachName: 'Coach Smith',
        },
        {
          id: '2',
          content: 'Needs to work on defensive positioning. Set up extra drills for next week.',
          timestamp: '2023-07-11 10:15',
          coachName: 'Coach Johnson',
        },
        // ... more notes
      ];
  return (
    <CoachNotes playerName="John Doe" notes={playerNotes} />

  )
}

export default CoachNotesPage