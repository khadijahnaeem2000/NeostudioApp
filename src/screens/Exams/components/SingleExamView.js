import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../constant'
import { widthPercentageToDP } from '../../../Component/MakeMeResponsive'
import { fonts } from '../../../utils'
import { SingleExamText } from './index'

const SingleExamView = ({ item, onLongPress, onPress, selectedExam }) => {
    return (
        <View style={styles.main_view} >
            <Text style={styles.heading} >{item?.folderName}</Text>


            <View style={styles.row} >

                <View style={styles.row_view} >
                    {
                        item?.Conocimientos?.map((val, index) => (
                            <SingleExamText
                                key={index?.toString()}
                                onLongPress={() => onLongPress(val)}
                                onPress={() => onPress(val, false)}
                                item={val}
                                isActive={val?.id === selectedExam?.id}
                            />
                        ))
                    }
                </View>
                <View style={styles.row_view} >
                    {
                        item?.Inglés?.map((val, index) => (
                            <SingleExamText
                                key={index?.toString()}
                                onLongPress={() => onLongPress(val)}
                                onPress={() => onPress(val, false)}
                                item={val}
                                isActive={val?.id === selectedExam?.id}
                            />
                        ))
                    }
                </View>
                <View style={styles.row_view} >
                    {

                        item?.Psicotécnicos?.map((val, index) => (
                            <SingleExamText
                                key={index?.toString()}
                                onLongPress={() => onLongPress(val)}
                                onPress={() => onPress(val, true)}
                                item={val}
                                isActive={val?.id === selectedExam?.id}
                            />
                        ))
                    }
                </View>
                <View style={styles.row_view} >
                    {
                        item?.Ortografía?.map((val, index) => (
                            <SingleExamText
                                key={index?.toString()}
                                onLongPress={() => onLongPress(val)}
                                onPress={() => onPress(val, false)}
                                item={val}
                                isActive={val?.id === selectedExam?.id}
                            />
                        ))
                    }
                </View>
            </View>



        </View>
    )
}

export default SingleExamView

const styles = StyleSheet.create({
    main_view: {
        marginTop: SIZES.padding2
    },
    heading: {
        color: COLORS.text_black_color,
        fontSize: widthPercentageToDP(6),
        textAlign: "center",
        fontFamily: fonts.novaBold
    },
    row: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    row_view: {
        width: "24%",
        alignItems: "center",
    },

})