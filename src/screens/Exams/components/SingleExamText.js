import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fonts } from '../../../utils'
import { COLORS, SIZES } from '../../../constant'
import { widthPercentageToDP } from '../../../Component/MakeMeResponsive'

const SingleExamText = ({ item, onPress, onLongPress, isActive }) => {

    const fontFamily = isActive
        ? fonts.novaBold
        : item?.isApto === 'APTO'
            ? fonts.novaBold
            : item?.isApto === 'NO APTO'
                ? fonts.novaBold
                : item?.studentStatus === 'Habilitado'
                    ? fonts.novaRegular
                    : item?.studentExamStatus
                        ? fonts.novaBold
                        : fonts.novaRegular
    const color = isActive
        ? '#0A52CB'
        : item?.isApto === 'APTO'
            ? '#008300'
            : item?.isApto === 'NO APTO'
                ? '#252525'
                : item?.studentExamStatus === 'paused'
                    ? '#252525'
                    : item?.studentStatusstatus === 'Habilitado'
                        ? '#202020'
                        : item?.studentExamStatus
                            ? '#202020'
                            : '#202020'
    return (
        <TouchableOpacity
            onLongPress={onLongPress}
            delayLongPress={1001}
            activeOpacity={0.6}
            style={styles.main_view}
            onPress={onPress}
        >
            <Text style={[styles.title, { color, fontFamily }]} >{item?.name}</Text>
        </TouchableOpacity>
    )
}

export default SingleExamText

const styles = StyleSheet.create({
    main_view: {
        width: "100%",
        marginTop: SIZES.padding2,
    },
    title: {
        fontSize: widthPercentageToDP(4.5),
        textAlign: "center",
        lineHeight: 25
    }
})