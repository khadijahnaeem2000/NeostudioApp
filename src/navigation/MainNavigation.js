import Home from '../screens/Home';
import Login from '../screens/Login';
import OTP from '../screens/Login/OTP';
import DownUpload from '../screens/Download';
import FolderFiles from '../screens/Download/FolderFiles';
import Test from '../screens/Test';
import Result from '../screens/Result';
import Review from '../screens/ReviewExam';
import Personality from '../screens/PersonalityTest';
import News from '../screens/News';
import Chat from '../screens/Chat';
import Survey from '../screens/Survey';
import Objectives from '../screens/Objectives';
import GlobalRanking from '../screens/GlobalRanking';
import Payment from '../screens/Payment';
import Calender from '../screens/Calender';
import PdfView from '../screens/PDF/PdfView';
import PdfView2 from '../screens/PDF/PdfView2';
import TikTok from '../screens/TikTok';
import SurveyQuestion from '../screens/Survey/SurveyQuestion';
import Profile from '../screens/Profile';
import Battle from '../screens/Battle';
import CreateBatlle from '../screens/Battle/CreateBatlle';
import ActiveBattle from '../screens/Battle/ActiveBattle';
import Actividad from '../screens/Actividad';
import Activity from '../screens/Actividad/Activity';
import BattleTest from '../screens/BattleTest';
import AudioActivity from '../screens/Actividad/AudioActivity';
import Settings from '../screens/Settings';
import MobileVerification from '../screens/Login/MobileVerification';
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AI, AudioDetails, Audios, Classes, ClassTopics, Exams, Faq, HomePage, Repaso, RepasoDetail, Temario, TemarioDetail, VideoDetails, VideoPlayer, Videos } from '../screens';


const MainNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="HomePage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="AI" component={AI} />
      <Stack.Screen options={{ orientation: "portrait" }} name="Temario" component={Temario} />
      <Stack.Screen options={{ orientation: "portrait" }} name="TemarioDetail" component={TemarioDetail} />
      <Stack.Screen options={{ orientation: "portrait" }} name="Videos" component={Videos} />
      <Stack.Screen options={{ orientation: "portrait" }} name="VideoDetails" component={VideoDetails} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
      <Stack.Screen options={{ orientation: "portrait" }} name="Audios" component={Audios} />
      <Stack.Screen options={{ orientation: "portrait" }} name="AudioDetails" component={AudioDetails} />
      <Stack.Screen options={{ orientation: "portrait" }} name="Classes" component={Classes} />
      <Stack.Screen options={{ orientation: "portrait" }} name="ClassTopics" component={ClassTopics} />
      <Stack.Screen options={{ orientation: "portrait" }} name="Faq" component={Faq} />
      <Stack.Screen options={{ orientation: "portrait" }} name="Repaso" component={Repaso} />
      <Stack.Screen options={{ orientation: "portrait" }} name="RepasoDetail" component={RepasoDetail} />
      <Stack.Screen options={{ orientation: "portrait" }} name="Exams" component={Exams} />
      <Stack.Screen options={{ orientation: "portrait" }} name="Actividad" component={Actividad} />
      <Stack.Screen options={{ orientation: "portrait" }} name="Activity" component={Activity} />
      <Stack.Screen name="AudioActivity" component={AudioActivity} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="MobileVerification" component={MobileVerification} />
      <Stack.Screen name="DownUpload" component={DownUpload} />
      <Stack.Screen name="FolderFiles" component={FolderFiles} />
      <Stack.Screen name="Test" component={Test} options={{ orientation: "landscape" }} />
      <Stack.Screen name="Result" component={Result} options={{ orientation: "landscape" }} />
      <Stack.Screen name="Review" options={{ orientation: "landscape" }} component={Review} />
      <Stack.Screen name="Personality" component={Personality} />
      <Stack.Screen name="News" component={News} />
      <Stack.Screen name="Survey" component={Survey} />
      <Stack.Screen name="SurveyQuestion" component={SurveyQuestion} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Objectives" component={Objectives} />
      <Stack.Screen name="GlobalRanking" component={GlobalRanking} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Calender" component={Calender} />
      <Stack.Screen name="PdfView" component={PdfView} />
      <Stack.Screen name="PdfView2" component={PdfView2} />
      <Stack.Screen name="TikTok" component={TikTok} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Battle" component={Battle} />
      <Stack.Screen name="CreateBatlle" component={CreateBatlle} />
      <Stack.Screen name="ActiveBattle" component={ActiveBattle} />
      <Stack.Screen name="BattleTest" component={BattleTest} />
      <Stack.Screen name="Settings" component={Settings} />



    </Stack.Navigator>
  );
};

export default MainNavigation;
