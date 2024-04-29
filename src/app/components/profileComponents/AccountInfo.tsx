// AccountInfo.tsx
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import UserInfoItem from './UserInfoItem'; // Ensure the path is correct
import { accountInfoTexts } from '../../../utils/constants/texts';

type User = {
	name: string;
	email: string;
}

type AccountInfoProps = {
	user: User | null;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ user }) => (
	<View className='w-full h-full mt-3'>
		<Text className="text-2xl text-white">Account Info</Text>
		<ScrollView className="flex-1 w-10/12 " showsVerticalScrollIndicator={false}>

		{user && (
			<>
				<UserInfoItem label={accountInfoTexts.name} value={user.name} />
				<UserInfoItem label={accountInfoTexts.email} value={user.email} />
				<UserInfoItem label={accountInfoTexts.password} value={user.email} />
				<UserInfoItem label={accountInfoTexts.phone_number} value={user.email} />
			</>
		)}

		{/* Add more fields as needed */}
	</ScrollView>
	</View>
);

export default AccountInfo;
