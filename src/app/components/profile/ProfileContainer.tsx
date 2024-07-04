import * as React from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList  } from 'react-native';
import AppLayout from '../layout/AppLayout';
import BigCircle from './BigCircle';
import UserImage from './UserImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Info from './Info';
import Carousel from 'react-native-reanimated-carousel';
import { UserType } from '../../../types/User'; // Import the User type
import AttendanceBars from '../ui/attendance/AttendanceBars';
import AttendanceCard from '../ui/attendance/AttendanceCard';


type UserProfilePageProps = {
    user: UserType;
};

const ProfileContainer: React.FC<UserProfilePageProps> = ({ user }) => {
    const { width: viewportWidth } = Dimensions.get('window');

    const groupedInfo = [
        {
            title: 'Personal Information',
            data: [
                { label: 'Name', value: user?.name || 'N/A' },
                { label: 'Age', value: user?.age?.toString() || 'N/A' },
                { label: 'Height', value: `${user?.height || 'N/A'} cm` },
                { label: 'Weight', value: `${user?.weight || 'N/A'} kg` },
            ]
        },
        {
            title: 'Training Information',
            data: [
                { label: 'Present Training Events', value: user?.present_training_events?.toString() || 'N/A' },
                { label: 'Total Training Events', value: user?.total_training_events?.toString() || 'N/A' },
                { label: 'Training Attendance Ratio', value: user?.training_attendance_ratio?.toString() || 'N/A' },
                { label: 'Present Game Events', value: user?.present_game_events?.toString() || 'N/A' },
                { label: 'Total Game Events', value: user?.total_game_events?.toString() || 'N/A' },
                { label: 'Game Attendance Ratio', value: user?.game_attendance_ratio?.toString() || 'N/A' },
            ]
        },
        {
            title: 'Contact Information',
            data: [
                { label: 'Email', value: user?.email || 'N/A' },
            ]
        },
        {
            title: 'Training Attendance',
            component: <AttendanceBars title="Training Attendance" attendandPercentage={user?.training_attendance_percentage || 70} />
        },
        {
            title: 'Game Attendance',
            component: <AttendanceCard title="Game Attendance" absent={user?.absent_games || 2} attended={user?.present_games || 10} />
        }
    ];

    const renderGroupItem = ({ item }) => (
        <View className="flex-1 rounded-lg p-5 mx-2 shadow-lg">
            <Text className="text-2xl font-bold text-start mb-2">{item.title}</Text>
            {item.data ? (
                item.data.map((info, index) => (
                    <View key={index} className="flex-row justify-between py-2">
                        <Text className="text-lg font-bold">{info.label}</Text>
                        <Text className="text-lg">{info.value}</Text>
                    </View>
                ))
            ) : (
                item.component
            )}
        </View>
    );

    const roleIcon = user?.role === 'Player' ? 'basketball' : 'whistle'; // Define icons based on role

    return (
        <>
            <BigCircle />
            <AppLayout>
                <View className="h-1/2 justify-end items-center">
                    <UserImage url={user?.photo || '../../assets/user.png'} />
                    <View className="items-center pb-5">
                        <Text className="text-3xl font-bold text-center">{user?.name || 'N/A'}</Text>
                        <View className="flex-row items-center pt-2">
                            <Icon name={roleIcon} size={24} color="black" className="opacity-50" />
                            <Text className="text-xl font-normal text-center opacity-50 pl-2">{user?.role || 'N/A'}</Text>
                        </View>
                    </View>
                </View>

                <View className="flex-1 items-center">
                    <Carousel
                        loop={false}
                        width={viewportWidth}
                        height={viewportWidth * 0.75}
                        data={groupedInfo}
                        scrollAnimationDuration={1000}
                        renderItem={renderGroupItem}
                    />
                </View>
            </AppLayout>
        </>
    );
};

export default ProfileContainer;