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
      <View className="flex-1 justify-end  bg-opacity-50">
        <View className="bg-gray-100 rounded-t-3xl p-4 h-5/6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Select a Team</Text>
          <TeamList
            teams={teams}
            onTeamSelect={(teamId) => {
              onTeamSelect(teamId);
              onClose();
            }}
            selectedTeamId={null}
          />
          <TouchableOpacity
            className="mt-4 bg-gray-200 p-3 rounded-xl"
            onPress={onClose}
          >
            <Text className="text-center text-gray-700 font-semibold">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TeamSelectionModal;