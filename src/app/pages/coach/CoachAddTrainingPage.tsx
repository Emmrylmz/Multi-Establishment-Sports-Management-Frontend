import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import {
	useCreateEventMutation,
	useListEventsQuery,
} from '../../../features/query/eventQueryService';
import { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import InputField from '../../components/ui/Form/InputField';
import DateTimeSelection from '../../components/ui/Form/DateTimeSelection';
import SuccessModal from '../../components/ui/Modals/SuccessModal';
import FailureModal from '../../components/ui/Modals/FailureModal';
import OptionSelector from '../../components/ui/Form/OptionSelector';
import AnimatedHeader from '../../components/ui/Form/AnimatedHeader';
import SubmitButton from '../../components/ui/Form/SubmitButton';
import GoBackButton from '../../components/ui/GoBackButton';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const CoachAddTrainingPage = ({ route, navigation }) => {
	const user = useSelector((state: RootState) => getAuthUser(state));
	const { team_id } = route.params;
	const dateNow = new Date();
	const [createEvent] = useCreateEventMutation();
	const { refetch } = useListEventsQuery([team_id]);

	const [eventForm, setEventForm] = useState({
		event_type: 'Training',
		place: '',
		description: '',
		team_id: team_id,
		creator_id: user ? user._id : '',
		creator_name: user ? user.name : '',
	});

	const [dateTime, setDateTime] = useState({
		start_date: dateNow,
		start_time: dateNow,
		end_date: dateNow,
		end_time: new Date(dateNow.getTime() + 60 * 60 * 1000), // Default to 1 hour later
	});

	const [successModalVisible, setSuccessModalVisible] = useState(false);
	const [failureModalVisible, setFailureModalVisible] = useState(false);

	const handleInputChange = (name, value) => {
		setEventForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleDateTimeChange = (name, value) => {
		setDateTime((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const scrollY = useRef(new Animated.Value(0)).current;
	const headerHeight = SCREEN_HEIGHT * 0.4;

	const formRef = useRef(eventForm);
	const dateTimeRef = useRef(dateTime);

	useEffect(() => {
		formRef.current = eventForm;
	}, [eventForm]);

	useEffect(() => {
		dateTimeRef.current = dateTime;
	}, [dateTime]);

	const mergeDateAndTime = (date, time) => {
		const mergedDate = new Date(date);
		mergedDate.setHours(
			time.getHours(),
			time.getMinutes(),
			time.getSeconds(),
			time.getMilliseconds()
		);
		return mergedDate.toISOString();
	};

	const postForm = async () => {
		try {
			const startDateTime = mergeDateAndTime(
				dateTimeRef.current.start_date,
				dateTimeRef.current.start_time
			);
			const endDateTime = mergeDateAndTime(
				dateTimeRef.current.end_date,
				dateTimeRef.current.end_time
			);

			const eventData = {
				...formRef.current,
				start_datetime: startDateTime,
				end_datetime: endDateTime,
				created_at: new Date().toISOString(),
			};

			const response = await createEvent(eventData).unwrap();

			if (response) {
				setSuccessModalVisible(true);
				await refetch();
			}
		} catch (error) {
			setFailureModalVisible(true);
		}
	};

	const handleSuccessClose = () => {
		setSuccessModalVisible(false);
		navigation.goBack();
	};

	const handleFailureClose = () => {
		setFailureModalVisible(false);
	};

	const eventTypes = ['Training', 'Game'];
	const locationOptions = ['Main Field', 'Practice Field', 'Gym', 'Other'];

	return (
		<View className="flex-1 bg-gray-100">
			<AnimatedHeader
				scrollY={scrollY}
				headerHeight={headerHeight}
				imageSource={require('../../../assets/Generating new leads-bro.png')}
				gradientColors={['#00897B', '#3FA454']}
			/>

			<Animated.ScrollView
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: false }
				)}
				scrollEventThrottle={16}
				className="flex-1"
				contentContainerStyle={{ paddingTop: headerHeight }}
			>
				<View className="px-5 py-5">
					<View className="bg-white rounded-xl shadow-md p-6 mb-6">
						<Text className="text-2xl font-bold text-gray-800 mb-6">
							Event Details
						</Text>

						<Text className="text-lg font-semibold text-gray-700 mb-2">
							Event Type
						</Text>
						<OptionSelector
							options={eventTypes}
							selectedOption={eventForm.event_type}
							onOptionChange={(type) => handleInputChange('event_type', type)}
							className="mb-4"
						/>

						<Text className="text-lg font-semibold text-gray-700 mb-2">
							Location
						</Text>
						<OptionSelector
							options={locationOptions}
							selectedOption={eventForm.place}
							onOptionChange={(place) => handleInputChange('place', place)}
							className="mb-4"
						/>

						{eventForm.place === 'Other' && (
							<InputField
								handleInputChange={handleInputChange}
								name="place"
								value={eventForm.place}
								placeholder="Enter a custom location..."
								additionalStyles="rounded-lg py-3 px-4 mb-4 bg-gray-100"
								placeholderTextColor="#999"
							/>
						)}

						<DateTimeSelection
							label="Starts"
							date={dateTime.start_date}
							time={dateTime.start_time}
							onDateChange={(date) => handleDateTimeChange('start_date', date)}
							onTimeChange={(time) => handleDateTimeChange('start_time', time)}
						/>
						<DateTimeSelection
							label="Ends"
							date={dateTime.end_date}
							time={dateTime.end_time}
							onDateChange={(date) => handleDateTimeChange('end_date', date)}
							onTimeChange={(time) => handleDateTimeChange('end_time', time)}
						/>

						<InputField
							handleInputChange={handleInputChange}
							name="description"
							value={eventForm.description}
							placeholder="Enter a description..."
							additionalStyles="rounded-lg py-3 px-4 mb-6 h-24 bg-gray-100"
							placeholderTextColor="#999"
							multiline
						/>
					</View>

					<View className="bg-white rounded-xl shadow-md p-6 mb-6">
						<Text className="text-xl font-semibold text-gray-700 mb-4">
							Additional Details
						</Text>
						<Text className="text-gray-600 mb-2">
							Make sure all event information is accurate and up-to-date.
						</Text>
					</View>

					<SubmitButton
						onPress={postForm}
						title="Create Event"
						className="bg-teal-600 py-4 rounded-xl shadow-md"
						textClassName="text-white font-bold text-lg"
					/>
				</View>
			</Animated.ScrollView>

			<GoBackButton className="absolute top-12 left-4 z-20" />

			<SuccessModal
				visible={successModalVisible}
				onClose={() => setSuccessModalVisible(false)}
				message="Event created successfully!"
			/>

			<FailureModal
				visible={failureModalVisible}
				onClose={() => setFailureModalVisible(false)}
				message="Failed to create event. Please try again."
			/>
		</View>
	);
};

export default CoachAddTrainingPage;
