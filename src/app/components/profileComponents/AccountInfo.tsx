// AccountInfo.tsx
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import UserInfoItem from './UserInfoItem'; // Ensure the path is correct

interface User {
	name: string;
	email: string;
}

interface AccountInfoProps {
	user: User | null;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ user }) => (
	<ScrollView className="w-10/12 flex-1 " showsVerticalScrollIndicator={false}>
		<Text className="text-2xl">Account Info</Text>

		{user && (
			<>
				<UserInfoItem label="Name" value={user.name} />
				<UserInfoItem label="Email" value={user.email} />
				<UserInfoItem label="Email" value={user.email} />
				<UserInfoItem label="Email" value={user.email} />
				<UserInfoItem label="Email" value={user.email} />
				<UserInfoItem label="Email" value={user.email} />
				<UserInfoItem label="Email" value={user.email} />
			</>
		)}

		{/* Add more fields as needed */}
	</ScrollView>
);

export default AccountInfo;
