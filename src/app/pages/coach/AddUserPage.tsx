import React, { useState, useRef, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Animated,
	Image,
	Dimensions,
} from 'react-native';
import AppLayout from '../../components/layout/AppLayout';
import InputField from '../../components/ui/Form/InputField';
import { addUserPageTexts } from '../../../utils/constants/texts';
import {
	FontAwesome,
	Feather,
	MaterialIcons,
	Ionicons,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const AddUserPage = () => {
	type AddUserForm = {
		name: string;
		email: string;
		password: string;
		phone: string;
		address: string;
		city: string;
		birthDate: string;
		school: string;
	};

	const [form, setForm] = useState<AddUserForm>({
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

	const fieldIcons = {
		name: <FontAwesome name="user" size={24} color="#919191" />,
		email: <FontAwesome name="envelope" size={24} color="#919191" />,
		password: <Feather name="lock" size={24} color="#919191" />,
		phone: <FontAwesome name="phone" size={24} color="#919191" />,
		address: <FontAwesome name="home" size={24} color="#919191" />,
		city: <MaterialIcons name="location-city" size={24} color="#919191" />,
		birthDate: <FontAwesome name="birthday-cake" size={24} color="#919191" />,
		school: <Ionicons name="school" size={24} color="#919191" />,
	};

	const fadeAnim = useRef(new Animated.Value(0)).current;
	const scaleAnim = useRef(new Animated.Value(0.9)).current;

	React.useEffect(() => {
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}),
			Animated.spring(scaleAnim, {
				toValue: 1,
				friction: 4,
				useNativeDriver: true,
			}),
		]).start();
	}, []);

	const buttonScale = useRef(new Animated.Value(1)).current;

	const handleSubmit = () => {
		Animated.sequence([
			Animated.timing(buttonScale, {
				toValue: 0.95,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(buttonScale, {
				toValue: 1,
				duration: 100,
				useNativeDriver: true,
			}),
		]).start();
		// Handle form submission logic here
	};
	const scrollY = useRef(new Animated.Value(0)).current;
	const headerHeight = SCREEN_HEIGHT * 0.35;

	const imageScale = scrollY.interpolate({
		inputRange: [0, headerHeight],
		outputRange: [1, 1.5],
		extrapolate: 'clamp',
	});

	const imageOpacity = scrollY.interpolate({
		inputRange: [0, headerHeight],
		outputRange: [1, 0],
		extrapolate: 'clamp',
	});

	return (
		<LinearGradient
			colors={['#ffffff', '#4ca2d5', '#3FA454']}
			className="flex-1"
		>
				<Animated.ScrollView
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: scrollY } } }],
						{ useNativeDriver: false }
					)}
					scrollEventThrottle={16}
				>
					<View style={{ height: headerHeight, overflow: 'hidden' }} >
						<Animated.Image
							source={require('../../../assets/Mobile login-amico.png')} // Replace with your actual illustration
							style={{
								width: '100%',
								height: '100%',
								transform: [{ scale: imageScale }],
								opacity: imageOpacity,
							}}
							resizeMode="cover"
						/>
					</View>

					<View className="rounded-t-3xl  p-4">
						<Text className="text-3xl font-bold text-center text-[#3FA454] ">
							{addUserPageTexts.title}
						</Text>
						<View className="">
							<Text className="text-3xl ">
								Sign user up !!
							</Text>
						</View>
						{Object.keys(form).map((key) => (
							<View key={key} className="mb-4 p-4 h-20">
								<InputField
									name={key}
									placeholder={addUserPageTexts[`${key}Placeholder`]}
									placeholderTextColor="dark"
									additionalStyles="bg-gray-100 text-gray-800 border border-gray-300"
									keyboardType={
										key === 'email'
											? 'email-address'
											: key === 'phone'
												? 'phone-pad'
												: 'default'
									}
									secureTextEntry={key === 'password'}
									handleInputChange={handleInputChange}
									icon={fieldIcons[key as keyof AddUserForm]}
								/>
							</View>
						))}

						<TouchableOpacity
							className="w-full px-6 py-3 rounded-xl bg-[#4ca2d5] items-center mt-6"
							onPress={handleSubmit}
						>
							<Text className="text-lg font-semibold text-white">
								{addUserPageTexts.submitButton}
							</Text>
						</TouchableOpacity>
					</View>
				</Animated.ScrollView>
		</LinearGradient>
	);
};

export default AddUserPage;
