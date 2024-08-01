// FormSection.tsx
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import InputField from './InputField';
import { Dropdown } from 'react-native-element-dropdown';
import { AddUserForm } from '../../../../utils/constants/fornConfig';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface FormSectionProps {
  form: AddUserForm;
  fieldIcons: Record<keyof AddUserForm, JSX.Element>;
  handleInputChange: (name: string, value: string | string[]) => void;
  teamsData: Array<{ team_name: string; _id: string }>;
}

const FormSection = ({ form, fieldIcons, handleInputChange, teamsData }) => {
  const getSelectedTeamNames = () => {
    const selectedTeams = teamsData.filter(team => form.team_ids.includes(team._id));
    return selectedTeams.map(team => team.team_name).join(', ');
  };

  return (
    <View className="space-y-6">
      {Object.entries(form).map(([key, value]) => (
        <View key={key} className="mb-4">
          <Text className="mb-2 text-base font-semibold text-gray-700 dark:text-gray-50">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Text>
          {key === 'team_ids' ? (
            <Dropdown
              data={teamsData?.map(team => ({ label: team.team_name, value: team._id })) || []}
              labelField="label"
              valueField="value"
              placeholder={form.team_ids.length > 0 ? getSelectedTeamNames() : "Select teams"}
              value={value as string[]}
              onChange={(items) => {
                if (Array.isArray(items)) {
                  handleInputChange('team_ids', items.map(item => item.value));
                } else {
                  handleInputChange('team_ids', [items.value]);
                }
              }}
              muti
              mode="BADGE"
              renderLeftIcon={() => (
                <Icon name="people" className="mr-2 text-gray-600" size={20} />
              )}
              renderItem={item => (
                <View className="flex-row items-center justify-between p-4">
                  <Text className="flex-1 text-base text-gray-800">{item.label}</Text>
                  {form.team_ids.includes(item.value) && (
                    <Icon name="check" size={20} className="text-blue-500" />
                  )}
                </View>
              )}
              renderSelectedItem={(item, unSelect) => (
                <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                  <View className="flex-row items-center justify-center px-3 py-2 mt-2 mr-2 bg-blue-500 rounded-full">
                    <Text className="mr-1 text-sm text-white">{item.label}</Text>
                    <Icon name="close" size={18} className="text-white" />
                  </View>
                </TouchableOpacity>
              )}
              className="h-12 px-3 bg-white rounded-lg shadow-md"
              placeholderClassName="text-base text-gray-600"
              selectedTextClassName="text-base text-gray-800"
              inputSearchClassName="h-10 text-base"
              iconClassName="w-5 h-5"
              search
              searchPlaceholder="Search teams..."
              containerClassName="rounded-lg"
            />
          ) : (
            <InputField
              name={key}
              value={value as string}
              placeholder={`Enter ${key}`}
              handleInputChange={handleInputChange}
              icon={fieldIcons[key]}
              additionalStyles='border-b-2 border-gray-300 dark:bg-[#ccc] p-3 shadow-md'
              placeholderTextColor='dark'
              additionalInputStyles='bg-gray-100 dark:bg-[#ccc]'
            />
          )}
        </View>
      ))}
    </View>
  );
};

export default FormSection;