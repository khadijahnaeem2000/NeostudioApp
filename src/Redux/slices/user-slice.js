import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    login: '',
    topics: '',
    AuthLoading: false,
    isDialogOpen: false,
    audio: '',
    video: '',
    pdfFolders: '',
    pdf: '',
    download: '',
    downloadFiles: '',
    uploadFolder: '',
    emailSubscribed: '',
    uploadStatus: '',
    examsData: '',
    examStartData: '',
    reviewAll: '',
    personalityList: '',
    reviewList: '',
    newsCount: '',
    newsItem: '',
    surveyItems: '',
    surveyQuestion: '',
    getChats: '',
    chatCount: '',
    verticalRanking: '',
    reviewRanking: '',
    objectiveState: '',
    objectiveRanking: '',
    reviewDrawer: '',
    allNotifications: '',
    errorMessage: '',
    getCalender: '',
    orientation: false,
    userBlock: false,
    userDelete: false,
    token: '',
    activityId: '',
    activityName: '',
    RV_Images: '',
    showToast: false,
    battaleQues: '',
    rejectReason: [],
    toggle: true
};

export const userSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        onLogoutUser: (state) => {
            state.login = '',
                state.topics = '',
                state.AuthLoading = false,
                state.isDialogOpen = false,
                state.audio = '',
                state.video = '',
                state.pdfFolders = '',
                state.pdf = '',
                state.download = '',
                state.downloadFiles = '',
                state.uploadFolder = '',
                state.emailSubscribed = '',
                state.uploadStatus = '',
                state.examsData = '',
                state.examStartData = '',
                state.reviewAll = '',
                state.personalityList = '',
                state.reviewList = '',
                state.newsCount = '',
                state.newsItem = '',
                state.surveyItems = '',
                state.surveyQuestion = '',
                state.getChats = '',
                state.chatCount = '',
                state.verticalRanking = '',
                state.reviewRanking = '',
                state.objectiveState = '',
                state.objectiveRanking = '',
                state.reviewDrawer = '',
                state.allNotifications = '',
                state.errorMessage = '',
                state.getCalender = '',
                state.orientation = false,
                state.userBlock = false,
                state.userDelete = false,
                state.token = '',
                state.activityId = '',
                state.activityName = '',
                state.RV_Images = '',
                state.showToast = false,
                state.battaleQues = '',
                state.rejectReason = [],
                state.toggle = true
        },
        onClearState: (state) => {
            state.reviewAll = '',
                state.examStartData = '',
                state.surveyQuestion = ''
        },
        setAuthLoading: (state, action) => {
            state.AuthLoading = action.payload
        },
        setToast: (state, action) => {
            state.showToast = action.payload
        },
        setLoginData: (state, action) => {
            state.login = action.payload.login,
                state.userBlock = action.payload.userBlock,
                state.userDelete = action.payload.userDelete
        },
        setTopics: (state, action) => {
            state.topics = action.payload.topics
        },
        setAudioFile: (state, action) => {
            state.audio = action.payload.audio
        },
        setVideoFile: (state, action) => {
            state.video = action.payload.video
        },
        setPdfFolder: (state, action) => {
            state.pdfFolders = action.payload.pdfFolders
        },
        setPdfFile: (state, action) => {
            state.pdf = action.payload.pdf
        },
        setDownloadFolder: (state, action) => {
            state.download = action.payload.download
        },
        setDownloadFiles: (state, action) => {
            state.downloadFiles = action.payload.downloadFiles
        },
        setUploadFolder: (state, action) => {
            state.uploadFolder = action.payload.uploadFolder
        },
        setEmailSubscription: (state, action) => {
            state.emailSubscribed = action.payload.emailSubscribed
        },
        setUploadFile: (state, action) => {
            state.uploadStatus = action.payload.uploadStatus
        },
        setAllExams: (state, action) => {
            state.examsData = action.payload.examsData
        },
        setExamStart: (state, action) => {
            state.examStartData = action.payload.examStartData
        },
        setReviewExam: (state, action) => {
            console.log("Action Paylaod me ayayyaa", action.payload.reviewAll)
            state.reviewAll = action.payload.reviewAll
        },
        setPersonalityExam: (state, action) => {
            state.personalityList = action.payload.personalityList
        },
        setReviewExamList: (state, action) => {
            state.reviewList = action.payload.reviewList
        },
        setNewsCount: (state, action) => {
            state.newsCount = action.payload.newsCount
        },
        setNewsItems: (state, action) => {
            state.newsItem = action.payload.newsItem
        },
        setSurveyList: (state, action) => {
            state.surveyItems = action.payload.surveyItems
        },
        setSurveyQuestions: (state, action) => {
            state.surveyQuestion = action.payload.surveyQuestion
        },
        setAllChats: (state, action) => {
            state.getChats = action.payload.getChats
        },
        setChatCount: (state, action) => {
            state.chatCount = action.payload.chatCount
        },
        setVerticalRanking: (state, action) => {
            state.verticalRanking = action.payload.verticalRanking
        },
        setReviewRanking: (state, action) => {
            state.reviewRanking = action.payload.reviewRanking
        },
        setObjective: (state, action) => {
            state.objectiveState = action.payload.objectiveState
        },
        setObjectiveRanking: (state, action) => {
            state.objectiveRanking = action.payload.objectiveRanking
        },
        setReviewDrawer: (state, action) => {
            state.reviewDrawer = action.payload.reviewDrawer
        },
        setAllNotifications: (state, action) => {
            state.allNotifications = action.payload.allNotifications
        },
        setCalendarDates: (state, action) => {
            state.getCalender = action.payload.getCalender
        },
        setOrientationCheck: (state, action) => {
            state.orientation = action.payload.orientation
        },
        setToken: (state, action) => {
            state.token = action.payload.token
        },
        setActivityId: (state, action) => {
            state.activityId = action.payload.activityId
            state.activityName = action.payload.activityName
        },
        setRankAvatar: (state, action) => {
            state.RV_Images = action.payload.RV_Images
        },
        setBattleQuestions: (state, action) => {
            state.battaleQues = action.payload.battaleQues
        },
        setRejectReason: (state, action) => {
            state.rejectReason = action.payload.rejectReason
        },
        setNotiToggle: (state, action) => {
            state.toggle = action.payload.toggle
        },

    },
});

// Action creators are generated for each case reducer function
export const {
    setAuthLoading,
    onLogoutUser,
    onClearState,
    setToast,
    setLoginData,
    setTopics,
    setAudioFile,
    setVideoFile,
    setPdfFolder,
    setPdfFile,
    setDownloadFolder,
    setDownloadFiles,
    setUploadFolder,
    setEmailSubscription,
    setUploadFile,
    setAllExams,
    setExamStart,
    setReviewExam,
    setPersonalityExam,
    setReviewExamList,
    setNewsCount,
    setNewsItems,
    setSurveyList,
    setSurveyQuestions,
    setAllChats,
    setChatCount,
    setVerticalRanking,
    setReviewRanking,
    setObjective,
    setObjectiveRanking,
    setReviewDrawer,
    setAllNotifications,
    setCalendarDates,
    setOrientationCheck,
    setToken,
    setActivityId,
    setRankAvatar,
    setBattleQuestions,
    setNotiToggle,
    setRejectReason
} = userSlice.actions;

export default userSlice.reducer;
