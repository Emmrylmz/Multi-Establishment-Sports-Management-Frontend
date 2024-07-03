import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, ScrollView } from 'react-native';
import AppLayout from '../../components/layout/AppLayout';
import {
	useCreateEventMutation,
	useListEventsQuery,
} from '../../../features/query/eventQueryService';
import { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { useSelector } from 'react-redux';
import FormOption from '../../components/ui/Form/FormOption';
import { InputField } from '../../components';
import DateTimeSelection from '../../components/ui/Form/DateTimeSelection';

const CoachAddTrainingPage = ({ route }) => {
	const user = useSelector((state: RootState) => getAuthUser(state));
	const { team_id } = route.params;
	const dateNow = new Date();
	const [createEvent] = useCreateEventMutation();
	const { refetch } = useListEventsQuery([team_id]);

	const [trainingForm, setTrainingForm] = useState({
		event_type: 'Game',
		creator_id: user ? user.id : "",
		place: '',
		start_date: dateNow,
		start_time: dateNow,
		end_date: dateNow,
		end_time: dateNow,
		created_at: new Date().toISOString(),
		team_id: team_id,
		description: '',
	});

	const [selectedOption, setSelectedOption] = useState<number | null>(null);

	const options = [
		{ id: 1, label: 'Training' },
		{ id: 2, label: 'Game' },
	];

	const handleInputChange = (name, value) => {
		setTrainingForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

  const combineDateAndTime = (date, time) => {
    const combined = new Date(date);
    combined.setHours(time.getHours());
    combined.setMinutes(time.getMinutes());
    combined.setSeconds(time.getSeconds());
    combined.setMilliseconds(time.getMilliseconds());
    return combined;
  };

	const postForm = async () => {
    const startDateTime = combineDateAndTime(trainingForm.start_date, trainingForm.start_time);
    const endDateTime = combineDateAndTime(trainingForm.end_date, trainingForm.end_time);

    if (endDateTime <= startDateTime) {
      alert('End time must be after start time.');
      return;
    }
  
    const formData = {
      ...trainingForm,
      start_datetime: startDateTime.toISOString(),
      end_datetime: endDateTime.toISOString(),
    };
  
    try {
      const response = await createEvent(formData);
      if ('data' in response) {
        // Handle success
        refetch();
      } else if ('error' in response) {
        console.error('Error creating event:', response.error);
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };


	return (
		<AppLayout>
			<ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }} className="py-3">
				<View className="pt-5">
					<Text className="text-2xl font-bold">Create An Event</Text>
				</View>
				<View className="h-1/6 justify-center">
					<View className="flex-row justify-between">
						{options.map((option) => (
							<FormOption
								key={option.id}
								EventType={option.label}
								isSelected={selectedOption === option.id}
								onSelect={() => {
									setSelectedOption(option.id);
									handleInputChange('event_type', option.label);
								}}
							/>
						))}
					</View>
				</View>
				<View className="h-1/4 justify-between p-2">
					<View className="h-2/5">
						<InputField
							handleInputChange={handleInputChange}
							name="description"
							value={trainingForm.description}
							placeholder="Enter a description..."
							additionalStyles=""
							placeholderTextColor="light"
						/>
					</View>
					<View className="h-2/5">
						<InputField
							handleInputChange={handleInputChange}
							name="place"
							value={trainingForm.place}
							placeholder="Enter a location..."
							additionalStyles=""
							placeholderTextColor="light"
						/>
					</View>
				</View>
				<View className="h-1/6 justify-between">
					<DateTimeSelection
						label="Starts"
						date={trainingForm.start_date}
						time={trainingForm.start_time}
						onDateChange={(date) => handleInputChange('start_date', date)}
						onTimeChange={(time) => handleInputChange('start_time', time)}
					/>
					<DateTimeSelection
						label="Ends"
						date={trainingForm.end_date}
						time={trainingForm.end_time}
						onDateChange={(date) => handleInputChange('end_date', date)}
						onTimeChange={(time) => handleInputChange('end_time', time)}
					/>
				</View>
				<View className="h-1/6">
					<InputField
						handleInputChange={handleInputChange}
						name="creator_id"
						placeholder="Enter a description..."
						additionalStyles="items-start p-2"
						placeholderTextColor="light"
					/>
				</View>
				<TouchableOpacity
					className="bg-dacka-green p-3 rounded-xl items-center"
					onPress={postForm}
				>
					<Text className="text-white font-bold">Submit</Text>
				</TouchableOpacity>
			</ScrollView>
		</AppLayout>
	);
};

export default CoachAddTrainingPage;
