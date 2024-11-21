import { View, SafeAreaView, Image, StatusBar, Text, Dimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './index.styles'
import { images } from '../../constant'
import FastImage from 'react-native-fast-image'
import { SingleTopView } from '../../screens/Exams/components'

const Container = ({ children, HomeView, isHome, isExam, title, textStyle }) => {
    const [isLandScape, setIsLandScape] = useState(false)

    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    useEffect(() => {
        Dimensions.addEventListener('change', () => {
            setIsLandScape(isPortrait() ? false : true)
        });

    }, [Dimensions])

    return (
        <SafeAreaView style={styles.main_view} >
            <StatusBar barStyle={"light-content"} backgroundColor={"rgba(0,0,0,0.9)"} />
            <FastImage style={styles.main_view}
                source={images.home_background_image} >

                <View style={styles.logo_view} >
                    <Image resizeMode='contain' source={images.logo} style={styles.logo} />
                </View>
                <View style={{
                    height: isLandScape ? "23%" : "17%",
                }} >
                    {
                        isHome ?
                            <HomeView />
                            :
                            isExam ?
                                <>
                                    <View style={styles.top_row} >
                                        <SingleTopView image={images.cono_exam_image} text={"Conocimientos"} />
                                        <SingleTopView image={images.english_exam_image} text={"Inglés"} />
                                        <SingleTopView image={images.psico_exam_image} text={"Psicotécnicos"} />
                                        <SingleTopView image={images.orto_exam_image} text={"Ortografía"} />
                                    </View>
                                    <Text style={styles.exam_heading} >{title}</Text>
                                </>
                                :
                                <Text style={[styles.heading, textStyle]} >{title}</Text>
                    }
                </View>

                <View style={styles.sub_view} >
                    {children}
                </View>

            </FastImage>
        </SafeAreaView>
    )
}

export default Container