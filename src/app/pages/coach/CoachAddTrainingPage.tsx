import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppLayout from '../../components/layout/AppLayout';
import {
	useCreateEventMutation,
	useListEventsQuery,
} from '../../../features/query/eventQueryService';
import { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { useSelector } from 'react-redux';
import { InputField } from '../../components';
import DateTimeSelection from '../../components/ui/Form/DateTimeSelection';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SuccessModal from '../../components/ui/Modals/SuccessModal';
import FailureModal from '../../components/ui/Modals/FailureModal';

const CoachAddTrainingPage = ({ route, navigation }) => {
	const user = useSelector((state: RootState) => getAuthUser(state));
	const { team_id } = route.params;
	const dateNow = new Date();
	const [createEvent] = useCreateEventMutation();
	const { refetch } = useListEventsQuery([team_id]);

	const [trainingForm, setTrainingForm] = useState({
		event_type: 'Training',
		creator_id: user ? user._id : '',
		place: '',
		created_at: new Date().toISOString(),
		team_id: team_id,
		description: '',
	});

	const [date, setDate] = useState({
		start_date: dateNow,
		start_time: dateNow,
		end_date: dateNow,
		end_time: dateNow,
	});
	const [successModalVisible, setSuccessModalVisible] = useState(false);
	const [failureModalVisible, setFailureModalVisible] = useState(false);

	const handleInputChange = (name, value) => {
		setTrainingForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleDateChange = (name, value) => {
		setDate((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const combineDateAndTime = (date, time) => {
		const combined = new Date(date);
		combined.setHours(time.getHours());
		combined.setMinutes(time.getMinutes());
		return combined;
	};

	const postForm = async () => {
		const startDateTime = combineDateAndTime(date.start_date, date.start_time);
		const endDateTime = combineDateAndTime(date.end_date, date.end_time);

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
				setSuccessModalVisible(true);
				refetch();
			} else if ('error' in response) {
				setFailureModalVisible(true);

				console.error('Error creating event:', response.error);
			}
		} catch (error) {
			console.error('Error creating event:', error);
		}
	};

	const handleSuccessClose = () => {
		setSuccessModalVisible(false);
		navigation.goBack(); // Or navigate to a different screen if needed
	};

	const handleFailureClose = () => {
		setFailureModalVisible(false);
	};

	return (
		<ScrollView className="flex-1 bg-gray-100">
			<LinearGradient
				colors={['#4ca2d5', '#3FA454']}
				className="h-48 justify-center items-center"
			>
				<Image
					source={require('../../../assets/Generating new leads-bro.png')}
					className="w-full h-full mb-2"
				/>
				<Text className="text-2xl font-bold text-white">Add New Event</Text>
			</LinearGradient>

			<View className="bg-white -mt-6 rounded-t-3xl px-6 pt-8 pb-6">
				<Text className="text-lg font-bold mb-3 text-gray-800">Event Type</Text>
				<View className="flex-row justify-between mb-6">
					{['Training', 'Game'].map((type) => (
						<TouchableOpacity
							key={type}
							className={`flex-row items-center bg-gray-200 py-3 px-6 rounded-full flex-1 mx-1 ${trainingForm.event_type === type ? 'bg-blue-500' : ''}`}
							onPress={() => handleInputChange('event_type', type)}
						>
							<Icon
								name={type === 'Training' ? 'whistle' : 'basketball'}
								size={24}
								color={trainingForm.event_type === type ? '#fff' : '#4ca2d5'}
							/>
							<Text
								className={`ml-2 font-bold ${trainingForm.event_type === type ? 'text-white' : 'text-blue-500'}`}
							>
								{type}
							</Text>
						</TouchableOpacity>
					))}
				</View>

				<InputField
					handleInputChange={handleInputChange}
					name="place"
					value={trainingForm.place}
					placeholder="Enter a location..."
					additionalStyles="bg-gray-200 rounded-lg py-3 px-4 mb-4"
					placeholderTextColor="#999"
				/>

				<View className="mb-4">
					<DateTimeSelection
						label="Starts"
						date={date.start_date}
						time={date.start_time}
						onDateChange={(date) => handleDateChange('start_date', date)}
						onTimeChange={(time) => handleDateChange('start_time', time)}
					/>
					<DateTimeSelection
						label="Ends"
						date={date.end_date}
						time={date.end_time}
						onDateChange={(date) => handleDateChange('end_date', date)}
						onTimeChange={(time) => handleDateChange('end_time', time)}
					/>
				</View>

				<InputField
					handleInputChange={handleInputChange}
					name="description"
					placeholder="Enter a description..."
					additionalStyles="bg-gray-200 rounded-lg py-3 px-4 mb-6 h-24"
					placeholderTextColor="#999"
					multiline
				/>

				<TouchableOpacity
					className="bg-green-500 rounded-lg py-4 items-center"
					onPress={postForm}
				>
					<Text className="text-white font-bold text-lg">Create Event</Text>
				</TouchableOpacity>
			</View>
			<SuccessModal
				visible={successModalVisible}
				onClose={handleSuccessClose}
				message="Event created successfully!"
			/>

			<FailureModal
				visible={failureModalVisible}
				onClose={handleFailureClose}
				message="Failed to create event. Please try again."
			/>
		</ScrollView>
	);
};

export default CoachAddTrainingPage;
