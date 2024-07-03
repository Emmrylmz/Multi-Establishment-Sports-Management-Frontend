import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { addTrainingPageTexts } from '../../../utils/constants/texts';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
	useCreateEventMutation,
	useListEventsQuery,
} from '../../../features/query/eventQueryService';
import { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { useSelector } from 'react-redux';
import FormOption from '../../components/ui/Form/FormOption';

// Define the formatDate function
function formatDate(dateString) {
	const date = new Date(dateString);

	// Options for toLocaleString method
	const options = {
		weekday: 'short', // "Thu"
		day: '2-digit', // "04"
		month: '2-digit', // "06" (numeric representation of July)
		year: 'numeric', // "2024"
		hour: '2-digit', // "21"
		minute: '2-digit', // "50"
	};

	// Format the date part
	const formattedDatePart = date.toLocaleDateString('en-US', options);

	// Format the time part
	const formattedTimePart = date.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	});

	// Combine the formatted parts
	const formattedDate = `${formattedDatePart.split(',')[0]} ${date.getDate().toString().padStart(2, '0')} ${date.getMonth() + 1} ${date.getFullYear()} ${formattedTimePart}`;

	return formattedDate;
}

const CoachAddTrainingPage = ({ route }) => {
	const user = useSelector((state: RootState) => getAuthUser(state));
	const { team_id, attendanceList } = route.params;
	const dateNow = new Date();
	const [createEvent] = useCreateEventMutation();
	const { refetch } = useListEventsQuery([team_id]);

	const [trainingForm, setTrainingForm] = useState({
		event_type: 'Game',
		creator_id: '661b00b9c379ef519deaad39',
		place: 'Stadium XYZ',
		event_date: '',
		created_at: '2024-05-11T13:34:45.149000',
		team_id: team_id,
		description: 'Annual championship game',
	});

	const handleDateChange = (date: Date | undefined, name: string) => {
		setTrainingForm((prevState) => ({
			...prevState,
			[name]: date,
		}));
	};

	const postForm = async () => {
		try {
			const response = await createEvent(trainingForm); // Call the createEvent mutation with the trainingForm data
			if ('data' in response) {
				// Handle success
			} else if ('error' in response) {
				console.error('Error creating event:', response.error); // Log the error if there's an error
			}
		} catch (error) {
			console.error('Error creating event:', error); // Log any unexpected errors
		}
		refetch();
	};

	const eventTypes = [
		{ label: 'Team Training', value: 1 },
		{ label: 'Meeting', value: 2 },
		{ label: 'Weight Lifting', value: 3 },
	];

	const trainingLocations = [
		{ label: 'Ege Üni. Büyük S.S.', value: 1 },
		{ label: 'Ege Üni. Büyük S.S. üst kat', value: 2 },
		{ label: 'Ege Üni. 50. Yıl S.S.', value: 3 },
		{ label: 'Ege Üni. Spor Bil. Fak. Top. Sal.', value: 4 },
		{ label: 'Ege Üni. Spor Bil. Fak. Fit. Sal.', value: 5 },
		{ label: 'Bornova Anadolu Lisesi', value: 6 },
		{ label: 'Ege Üni. Atletizm Pisti', value: 7 },
	];

	const [showDate, setShowDate] = useState(false);
	const [showTime, setShowTime] = useState(false);
	const [selectedOption, setSelectedOption] = useState<number | null>(null);

	const options: OptionType[] = [
		{ id: 1, label: 'Training' },
		{ id: 2, label: 'Game' },
	];

	return (
		<AppLayout>
			<View className=" gap-y-3 bg-blue-500">
				<View>
					<Text className="text-2xl font-bold ">Create An Event</Text>
				</View>
				<View className=" flex-row justify-between bg-red-500">
					{options.map((option) => (
							<FormOption
								key={option.id}
								EventType={option.label}
								isSelected={selectedOption === option.id}
								onSelect={() => setSelectedOption(option.id)}
							/>
					))}
				</View>
			</View>
		</AppLayout>
	);
};

export default CoachAddTrainingPage;
