import { View, Image, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { images } from '../../constant'
import { styles } from './index.styles'
import { home_array } from '../../config'
import { SingleHomeView, TopImageView } from './components'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'
import DialogBox from '../../Component/VerPopUp'
import { navigate } from '../../navigation/navigation_service'
import HomePageFunctional from "./index.function"

const HomePage = () => {
    const {
        selectedId,
        setSelectedId,
        setShowAvatarModal,
        setShowImageModal,
        setShowRatingModal,
        setShowSliderModal,
        setShowVersionModal,
        showAvatarModal,
        showImageModal,
        showRatingModal,
        showSliderModal,
        showVersionModal,
        login
    } = HomePageFunctional()


    return (
        <SafeAreaView style={styles.main_view} >
            <FastImage style={styles.main_view}
                source={images.home_background_image} >

                <View style={styles.logo_view} >
                    <Image resizeMode='contain' source={images.logo} style={styles.logo} />
                </View>

                <View style={styles.top_row} >

                    <TouchableOpacity style={styles.user_image_view} >
                        <FastImage
                            source={login?.data?.photo ? { uri: 'https://neoestudio.net/public/userImage/' + login?.data?.photo, } : images.avatar}
                            resizeMode={FastImage.resizeMode.stretch}
                            style={styles.user_image}
                        />
                    </TouchableOpacity>
                    <View style={styles.details_row} >
                        <TopImageView
                            image={images.aspirante_image}
                            // title={'Aspirante'}
                            title={login?.data?.rank_name || 'Aspirante'}
                            title2={!login?.data?.userName ? login?.data?.name : login?.data?.userName.slice(0, 8)}
                        />
                        <TopImageView
                            image={images.clock_image}
                            title2={'Tiempo'}
                            title={parseFloat(login?.time).toFixed(2)}



                        />
                        <TopImageView
                            image={images.aptos_image}
                            title={login?.data?.aptos || 0}
                            title2={'Aptos'}
                        />
                        <TopImageView
                            image={images.correctas_image}
                            title={login?.data?.points || 0}
                            title2={'Correctas'}
                        />
                        <TopImageView
                            image={images.percentage_image}
                            title={login?.data?.percentage || 0}
                            title2={'Percentil'}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, marginTop: 0 }} >

                    <FlatList
                        data={home_array}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item?.id}
                        renderItem={({ item, index }) => (
                            <SingleHomeView
                                array={item?.array}
                                image={item?.image}
                                setIsOpen={() => {
                                    if (selectedId === item?.id) setSelectedId(null)
                                    else setSelectedId(item?.id)
                                }}
                                isOpen={selectedId === item?.id}
                                onPress={() => {
                                    navigate("AI")
                                }}
                                title={item?.title}

                            />
                        )}
                    />
                </View>

                {/* 
                <DialogBox
                isDialogOpen={true}
                cancelClick={() => {}}
                closeBox={() => {}}
                okClick={() => {}}
                /> */}

            </FastImage>
        </SafeAreaView>
    )
}

export default HomePage