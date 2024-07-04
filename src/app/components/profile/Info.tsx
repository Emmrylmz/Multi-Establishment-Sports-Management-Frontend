import { View, Text } from 'react-native';
import React from 'react';

type InfoProps = {
    key:string,
    value:string
};

const Info: React.FC<InfoProps> = ({label,value}) => {
	return (
		<View className="flex-row  rounded-lg justify-between p-4">
			<Text className="text-lg">{label} : </Text>
            <Text className="text-lg">{value}</Text>
		</View>
	);
};

export default Info;
