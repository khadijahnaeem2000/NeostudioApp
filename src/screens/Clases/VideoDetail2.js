import React, { PureComponent } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  Platform,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { styles } from "./styles";
import { getVIdeoFiles } from "../../Redux/action";
import Header from "../../Component/Header";
import Player from "../../Component/Player";
import Orientation from "react-native-orientation-locker";
import FastImage from "react-native-fast-image";

class VideoDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      loading: true,
      response: [],
    };
    this.getData();
  }

  getData = () => {
    this.setState({ loading: true });
    const topicId = this.props.route.params.topicId || 1;
    const type = this.props.route.params.type || "video";
    fetch("https://neoestudio.net/api/getClassTopicsMaterial", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: type,
        topicId: topicId,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({ loading: false });
        this.setState({ response: json });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log("exception error is =>", error);
      });
  };

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      } else {
        Orientation.lockToPortrait();
      }
    });
  }
  _onLayout = (e) => {
    let width = e.nativeEvent.layout.width;
    let height = e.nativeEvent.layout.height;
    this.setState({
      height: height,
      width: width,
    });
  };

  render() {
    const { login } = this.props.user;
    const { response, loading } = this.state;
    return (
      <FastImage
        source={require("../../Images/bg.png")}
        style={styles.container}
        resizeMode={FastImage.resizeMode.stretch}
        onLayout={(e) => {
          this._onLayout(e);
        }}
      >
        <FastImage
          style={styles.logo}
          source={
            Platform.OS === "android"
              ? require("../../Images/veoestudio.png")
              : require("../../Images/ios_logo.png")
          }
          resizeMode={FastImage.resizeMode.contain}
        />
        <Header
          iconName="left"
          leftClick={() => this.props.navigation.goBack()}
          title="Clases"
        />
        {!response || !response.length ? (
          <View />
        ) : (
          <FlatList
            data={response}
            keyExtractor={(item) => item.title}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            initialNumToRender={8}
            renderItem={({ item, index }) => {
              return (
                <Player
                  img={require("../../Images/video.png")}
                  isActive={item.isActive}
                  title={item.name}
                  clickHandler={() => {
                    if (item?.vimeolink == null) {
                      Alert.alert("Enlace de vídeo no disponible");
                    } else {
                      Orientation.unlockAllOrientations(),
                        this.props.navigation.navigate("TestVideo", {
                          url: item.material,
                          vimeoLink: item?.vimeolink,
                          id: login?.data?.id,
                        });
                    }
                  }}
                />
              );
            }}
          />
        )}
        {loading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
      </FastImage>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, { getVIdeoFiles })(VideoDetail);
