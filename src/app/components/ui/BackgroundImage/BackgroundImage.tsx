import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { styled } from 'nativewind';

const BackgroundImage = ({ children, additionalStyles }) => {
	const StyledImageBackground = styled(ImageBackground);

	return (
			<StyledImageBackground
				source={require('../../../../assets/background.png')}
				style={styles.backgroundImage}
				className={additionalStyles}
			>
				{children}
			</StyledImageBackground>
	);
};

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		width: '100%',
		height: '100%',
		zIndex: -1,
	},
});

export default BackgroundImage;
