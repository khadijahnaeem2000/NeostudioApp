import Home from '../screens/Home';
import Login from '../screens/Login';
import OTP from '../screens/Login/OTP';
import AudioClass from '../screens/AudioClass';
import AudioDetail from '../screens/AudioClass/AudioDetail';
import VideoClass from '../screens/VideoClass';
import VideoDetail from '../screens/VideoClass/VideoDetail';
import VideoDetail2 from '../screens/Clases/VideoDetail2';
import VideoPlayer from '../screens/VideoClass/VideoPlayer';
import TestVideo from '../screens/VideoClass/Test';
import TestVideo2 from '../screens/Clases/Test';
import DownUpload from '../screens/Download';
import FolderFiles from '../screens/Download/FolderFiles';
import Upload from '../screens/Uploads';
import ExamScreen from '../screens/Exames';
import ExamFile from '../screens/Exames/ExamenFile';
import Test from '../screens/Test';
import Result from '../screens/Result';
import Review from '../screens/ReviewExam';
import FAQ from '../screens/FAQs';
import FAQSDetail from '../screens/FAQs/FaqsDetail';
import Personality from '../screens/PersonalityTest';
import ReviewTest from '../screens/Review';
import ReviewTestExam from '../screens/Review/Files';
import News from '../screens/News';
import Chat from '../screens/Chat';
import Survey from '../screens/Survey';
import Objectives from '../screens/Objectives';
import GlobalRanking from '../screens/GlobalRanking';
import Payment from '../screens/Payment';
import Calender from '../screens/Calender';
import PDF from '../screens/PDF';
import PdfDetail from '../screens/PDF/PdfFiles';
import PdfView from '../screens/PDF/PdfView';
import PdfView2 from '../screens/PDF/PdfView2';
import TikTok from '../screens/TikTok';
import SurveyQuestion from '../screens/Survey/SurveyQuestion';
import Clases from '../screens/Clases';
import Profile from '../screens/Profile';
import Battle from '../screens/Battle';
import CreateBatlle from '../screens/Battle/CreateBatlle';
import ActiveBattle from '../screens/Battle/ActiveBattle';
import Actividad from '../screens/Actividad';
import Activity from '../screens/Actividad/Activity';
import BattleTest from '../screens/BattleTest';
import AudioActivity from '../screens/Actividad/AudioActivity';
import TestScreen from '../screens/TestScreen';
import Settings from '../screens/Settings';
import TestTwo from '../screens/VideoClass/TestTwo';
import MobileVerification from '../screens/Login/MobileVerification';
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const MainNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="Actividad" component={Actividad} />
        <Stack.Screen name="Activity" component={Activity} />
        <Stack.Screen name="AudioActivity" component={AudioActivity} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="MobileVerification" component={MobileVerification} />
        <Stack.Screen name="AudioClass" component={AudioClass} />
        <Stack.Screen name="AudioDetail" component={AudioDetail} />
        <Stack.Screen name="VideoClass" component={VideoClass} />
        <Stack.Screen name="VideoDetail" component={VideoDetail} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
        <Stack.Screen name="DownUpload" component={DownUpload} />
        <Stack.Screen name="FolderFiles" component={FolderFiles} />
        <Stack.Screen name="Upload" component={Upload} />
        <Stack.Screen name="ExamScreen" component={ExamScreen} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="Review" component={Review} />
        <Stack.Screen name="FAQ" component={FAQ} />
        <Stack.Screen name="FAQSDetail" component={FAQSDetail} />
        <Stack.Screen name="Personality" component={Personality} />
        <Stack.Screen name="ReviewTest" component={ReviewTest} />
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="Survey" component={Survey} />
        <Stack.Screen name="SurveyQuestion" component={SurveyQuestion} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Objectives" component={Objectives} />
        <Stack.Screen name="GlobalRanking" component={GlobalRanking} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Calender" component={Calender} />
        <Stack.Screen name="TestVideo" component={TestVideo} />
        <Stack.Screen name="PDF" component={PDF} />
        <Stack.Screen name="PdfDetail" component={PdfDetail} />
        <Stack.Screen name="PdfView" component={PdfView} />
        <Stack.Screen name="PdfView2" component={PdfView2} />
        <Stack.Screen name="ReviewTestExam" component={ReviewTestExam} />
        <Stack.Screen name="ExamFile" component={ExamFile} />
        <Stack.Screen name="TikTok" component={TikTok} />
        <Stack.Screen name="Clases" component={Clases} />
        <Stack.Screen name="VideoDetail2" component={VideoDetail2} />
        <Stack.Screen name="TestVideo2" component={TestVideo2} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Battle" component={Battle} />
        <Stack.Screen name="CreateBatlle" component={CreateBatlle} />
        <Stack.Screen name="ActiveBattle" component={ActiveBattle} />
        <Stack.Screen name="BattleTest" component={BattleTest} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="TestTwo" component={TestTwo} />



      </Stack.Navigator>
    </>
  );
};

export default MainNavigation;
