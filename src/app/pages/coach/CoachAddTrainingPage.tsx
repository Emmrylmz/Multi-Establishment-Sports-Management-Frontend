import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
} from 'react-native';
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

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

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

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = SCREEN_HEIGHT * 0.33;

  const formRef = useRef(trainingForm);

  useEffect(() => {
    formRef.current = trainingForm;
  }, [trainingForm]);

  const postForm = async () => {
    try {
      const response = await createEvent({
        ...formRef.current,
        start_date: date.start_date,
        start_time: date.start_time,
        end_date: date.end_date,
        end_time: date.end_time,
      }).unwrap();
      
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
        <AnimatedHeader
          imageSource={require('../../../assets/Generating new leads-bro.png')}
          scrollY={scrollY}
          headerHeight={headerHeight}
        />

        <View className="rounded-t-3xl bg-white p-6">
          <Text className="text-3xl font-bold text-center text-[#3FA454] mb-6">
            Add New Event
          </Text>

          <View>
            <Text className="text-lg font-bold mb-3 text-gray-800">
              Event Type
            </Text>
            <OptionSelector
              eventType={trainingForm.event_type}
              onEventTypeChange={(type) => handleInputChange('event_type', type)}
            />

            <InputField
              handleInputChange={handleInputChange}
              name="place"
              value={trainingForm.place}
              placeholder="Enter a location..."
              additionalStyles="bg-gray-200 rounded-lg py-3 px-4 mb-4"
              placeholderTextColor="#999"
            />

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

            <InputField
              handleInputChange={handleInputChange}
              name="description"
              value={trainingForm.description}
              placeholder="Enter a description..."
              additionalStyles="bg-gray-200 rounded-lg py-3 px-4 mb-6 h-24"
              placeholderTextColor="#999"
              multiline
            />

            <SubmitButton
              onPress={postForm}
              title="Create Event"
            />
          </View>
        </View>
      </Animated.ScrollView>

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
    </LinearGradient>
  );
};

export default CoachAddTrainingPage;