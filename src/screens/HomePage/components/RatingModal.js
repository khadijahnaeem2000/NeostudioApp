import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP, widthPercentageToDP } from '../../../Component/MakeMeResponsive';
import { fonts } from '../../../utils';

const RatingModal = () => {
  return (
    <Modal
    transparent={true}
    visible={isFcous}
    animationType="fade"
    onRequestClose={() => { }}
  >
    <View style={styles.modalMain2}>
      <View
        style={[
          styles.quesBox,
          {
            height:
              rating == 0 || rating == 5
                ? heightPercentageToDP(25)
                : heightPercentageToDP(45),
          },
        ]}
      >
        <View style={styles.toptile}>
          <Text style={styles.toptext}>
            {"¿Te ha gustado la aplicación?"}
          </Text>
        </View>

        <Stars
          value={rating}
          clickHandler1={() => {
            this.setState({ rating: 1 });
          }}
          clickHandler2={() => {
            this.setState({ rating: 2 });
          }}
          clickHandler3={() => {
            this.setState({ rating: 3 });
          }}
          clickHandler4={() => {
            this.setState({ rating: 4 });
          }}
          clickHandler5={() => {
            this.setState({ rating: 5 });
          }}
        />

        {rating !== 5 && rating !== 0 && (
          <TextInput
            placeholder="Ayúdanos  escribiendo aquí lo que podríamos mejorar."
            placeholderTextColor="#000000"
            multiline={true}
            style={styles.input}
            onChangeText={(text) =>
              this.setState({ userFeeback: text })
            }
          />
        )}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#006176", "#00a7cb"]}
          style={styles.bottomView}
        >
          <TouchableOpacity
            onPress={() => {
              if (this.state.rating == 5) {
                updateUserFeedback(
                  login?.data?.id,
                  this.state.rating,
                  this.state.userFeeback
                );
                this.setState({ isFcous: false }, () => {
                  Linking.openURL(
                    "https://play.google.com/store/apps/details?id=com.neostudio&reviewId=0"
                  );
                });
              } else {
                this.feedbackApi();
              }
            }}
          >
            <Text style={styles.btnTxt}>{"Enviar"}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  </Modal>
  )
}

export default RatingModal

const styles = StyleSheet.create({
    modalMain2: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
      },
      quesBox: {
        width: widthPercentageToDP(90),
        //flex: 0,
        borderRadius: widthPercentageToDP(3),
        alignItems: "center",
        backgroundColor: "#FAF9F6",
        borderRadius: widthPercentageToDP(5),
        shadowColor: "#000000",
        elevation: 5,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
      },
      toptile: {
        width: "100%",
        height: "25%",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: widthPercentageToDP(0.1),
        borderBottomColor: "#000",
      },
      toptext: {
        color: "#000",
        fontSize: widthPercentageToDP(4.5),
        fontFamily: fonts.novaBold,
        ///paddingLeft: widthPercentageToDP(3),
        marginTop: heightPercentageToDP(1),
        textAlign: "center",
      },
      bottomView: {
        width: "100%",
        height: heightPercentageToDP(8),
        position: "absolute",
        bottom: "0%",
        alignItems: "center",
        justifyContent: "center",
        //backgroundColor: lightBlue,
        borderBottomLeftRadius: widthPercentageToDP(5),
        borderBottomRightRadius: widthPercentageToDP(5),
      },
      input: {
        textAlignVertical: "top",
        padding: widthPercentageToDP(3),
        borderWidth: widthPercentageToDP(0.1),
        borderColor: "#000",
        marginTop: heightPercentageToDP(1),
        width: "90%",
        height: heightPercentageToDP(12),
        borderRadius: widthPercentageToDP(4),
        fontSize: widthPercentageToDP(5),
        color: "#000",
        fontFamily: fonts.novaBold,
      },
      btnTxt: {
        color: "#ffffff",
        fontSize: widthPercentageToDP(6),
        fontFamily: fonts.novaBold,
      },
})