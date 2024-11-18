import React from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { images } from '../../constant';
import { styles } from './index.styles';
import { home_array, IMAGE_URL } from '../../config';
import { SingleHomeView, EmailModal, ExamModal, HomeSliderModal, TopImageView, PruebaModal } from './components';
import { Container } from '../../Component';
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
        getTime
    } = HomePageFunctional();

    console.log("ASdasdasdas", getTime())

    return (
        <Container
            isHome
            HomeView={() => (
                <>
                    {
                        login.data.expiry_date &&
                        <Text style={styles.time_text} >{"Prueba " + getTime()}</Text>
                    }
                    <View style={styles.top_row}>
                        <TouchableOpacity style={styles.user_image_view}>
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
                data={home_array}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item?.id?.toString()}
                renderItem={({ item }) => (
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
        </Container>
    );
};

export default HomePage;
