import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { images } from '../../constant';
import { styles } from './index.styles';
import { home_array, IMAGE_URL } from '../../config';
import { SingleHomeView, EmailModal, ExamModal, HomeSliderModal, TopImageView, PruebaModal, AvatarModal, SelectImageModal } from './components';
import { Container, LoaderModal } from '../../Component';
import HomePageFunctional from './index.function';

const HomePage = () => {
    const {
        selectedId,
        setSelectedId,
        setShowEmailModal,
        showEmailModal,
        showSliderModal,
        setShowSliderModal,
        showExamModal,
        setShowExamModal,
        login,
        onPressTab,
        showPruebaModal,
        setShowPruebaModal,
        getTime,
        isLandScape,
        listRef,
        isLoading,
        setShowAvatarModal,
        setShowImageModal,
        setShowRatingModal,
        setShowVersionModal,
        showAvatarModal,
        showImageModal,
        showRatingModal,
        showVersionModal,
        onPressGallery,
        handlePostImage
    } = HomePageFunctional();

    return (
        <Container
            isHome
            HomeView={() => (
                <>
                    {
                        login.data.expiry_date &&
                        <Text style={styles.time_text} >{"Prueba " + getTime()}</Text>
                    }
                    <View style={[styles.top_row]}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => setShowAvatarModal(true)}
                            style={[styles.user_image_view, {
                                width: isLandScape ? "18%" : "27%",
                                height: isLandScape ? "100%" : "80%",
                            }]}>
                            <FastImage
                                source={login?.data?.photo ? { uri: IMAGE_URL + login?.data?.photo } : images.avatar}
                                resizeMode={FastImage.resizeMode.stretch}
                                style={styles.user_image}
                            />
                        </TouchableOpacity>
                        <View style={styles.details_row}>
                            <TopImageView
                                image={images.aspirante_image}
                                title={login?.data?.rank_name || 'Aspirante'}
                                title2={login?.data?.userName?.slice(0, 8) || login?.data?.name}
                            />
                            <TopImageView
                                image={images.clock_image}
                                title2="Tiempo"
                                title={parseFloat(login?.time).toFixed(2)}
                            />
                            <TopImageView
                                image={images.aptos_image}
                                title={login?.data?.aptos || 0}
                                title2="Aptos"
                            />
                            <TopImageView
                                image={images.correctas_image}
                                title={login?.data?.points || 0}
                                title2="Correctas"
                            />
                            <TopImageView
                                image={images.percentage_image}
                                title={login?.data?.percentage || 0}
                                title2="Percentil"
                            />
                        </View>
                    </View>
                </>
            )}
        >
            <FlatList
                ref={listRef}
                data={home_array}
                showsVerticalScrollIndicator={false}
                onScrollToIndexFailed={(info) => {
                    listRef.current?.scrollToOffset({
                        offset: info?.averageItemLength * info?.index,
                        animated: true,
                    });
                }}
                keyExtractor={(item) => item?.id?.toString()}
                renderItem={({ item, index }) => (
                    <SingleHomeView
                        array={item?.array}
                        image={item?.image}
                        setIsOpen={() => {
                            if (selectedId === item?.id) {
                                setSelectedId(null);
                            } else {
                                setSelectedId(item?.id);
                            }
                        }}
                        onPressList={() => {
                            if (item?.array?.length > 0 && index > home_array?.length - 4) {
                                setTimeout(() => {
                                    listRef.current?.scrollToEnd({ animated: true });
                                }, 500); // Ensure the list is rendered before scrolling
                            }
                        }}
                        isOpen={selectedId === item?.id}
                        onPress={(type) => onPressTab(type)}
                        title={item?.title}
                    />
                )}
            />
            <EmailModal
                onPressClose={() => setShowEmailModal(false)}
                visible={showEmailModal}
            />
            <HomeSliderModal
                visible={showSliderModal}
                onPressClose={() => setShowSliderModal(false)}
            />
            <ExamModal
                onPressClose={() => setShowExamModal(false)}
                visible={showExamModal}
            />
            <PruebaModal
                login={login}
                onPressClose={() => setShowPruebaModal(false)}
                visible={showPruebaModal}
            />

            <SelectImageModal
                onPress={(type, val) => {
                    setShowImageModal(false)
                    handlePostImage(type, val)
                }}
                onPressClose={() => setShowImageModal(false)}
                visible={showImageModal}
            />

            <AvatarModal
                visible={showAvatarModal}
                onPressGallery={() => onPressGallery("gallery")}
                onPressAvatar={() => {
                    setShowAvatarModal(false)
                    setTimeout(() => {
                        setShowImageModal(true)
                    }, 500);
                }}
                onPressClose={() => setShowAvatarModal(false)}
            />

            <LoaderModal visible={isLoading} />
        </Container>
    );
};

export default HomePage;
