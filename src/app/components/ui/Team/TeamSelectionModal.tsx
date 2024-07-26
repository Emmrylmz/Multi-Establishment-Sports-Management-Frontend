import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import TeamList from './TeamList'; // Adjust the import path as needed

type Team = {
  teamName: string;
  teamId: string;
  coachName: string;
};

type TeamSelectionModalProps = {
  visible: boolean;
  onClose: () => void;
  teams: Team[];
  onTeamSelect: (teamId: string) => void;
};

const TeamSelectionModal: React.FC<TeamSelectionModalProps> = ({
  visible,
  onClose,
  teams,
  onTeamSelect,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="justify-end flex-1 bg-opacity-50">
        <View className="p-4 bg-gray-100 dark:bg-dacka-dark-gray rounded-t-3xl h-5/6">
          <Text className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-100">Select a Team</Text>
          <TeamList
            teams={teams}
            onTeamSelect={(teamId) => {
              onTeamSelect(teamId);
              onClose();
            }}
            selectedTeamId={null}
          />
          <TouchableOpacity
            className="p-3 mt-4 bg-gray-200 rounded-xl"
            onPress={onClose}
          >
            <Text className="font-semibold text-center text-gray-700">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TeamSelectionModal;