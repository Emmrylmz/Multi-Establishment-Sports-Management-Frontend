import React from 'react';
import { View, Image } from 'react-native';

type UserImageProps = {
    url:string,
}

const UserImage: React.FC<UserImageProps> = ({ url }) => {
  return (
    <View className='h-44 w-44 rounded-full overflow-hidden bg-white justify-center items-center'>
      <Image
        source={require('../../../assets/user.png')}
        className='w-full h-full'
        resizeMode="cover"
      />
    </View>
  );
};

export default UserImage;