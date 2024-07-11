// AddUserPage.tsx
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, Dimensions, ScrollView } from 'react-native';
import FormSection from '../../components/ui/Form/FormSection';
import { fieldIcons } from '../../components/ui/Form/FormConfig';
import SubmitButton from '../../components/ui/Form/SubmitButton';
import GoBackButton from '../../components/ui/GoBackButton';
import AnimatedHeader from '../../components/ui/Form/AnimatedHeader';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const AddUserPage = () => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		phone: '',
		address: '',
		city: '',
		birthDate: '',
		school: '',
	});

	const handleInputChange = (name: string, value: string) => {
		setForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const scrollY = useRef(new Animated.Value(0)).current;
	const headerHeight = SCREEN_HEIGHT * 0.33;

	const formRef = useRef(form);

	useEffect(() => {
		formRef.current = form;
	}, [form]);

	const handleSubmit = () => {
		console.log('Form submitted:', formRef.current);
	};

	return (
		<View className="flex-1 bg-gray-100">
			<AnimatedHeader
				scrollY={scrollY}
				headerHeight={headerHeight}
				imageSource={require('../../../assets/Mobile login-amico.png')}
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
				<View className="px-4 py-8">
					<View className="p-6 mb-6 bg-white shadow-md rounded-xl">
						<Text className="mb-6 text-2xl font-bold text-gray-800">
							User Information
						</Text>

						<FormSection
							form={form}
							fieldIcons={fieldIcons}
							handleInputChange={handleInputChange}
						/>
					</View>

					<View className="p-6 mb-6 bg-white shadow-md rounded-xl">
						<Text className="mb-4 text-xl font-semibold text-gray-700">
							Additional Details
						</Text>

						{/* Add any additional fields or information here */}
						<Text className="mb-2 text-gray-600">
							Please ensure all information is accurate and up-to-date.
						</Text>
					</View>

					<SubmitButton
						onPress={handleSubmit}
						title="Create User"
						className="py-4 bg-teal-600 shadow-md rounded-xl"
						textClassName="text-white font-bold text-lg"
					/>
				</View>
			</Animated.ScrollView>

			<GoBackButton className="absolute z-20 top-12 left-4" />
		</View>
	);
};

export default AddUserPage;
