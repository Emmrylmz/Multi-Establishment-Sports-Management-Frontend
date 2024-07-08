import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedHeader from '../../components/ui/Form/AnimatedHeader';
import FormSection from '../../components/ui/Form/FormSection';
import { fieldIcons } from '../../components/ui/Form/FormConfig';
import SubmitButton from '../../components/ui/Form/SubmitButton';
import GoBackButton from '../../components/ui/GoBackButton';

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
		<View className="flex-1">
			<LinearGradient
				colors={['#00897B', '#3FA454']}
				className="absolute top-0 left-0 right-0 rounded-b-2xl "
				style={{ height: headerHeight }}
			>
				<AnimatedHeader
					imageSource={require('../../../assets/Mobile login-amico.png')}
					scrollY={scrollY}
					headerHeight={headerHeight}
				/>
			</LinearGradient>

			<Animated.ScrollView
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: false }
				)}
				scrollEventThrottle={16}
				className="flex-1"
				contentContainerStyle={{ paddingTop: headerHeight }}
			>
				<View className="bg-gray-100 px-6 pt-8 pb-6  shadow-md">
					<Text className="text-xl font-semibold text-gray-700 mb-6">
						User Information
					</Text>

					<FormSection
						form={form}
						fieldIcons={fieldIcons}
						handleInputChange={handleInputChange}
					/>

					<SubmitButton onPress={handleSubmit} title="Create User" />
				</View>
			</Animated.ScrollView>
		</View>
	);
};

export default AddUserPage;
