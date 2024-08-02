import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';

const screenWidth = Dimensions.get('window').width;

const PlayerProgressPage = () => {
  const [selectedSkill, setSelectedSkill] = useState('Dribbling');

  // Dummy data for each skill
  const skillsData = {
    Dribbling: [5, 5.5, 6, 6.5, 7, 7.5],
    Passing: [4, 4.5, 5, 6, 6.5, 7],
    Shooting: [3, 3.5, 4, 5, 5.5, 6],
    Playmaking: [4.5, 5, 5.5, 6, 6.5, 7],
    Defense: [3.5, 4, 4.5, 5, 5.5, 6],
    Rebounding: [4, 4.5, 5, 5.5, 6, 6.5],
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const dropdownData = Object.keys(skillsData).map(skill => ({ label: skill, value: skill }));

  const SkillChart = ({ skill, data }) => (
    <View className="p-4 mb-6 rounded-lg shadow-md bg-dacka-white dark:bg-dacka-dark-gray">
      <Text className="mb-4 text-xl font-semibold text-dacka-black dark:text-dacka-white">
        {skill} Progress
      </Text>
      <LineChart
        data={{
          labels: months,
          datasets: [{ data }],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix=""
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#3FA454',
          backgroundGradientTo: '#07ae42',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#07ae42',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-dacka-white dark:bg-dacka-black">
      <ScrollView className="flex-1 px-4 py-6">
        <View className="items-center mb-6">
          <Text className="text-3xl font-bold text-dacka-black dark:text-dacka-white">
            Your Progress
          </Text>
        </View>

        <View className="mb-6">
          <Dropdown
            data={dropdownData}
            labelField="label"
            valueField="value"
            placeholder="Select Skill"
            value={selectedSkill}
            onChange={item => setSelectedSkill(item.value)}
            className="p-2 rounded-lg bg-dacka-white dark:bg-dacka-dark-gray"
            placeholderStyle={{ color: '#919191' }}
            selectedTextStyle={{ color: '#3FA454' }}
            itemTextStyle={{ color: '#101010' }}
            containerStyle={{ backgroundColor: '#f3f4f6' }}
          />
        </View>

        <SkillChart skill={selectedSkill} data={skillsData[selectedSkill]} />

        <View className="p-4 mb-6 rounded-lg shadow-md bg-dacka-white dark:bg-dacka-dark-gray">
          <Text className="mb-4 text-xl font-semibold text-dacka-black dark:text-dacka-white">
            Recent Achievements
          </Text>
          <View className="flex-row items-center mb-2">
            <Ionicons name="trophy-outline" size={24} color="#3FA454" />
            <Text className="ml-2 text-dacka-black dark:text-dacka-white">
              Most Improved Player - June 2023
            </Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Ionicons name="star-outline" size={24} color="#3FA454" />
            <Text className="ml-2 text-dacka-black dark:text-dacka-white">
              Top Scorer - Last 5 Games
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="trending-up-outline" size={24} color="#3FA454" />
            <Text className="ml-2 text-dacka-black dark:text-dacka-white">
              20% Improvement in 3-Point Shooting
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlayerProgressPage;