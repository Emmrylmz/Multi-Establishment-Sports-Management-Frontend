// AccountInfo.tsx
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import UserInfoItem from './UserInfoItem'; // Ensure the path is correct
import { accountInfoTexts } from '../../../utils/constants/texts';
import PagerView from 'react-native-pager-view';

type User = {
	name: string;
	email: string;
	role: string;
	photo: string;
}

type AccountInfoProps = {
	user: User | null;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ user }) => {
	return(
		<>
			{user && (
				<PagerView className='flex-1 p-4 mt-4' style={{borderRadius: 38}} initialPage={0} scrollEnabled={true} useNext={true} overdrag={true}>
					<ScrollView key="1" className='px-4 py-2 overflow-hidden rounded-3xl' showsVerticalScrollIndicator={false}>
						<Text className='text-base font-medium text-center text-white'>Account information</Text>
						<UserInfoItem label={accountInfoTexts.name} value={user.name} />
						<UserInfoItem label={accountInfoTexts.email} value={user.email} />
						<UserInfoItem label={accountInfoTexts.password} value={user.email} />
						<UserInfoItem label={accountInfoTexts.phone_number} value={user.email} />
					</ScrollView>

					<ScrollView key="2" className='px-4 py-2'>
						<Text className='text-base font-medium text-center text-white'>Player information</Text>
						<UserInfoItem label="Height" value="1.92 cm" />
						<UserInfoItem label="Weight" value="100 kg" />
						<UserInfoItem label="Date of Birth" value="19.05.2002" />
						<UserInfoItem label="Nationality" value="Türkiye" />
					</ScrollView>
					<ScrollView key="3" className='px-4 py-2'>
						<Text className='text-base font-medium text-center text-white'>Family information</Text>
						<UserInfoItem label="Father Name" value="Baba ismi" />
						<UserInfoItem label="Contact info" value="0505 123 4567" />
						<UserInfoItem label="Mother Name" value="Anne ismi" />
						<UserInfoItem label="Contact info" value="0530 456 7890" />
					</ScrollView>
				</PagerView>
			)}
		</>
	)
};

export default AccountInfo;
