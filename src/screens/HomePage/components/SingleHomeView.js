import React, { useCallback, useRef } from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { COLORS, SIZES } from '../../../constant';
import { fonts } from '../../../utils';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP } from '../../../Component/MakeMeResponsive';

const SingleHomeView = ({ image, title, array, isOpen, setIsOpen, onPress, onPressList }) => {


    const { meeting_status } = useSelector(state => state.classes)
    const animatedValue = useRef(new Animated.Value(0)).current;

    useFocusEffect(
        useCallback(() => {
            if (meeting_status?.status) {
                // Start the animation loop
                Animated.loop(
                    Animated.timing(animatedValue, {
                        toValue: 1,
                        duration: 3000, // Speed of the border movement
                        useNativeDriver: true,
                    })
                ).start();
            }
        }, [animatedValue, meeting_status?.status, meeting_status])
    )


    // Interpolate the animated value to create the moving dash effect
    const borderShift = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'], // Full circle rotation
    });


    return (
        <View style={styles.main_view}>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                    setIsOpen();
                    onPressList()
                }}
                style={styles.top_row}
            >
                <View style={styles.image_view}>
                    <Image source={image} style={styles.image} />
                </View>
                <View style={styles.text_view}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </TouchableOpacity>

            {isOpen && (
                <FlatList
                    data={array}
                    nestedScrollEnabled // Allow nested scrolling
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item?.id?.toString()}

                    renderItem={({ item }) => {
                        return (


                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => {
                                    setIsOpen();
                                    onPress(item?.type);
                                }}
                                style={styles.sub_row}
                            >
                                {
                                    meeting_status?.status && item?.type === 'directo' &&
                                    <Animated.View
                                        style={[
                                            {
                                                position: 'absolute',
                                                width: 85,
                                                height: 85,
                                                borderRadius: 100,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                left: -1,
                                                top: -8
                                            },
                                            { transform: [{ rotate: borderShift }] }, // Rotating the border
                                        ]}
                                    >
                                        <LinearGradient
                                            colors={['#ff0000', '#ff000050',]} // Gradient border colors
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: 110,
                                                // borderWidth: 5,
                                                // borderColor: 'red',
                                            }}
                                        >

                                        </LinearGradient>
                                    </Animated.View>
                                }
                                <View style={styles.sub_image_view}>
                                    <Image source={item?.image} style={styles.sub_image} />
                                </View>
                                <View style={styles.sub_text_view}>
                                    <Text style={styles.sub_title}>{item?.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            )}
        </View>
    );
};

export default SingleHomeView;

const styles = StyleSheet.create({
    main_view: {
        marginTop: 20,
    },
    top_row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.padding2 * 1.5,
    },
    image_view: {
        height: 100,
        width: 100,
        borderRadius: 80,
        shadowColor: '#ffffff',
        shadowOffset: { width: 2, height: -2 },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 80,
    },
    text_view: {
        flex: 1,
        marginTop: -SIZES.padding2 * 1.5,
        marginLeft: SIZES.padding,
    },
    title: {
        color: COLORS.white,
        fontSize: SIZES.h28,
        fontFamily: fonts.novaRegular,
    },
    sub_row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: "20%",
    },
    sub_image_view: {
        height: 80,
        width: 80,
        borderRadius: 80,
        shadowColor: '#ffffff',
        shadowOffset: { width: 2, height: -2 },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
    },
    sub_image: {
        height: '100%',
        width: '100%',
        borderRadius: 80,
    },
    sub_text_view: {
        flex: 1,
        marginTop: -SIZES.padding2 * 1.5,
        marginLeft: SIZES.padding2,
    },
    sub_title: {
        color: COLORS.white,
        fontSize: SIZES.h18,
        fontFamily: fonts.novaRegular,
    },
});
