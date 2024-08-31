import { Alert } from 'react-native';
import { navigate, resetNavigationStack } from '../utils/naviagtion_service';
import { onClearState, onLogoutUser, setActivityId, setAllChats, setAllExams, setAllNotifications, setAudioFile, setAuthLoading, setBattleQuestions, setCalendarDates, setChatCount, setDownloadFiles, setDownloadFolder, setExamStart, setLoginData, setNewsCount, setNewsItems, setNotiToggle, setObjective, setObjectiveRanking, setOrientationCheck, setPdfFile, setPdfFolder, setPersonalityExam, setRankAvatar, setRejectReason, setReviewDrawer, setReviewExam, setReviewExamList, setReviewRanking, setSurveyList, setToast, setToken, setTopics, setUploadFile, setUploadFolder, setVerticalRanking, setVideoFile } from './slices/user-slice';
import { setAuthDialog, setErrorMessage } from './slices/dialog-slice';


export var baseUrl = 'https://neoestudio.net/api/';

var login = 'loginStudent',
  loginWithApple = 'LoginwithApple',
  logoutStd = 'logoutStudent',
  mobileOTP = 'MobileOTP',
  verifyOTP = 'verifyOTP',
  feedback = 'user/feedback',
  GetTopis = 'getTopics',
  GetAudio = 'getAudioFiles',
  GetVideo = 'getVideoFiles',
  getSchedule = 'getSchedule',
  GetPdf = 'getPdfFiles',
  getDownloadFolder = 'getDownloadFolders',
  getDownloadFiles = 'getDownloadFiles',
  getUploadFolders = 'getUploadFolders',
  emailSubscription = 'emailSubscription',
  uploadFile = 'uploadFile',
  getAllExams = 'getAllExam',
  startExam = 'startExam',
  social_login = 'loginwithGoogleOrAppleId',
  pauseAnswer = 'pauseAnswer',
  endExam = 'endExam',
  getAllPersonalityExams = 'getAllPersonalityExams',
  getAllReviewExams = 'getAllReviewExams',
  newsUnseenCount = 'newsUnseenCount',
  allNews = 'allNews',
  surveyList = 'surveyList',
  getSurveyQuestions = 'getSurveyQuestions',
  getSurveyTest = 'getSurveyTest',
  storeChatStudent = 'storeChatStudent',
  getChat = 'getChat',
  chatCount = 'chatCount',
  audios = 'audios',
  reviewDrawr = 'reviewDrawr',
  estudioTemario = 'estudioTemario',
  repasoTemario = 'repasoTemario',
  getObjectives = 'getObjectives',
  objectiveRanking = 'objectiveRanking',
  user = 'user',
  getTopicCourseVerticalRanking = 'getTopicCourseVerticalRanking',
  checkNotifications = 'checkNotifications',
  onExam = 'onExam',
  getCourseVerticalRanking = 'getCourseVerticalRanking',
  getDates = 'getDates',
  endReview = 'endReview',
  endVideo = 'videos',
  pdfCounter = 'pdfCounter',
  getDownloadPdfFolders = 'getDownloadPdfFolders',
  getDownloadPdfFiles = 'getDownloadPdfFiles',
  deviceKey = 'device-key',
  fetchVideos = 'fetch-videos',
  fetchTikTokVideos = 'fetchAllTikTokFolder',
  getAllPrograms = 'getAllPrograms',
  getProgramActivities = 'getProgramActivities',
  completeActivity = 'completeActivity',
  removeActivity = 'removeActivity',
  getRankAvatar = 'getRankAvatar',
  store = 'avatar/store',
  rankUpdate = 'rank-image-update',
  saveExperience = 'saveExperience',
  updateProfile = 'updateProfile',
  updateExperience = 'updateExperience',
  reasons = 'Reasons',
  videoLike = 'videoLike',
  videoComment = 'videoComment',
  videoSharing = 'videoSharing',
  getComment = 'GetVideoComments?videoId=',
  editComments = 'editComments',
  deleteComments = 'deleteComments',
  videoDownload = 'videoDownload',
  loginTime = 'loginTime',
  logoutTime = 'logoutTime',
  ActiveBattles = 'battle/ActiveBattles',
  createBattle = 'battle/allTestTypes',
  battleStart = 'battle/createbattle',
  joinBattle = 'battle/startbattle',
  highScore = 'battle/higestscore',
  sendNotification = 'battle/send-web-notification-battle',
  leaveBattle = 'battle/leavebattle',
  rescheduleExamAll = 'rescheduleExamAll',
  resetprogram = 'resetprogram',
  resetallactivites = 'resetallactivites',
  rejectionoptions = 'rejectionoptions',
  questionqueries = 'questionqueries',
  blocked = 'blocked',
  success = 'success',
  reviewExam = 'reviewExam',
  updatebaremo = 'updatebaremo',
  deleteuser = 'deleteuser',
  checkregistration = 'TelephoneVerification?userid=',
  registerwith30days = 'Registerwith30days';

export const saveActivityId = (value, name) => {
  return dispatch => {
    dispatch(setActivityId({
      activityId: value,
      activityName: name,
    }))
  };
};
export const saveToken = value => {
  return dispatch => {
    dispatch(setToken({ token: value }))
  };
};
export const notificationToggle = value => {
  return dispatch => {
    dispatch(setNotiToggle({ toggle: value, }))
  };
};
export const updateOrientation = value => {
  return dispatch => {
    dispatch(setOrientationCheck({ orientation: value, }))
  };
};
export const dispatchFunc = () => {
  return dispatch => {
    dispatch(setAuthDialog(false))
  };
};
export const showToastFunc = () => {
  return dispatch => {
    dispatch(setToast(true))
  };
};
export const hideToastFunc = () => {
  return dispatch => {
    dispatch(setToast(false))
  };
};
export const dispatchFuncOn = () => {
  return dispatch => {
    dispatch(setAuthDialog(true))
  };
};
export const dispatchText = () => {
  return dispatch => {
    dispatch(setErrorMessage('El documento se ha ' + '\n' + 'descargado con éxito',))
  };
};
export const dispatchAudioText = () => {
  return dispatch => {
    dispatch(setErrorMessage('Por favor seleccione cualquier clase de la lista'));
  };
};
export const dispatchExamText = () => {
  return dispatch => {
    dispatch(setErrorMessage('Elija cualquier examen'));
  };
};
export const logout = () => {
  return dispatch => {
    dispatch(onLogoutUser());
  };
};
export const clearStates = () => {
  return dispatch => {
    dispatch(onClearState());
  };
};
export const userLogin = (type, param1, param2, reason) => {
  if (type === 'false') {
    return dispatch => {
      dispatch(setAuthLoading(true))
      fetch(baseUrl + login, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type,
          telephone: param1,
          email: param2,
          reason: reason,
        }),
      })
        .then(res => res.json())
        .then(json => {
          dispatch(setAuthLoading(false));
          if (json.status === 'Sucessfull') {
            if (!json.is_verified || json.is_verified === 'No') {
              navigate("OTP", { data: json, type })
            } else if (json?.data?.IsBlocked === 'True') {
              alert("Tu cuenta está bloqueada.")
            } else {
              dispatch(setLoginData({ login: json }))
              dispatch(getRankAvatarImages());
              resetNavigationStack("HomeScreen", { isSubscribe: 'ok' })
            }
          } else if (json.status === 'Unsucessfull') {
            dispatch(setErrorMessage(json?.message))
            dispatch(setAuthDialog(true))
          } else {
            dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
            dispatch(setAuthDialog(true))
          }
        })
        .catch(error => {
          dispatch(setAuthLoading(false));
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        });
    };
  } else if (type == 'social') {
    return dispatch => {
      dispatch(setAuthLoading(true))
      fetch(baseUrl + social_login, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(param1),
      })
        .then(res => res.json())
        .then(json => {
          dispatch(setAuthLoading(false));
          if (json.status === 'Sucessfull') {
            if (!json.is_verified || json.is_verified === 'no') {
              navigate("MobileVerification", { data: json, type: true })
            } else if (json?.data?.IsBlocked === 'True') {
              alert("Tu cuenta está bloqueada.")
            } else {
              dispatch(setLoginData({ login: json }))
              dispatch(getRankAvatarImages());
              navigate("HomeScreen", { isSubscribe: 'ok' })
            }
          } else if (json.status === 'Unsucessfull') {
            dispatch(setErrorMessage(json?.message))
            dispatch(setAuthDialog(true))
          } else {
            dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
            dispatch(setAuthDialog(true))
          }
        })
        .catch(error => {
          dispatch(setAuthLoading(false));
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        });
    };
  } else {
    return dispatch => {
      dispatch(setAuthLoading(true))
      fetch(baseUrl + login, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type,
          studentCode: param1,
          password: param2,
          //ipAddress: ipAddress,
          isLogin: 'yes',
        }),
      })
        .then(res => res.json())
        .then(json => {
          dispatch(setAuthLoading(false));
          if (json.status === 'Sucessfull') {
            if (json?.data?.IsBlocked === 'True') {
              alert("Tu cuenta está bloqueada.")
            } else {
              dispatch(setLoginData({ login: json }))
              dispatch(getRankAvatarImages());
              navigate('HomeScreen', {
                isSubscribe: 'done',
              });
            }
          } else if (json.status === 'Unsucessfull') {
            dispatch(setErrorMessage(json?.message))
            dispatch(setAuthDialog(true))
          } else {
            dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
            dispatch(setAuthDialog(true))
          }
        })
        .catch(error => {
          dispatch(setAuthLoading(false));
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        });
    };
  }
};
export const userAppleLogin = (firstname, email, appleid) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + loginWithApple, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        email,
        appleid,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Sucessfull') {
          if (!json.is_verified || json.is_verified === 'no') {
            navigate('MobileVerification', {
              data: json,
              type: true,
            });
          } else {
            dispatch(setLoginData({ login: json }))
            dispatch(getRankAvatarImages());
            resetNavigationStack('HomeScreen', {
              isSubscribe: 'ok',
            });
          }
        } else if (json.status === 'Unsucessfull') {
          dispatch(setErrorMessage(json?.message))
          dispatch(setAuthDialog(true))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const verifyMobileOTP = (userId, otp, data) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + verifyOTP, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        mobileotp: otp,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status == 200) {
          dispatch(setLoginData({ login: data }))
          dispatch(getRankAvatarImages());
          resetNavigationStack('HomeScreen', {
            isSubscribe: 'ok',
          });
        } else {
          Alert.alert(
            'No verificado',
            'Estimado estudiante, Tu OTP no coincide',
          );
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const logoutFromSystem = async studentId => {
  let api;
  try {
    api = await fetch(baseUrl + logoutStd, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};

export const getTopics = (type, id, fileType) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + GetTopis, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentType: type,
        studentId: id,
        type: fileType,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setTopics({ topics: json }))
        dispatch(setAuthLoading(false));
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const getAudioFiles = (id, stdId) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + GetAudio, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        studentId: stdId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(setAudioFile({ audio: json }))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const getVIdeoFiles = (id, stdId) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + GetVideo, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        studentId: stdId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(setVideoFile({ video: json }))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const getPdfFolder = (studentType, id) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + getDownloadPdfFolders, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentType: studentType,
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(setPdfFolder({ pdfFolders: json }))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const getPdfFiles = (id, stdId) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + getDownloadPdfFiles, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        folderId: id,
        studentId: stdId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.message === 'success') {
          dispatch(setPdfFile({ pdf: json }))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const getDownload = (studentType, id) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + getDownloadFolder, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentType: studentType,
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(setDownloadFolder({ download: json }))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const getDownloadFile = (Id, type, stdId) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + getDownloadFiles, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        folderId: Id,
        studentId: stdId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.message === 'success') {
          dispatch(setDownloadFiles({
            downloadFiles: json,
            studentType: type,
          }))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const getUploadFolder = (studentType, id) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + getUploadFolders, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentType: studentType,
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(setUploadFolder({ uploadFolder: json }))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const getEmailSubscription = (id, emailSub) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + emailSubscription, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        emailSubscription: emailSub,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(setLoginData({ login: json }))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const uploadFiles = (id, stdId, type, allFile) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    const body = new FormData();
    body.append('folderId', id);
    body.append('studentId', stdId);
    body.append('studentType', type);
    body.append('file', allFile);

    fetch(baseUrl + uploadFile, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: body,
    })
      .then(response => response.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(setUploadFile({ uploadStatus: json, }))
          dispatch(setErrorMessage("Archivo cargado al servidor con éxito"))
          dispatch(setAuthDialog(true))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const getExames = (id, isFirst, type) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + getAllExams, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
        studentType: type,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          if (isFirst) {
            dispatch(setAllExams({ examsData: json }))

            navigate('ExamScreen');
          } else {
            dispatch(setAllExams({ examsData: json }))
            dispatch(getCurrentUser(id));
            dispatch(getAllAppNotification(id));
            dispatch(getUnseenNewsCount(id));
            dispatch(getChatCount(id));
            dispatch(getVerticalRanking(id));
            dispatch(getObjectiveStates(id));
            dispatch(getObjectiveRanking(id, type));
            dispatch(getReviewRanking(id));
          }
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const getStartExamData = (
  id,
  stId,
  attemptID,
  stdAnswer,
  value,
  isRestart,
  Allowdescription,
  questionid,
) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + startExam, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        examId: id,
        studentId: stId,
        studentAttemptId: attemptID,
        studentAnswered: stdAnswer,
        tab: value,
        isRestart: isRestart,
        Allowdescription: Allowdescription,
        questionid: questionid,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(setExamStart({ examStartData: json, }))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const pauseExams = (id, pauseTime, stdID, type) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + pauseAnswer, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentExamRecordId: id,
        time: pauseTime,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(clearStates());
          dispatch(getExames(stdID, false, type));
          navigate('HomeScreen');
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const endAllExams = (id, endTime, isPsico, type, isRepasoImage) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + endExam, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentExamRecordId: id,
        time: endTime,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          navigate('Result', {
            data: json,
            examID: id,
            image: isPsico,
            type: type,
            isRepasoImage: isRepasoImage,
          });
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const reviewAllExams = (recordId, value) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + reviewExam, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentExamRecordId: recordId,
        tab: value,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          setReviewExam({ reviewAll: json, })
          dispatch(getReviewDrawer(recordId));
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const getPersonalityTestList = (id, type) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + getAllPersonalityExams, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
        studentType: type,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(setPersonalityExam({ personalityList: json, }))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const getReviewTestList = (id, type) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + getAllReviewExams, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
        studentType: type,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          setReviewExamList({ reviewList: json, })
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const getUnseenNewsCount = id => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + newsUnseenCount, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          setNewsCount({ newsCount: json, })
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const getAllNews = (id, value) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + allNews, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
        tab: value,
      }),
    })
      .then(res => res.json())
      .then(json => {

        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(setNewsItems({ newsItem: json, }))
          dispatch(getUnseenNewsCount(id));
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const getSurveyList = (type, stdId) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + surveyList, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentType: type,
        studentId: stdId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(setSurveyList({ surveyItems: json }))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const getSurveyListQuestions = (id, isFirst, stdId) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + getSurveyQuestions, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        surveyId: id,
        studentId: stdId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          if (isFirst) {
            dispatch(setSurveyList({ surveyQuestion: json }))

            navigate('SurveyQuestion', {
              id: id,
            });
          } else {
            dispatch(setSurveyList({ surveyQuestion: json }))
          }
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const submitSurvey = survey => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + getSurveyTest, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(survey),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {

          navigate('Survey'),
            dispatch(setErrorMessage("Encuesta enviada con éxito ."))
          dispatch(setErrorMessage("Encuesta enviada con éxito ."))
          dispatch(setAuthDialog(true))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const postChat = (stdID, message, file, isMessage, type) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    const body = new FormData();
    body.append('studentId', stdID);
    if (isMessage) {
      body.append('message', message);
    } else {
      body.append('file', file);
      body.append('type', type === 'audio/mpeg' ? 'audio' : 'file');
    }
    fetch(baseUrl + storeChatStudent, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: body,
    })
      .then(response => response.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(getAllChats(false, stdID));
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const getAllChats = (isFirst, id) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + getChat, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          if (isFirst) {
            dispatch(setAllChats({ getChats: json }))
            navigate('Chat');
            dispatch(getChatCount(id));
          } else {
            dispatch(setAllChats({ getChats: json }))
            dispatch(getChatCount(id));
          }
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const getChatCount = id => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + chatCount, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(setChatCount({ chatCount: json }))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const getVerticalRanking = id => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + getTopicCourseVerticalRanking, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {

        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(setVerticalRanking({ verticalRanking: json }))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const getReviewRanking = id => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + getCourseVerticalRanking, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(setReviewRanking({ reviewRanking: json }))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const postAudioState = (id, state) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + audios, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
        state: state,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const getEstudioTemario = (id, action) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + estudioTemario, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
        action: action,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        dispatch(getObjectiveStates(id));
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const getRepasoTemario = (id, action) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + repasoTemario, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
        action: action,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        dispatch(getObjectiveStates(id));
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const getObjectiveStates = id => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + getObjectives, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(setObjective({ objectiveState: json }))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const getObjectiveRanking = (id, type) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + objectiveRanking, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(setObjectiveRanking({ objectiveRanking: json }))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};
export const getReviewDrawer = id => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + reviewDrawr, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(setReviewDrawer({ reviewDrawer: json }))
        } else {
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const getCurrentUser = (id, type) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + user, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(setLoginData({ login: json }))
          dispatch(getRankAvatarImages());
          dispatch(getAllAppNotification(id));
          dispatch(endExamNotification(id));
          dispatch(getCalendarDates(type));
          dispatch(getUnseenNewsCount(id));
          dispatch(getChatCount(id));
          dispatch(getVerticalRanking(id));
          dispatch(getObjectiveStates(id));
          dispatch(getObjectiveRanking(id, type));
          dispatch(getReviewRanking(id));
        } else {
          if (json.is_block == true) {
            dispatch(setLoginData({ userBlock: json?.is_block }))
            dispatch(setErrorMessage("Tu cuenta ha sido bloqueada automáticamente. Por favor, inicia sesión en la página web y proceda al pago pendiente."))
            dispatch(setAuthDialog(true))
          } else if (json.is_delete == true) {
            dispatch(setLoginData({ userDelete: json?.is_delete }))
            dispatch(setErrorMessage("Tu cuenta ha sido eliminada por facilitar datos incorrectos. Por favor, inicia sesión de nuevo con datos correctos."))
            dispatch(setAuthDialog(true))
          }
          dispatch(setErrorMessage("Tu cuenta y todos tus datos personales fueron borrados con éxito."))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const updateUserProfile = id => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + updateProfile, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(setLoginData({ login: json }))
        } else {
          if (json.is_block == true) {
            dispatch(setLoginData({ userBlock: json?.is_block }))
            dispatch(setErrorMessage("Tu cuenta ha sido bloqueada automáticamente. Por favor, inicia sesión en la página web y proceda al pago pendiente."))
            dispatch(setAuthDialog(true))
          } else if (json.is_delete == true) {
            dispatch(setLoginData({ userDelete: json?.is_delete }))
            dispatch(setErrorMessage("Tu cuenta ha sido eliminada por facilitar datos incorrectos. Por favor, inicia sesión de nuevo con datos correctos."));
            dispatch(setAuthDialog(true))
          }
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const getAllAppNotification = id => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + checkNotifications, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          dispatch(setAllNotifications({ allNotifications: json }))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const endExamNotification = id => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + onExam, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const getCalendarDates = type => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + getDates, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentType: type,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        dispatch(setCalendarDates({ getCalender: json }))
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const endReviewExam = recordId => {
  return dispatch => {
    fetch(baseUrl + endReview, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentExamRecordId: recordId,
      }),
    })
      .then(res => res.json())
      .then(json => {
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const postVideoState = (id, state) => {
  return dispatch => {
    fetch(baseUrl + endVideo, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
        state: state,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
      })
      .catch(error => {
      });
  };
};
export const pdfState = (id, state) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + pdfCounter, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
        state: state,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const saveUserToken = (id, token) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + deviceKey, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        token: token,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'success') {
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const getUserVideos = async type => {
  let api;
  try {
    api = await fetch(baseUrl + fetchVideos, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        type: type,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (!json.length) {
          Alert.alert(
            '',
            'Hola, no hay ningún video disponible en este momento. Vuelve a verificar más tarde.',
          );
        } else {
          navigate('TikTok', {
            data: json,
          });
        }
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const getUserTikTokVideos = async type => {
  let api;
  try {
    api = await fetch(baseUrl + fetchTikTokVideos, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        if (!json?.data?.length) {
          Alert.alert(
            '',
            'Hola, no hay ningún video disponible en este momento. Vuelve a verificar más tarde.',
          );
        } else {
          navigate('TikTok', {
            data: json?.data,
          });
        }
      })
      .catch(error => {

      });
  } catch (error) {
  }
  return api;
};
export const getUserPrograms = async type => {
  let api;
  try {
    api = await fetch(baseUrl + getAllPrograms, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        studentType: type,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 'Successfull') {
          return json;
        } else {
          Alert.alert('', JSON.stringify(json));
        }
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const resetAllPrograms = async (studentId, programId) => {
  let api;
  try {
    api = await fetch(baseUrl + resetprogram, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        programId: programId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const getUserProgramsActivites = async (user_id, activityId, page) => {
  let api;
  try {
    api = await fetch(baseUrl + getProgramActivities + '?page=' + page, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        programId: activityId,
        studentId: user_id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 'Successfull') {
          const newArray = [...json.data];
          for (var i = 0; i < newArray.length; i++) {
            newArray[i].key = i;
          }
          return newArray;
        } else {
          Alert.alert(
            '',
            'Algo salió mal. Por favor, cierre sesión y vuelva a iniciar sesión.',
          );
        }
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const updateCompleteActivites = async (user_id, activityId) => {
  let api;
  try {
    api = await fetch(baseUrl + completeActivity, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        activityId: activityId,
        studentId: user_id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 'Successfull') {
          return json;
        } else {
          Alert.alert('', JSON.stringify(json));
        }
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const removeUserActivites = async (user_id, activityId, actionType) => {
  let api;
  try {
    api = await fetch(baseUrl + removeActivity, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        activityId: activityId,
        studentId: user_id,
        actionType: actionType,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 'Success') {
          return json;
        } else {
          Alert.alert('', JSON.stringify(json));
        }
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const getRankAvatarImages = () => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + getRankAvatar, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setRankAvatar({ RV_Images: json, }))
        dispatch(setAuthLoading(false));
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};

export const getSpecialDates = type => {
  let api;

  api = fetch('https://neoestudio.net/api/GetSchedule', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      studentId: type,
      month: '4',
    }),
  })
    .then(res => {
      return res.json();
    })
    .catch(error => {
    });
  return api;
};
export const storeGalleryImage = async (user_id, image) => {
  let api;
  const body = new FormData();
  body.append('user_id', user_id);
  body.append('type', 'avatar');
  body.append('image', image);
  try {
    api = await fetch(baseUrl + store, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: body,
    })
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const storeAvatarImage = async (user_id, image) => {
  let api;
  try {
    api = await fetch(baseUrl + store, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        image: image,
      }),
    })
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const updateRank = async user_id => {
  let api;
  try {
    api = await fetch(baseUrl + rankUpdate, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user_id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const saveUserRankPoint = async (
  active_state,
  is_special,
  special_type,
  user_id,
) => {
  let api;
  try {
    api = await fetch(baseUrl + saveExperience, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        active_state: active_state,
        is_special: is_special,
        special_type: special_type,
        user_id: user_id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const updateUserRankPoint = async (
  active_state,
  is_special,
  special_type,
  user_id,
) => {
  let api;
  try {
    api = await fetch(baseUrl + updateExperience, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        active_state: active_state,
        is_special: is_special,
        special_type: special_type,
        user_id: user_id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const getReasons = async () => {
  let api;
  try {
    api = await fetch(baseUrl + reasons, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        let tempArr = [];
        json.reason.forEach((item, index) => {
          tempArr.push({
            label: item.reasons,
            value: item.reasons,
          });
        });
        return tempArr;
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const getOTPMobile = async (user_id, mobile) => {
  let api;
  try {
    api = await fetch(baseUrl + mobileOTP, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        mobile: mobile,
      }),
    })
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const updateUserFeedback = async (user_id, comment, rating) => {
  let api;
  try {
    api = await fetch(baseUrl + feedback, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        comment: comment,
        rating: rating,
      }),
    })
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const tiktokLikeCount = (studentId, videoId, like) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + videoLike, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        videoId: videoId,
        like: like,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status == 200) {

        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const tiktokShareCount = (studentId, videoId) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + videoSharing, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        videoId: videoId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status == 200) {

        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const tiktokDownloadCount = (studentId, videoId) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + videoDownload, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        videoId: videoId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status == 200) {

        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const getTiktokComment = async videoId => {
  let api;
  try {
    api = await fetch(baseUrl + getComment + videoId, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const postTiktokComment = async (
  studentId,
  videoId,
  comment,
  ImgPath,
) => {
  let api;
  try {
    api = await fetch(baseUrl + videoComment, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        videoId: videoId,
        comment: comment,
        ImgPath: ImgPath,
      }),
    })
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const deleteTiktokComment = async (commentId, videoId) => {
  let api;
  try {
    api = await fetch(baseUrl + deleteComments, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: commentId,
        videoId: videoId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const editTiktokComment = async (comments, commentId, videoId) => {
  let api;
  try {
    api = await fetch(baseUrl + editComments, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comments: comments,
        id: commentId,
        videoId: videoId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const updateLoginTime = userId => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + loginTime, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const updateLogoutTime = userId => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + logoutTime, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const getAllActiveBattle = async (studentId, studentType) => {
  let api;
  try {
    api = await fetch(baseUrl + ActiveBattles, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        studentType: studentType,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 'Successfull') {
          return json;
        } else {
          return Alert.alert('', json.message);
        }
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const createNewBattle = async (studentId, studentType) => {
  let api;
  try {
    api = await fetch(baseUrl + createBattle, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        studentType: studentType,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 'Successfull') {
          return json;
        } else {
          Alert.alert('', json.message);
          return json;
        }
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const startNewBattle = async (
  studentId,
  studentType,
  exams_ids,
  sendNoti,
  NumberOfQuestions,
) => {
  let api;
  try {
    api = await fetch(baseUrl + battleStart, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        studentType: studentType,
        exams_ids: exams_ids,
        NumberOfQuestions: NumberOfQuestions,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 'Successfull') {
          if (sendNoti) {
            sendPushNotification(json.title, json.body);
          }
          return json;
        } else {
          Alert.alert('', json.message);
          return json;
        }
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const sendPushNotification = async (title, body) => {
  let api;
  try {
    api = await fetch(baseUrl + sendNotification, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 'Successfull') {
          return json;
        } else {
          return Alert.alert('', json.message);
        }
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const joinMyBattle = (
  studentId,
  studentType,
  battle_id,
  qid,
  studentanswer,
  correctanswer,
) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + joinBattle, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        studentType: studentType,
        battle_id: battle_id,
        qid: qid,
        studentanswer: studentanswer,
        correctanswer: correctanswer,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Unsuccessfull') {
        } else {
          dispatch(setBattleQuestions({ battaleQues: json }))
          navigate('BattleTest', {
            battle_id: battle_id,
          });
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const getHighSccore = async battle_id => {
  let api;
  try {
    api = await fetch(baseUrl + highScore, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        battle_id: battle_id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 'Successfull') {
          return json;
        } else {
          return Alert.alert('', json.message);
        }
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const leaveCurrentBattle = async (studentId, studentType, battle_id) => {
  let api;
  try {
    api = await fetch(baseUrl + leaveBattle, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        studentType: studentType,
        battle_id: battle_id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 'Successfull') {
          return json;
        } else {
          return Alert.alert('', json.message);
        }
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const getLatestAudioFile = async (id, stdId) => {
  let api;
  try {
    api = await fetch(baseUrl + GetAudio, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        studentId: stdId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 'Successfull') {
          if (!json.data.length) {
            Alert.alert('', 'No audio files at the moment');
          } else {
            return json;
          }
        } else {
          return Alert.alert('', json.message);
        }
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};
export const resetAllExams = id => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + rescheduleExamAll, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Successfull') {
          Alert.alert('Exitosa', 'Todos los exámenes han sido reprogramados');
        } else {
          Alert.alert(
            'Fracasada',
            'Algo salió mal, inténtalo de nuevo más tarde.',
          );
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const getRejectReason = () => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + rejectionoptions, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json?.status === 'Successfull') {
          dispatch(setRejectReason({ rejectReason: json?.data }))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
      });
  };
};
export const updateRejectReason = async (
  description,
  studentId,
  qaId,
  selectedoption,
) => {
  let api;
  try {
    api = await fetch(baseUrl + questionqueries, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: description,
        studentId: studentId,
        qaId: qaId,
        selectedoption: selectedoption,
      }),
    })
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};

export const checkPackageExpired = async (
  receipt,
  password,
  isEclude,
  isTest,
  userId,
) => {
  let api;
  try {
    api = await fetch(baseUrl + blocked, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        'receipt-data': receipt,
        password: password,
        'exclude-old-transactions': isEclude,
        userId: userId,
        isTest: isTest,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 'Successfull') {
          if (json.is_block) {
            Alert.alert('', json.message);
          }
        }
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};

export const updateSubscription = async (
  userId,
  amount,
  package_tenure,
  package_id,
  paymnet,
) => {
  let api;
  try {
    api = await fetch(baseUrl + success, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        amount: amount,
        package_tenure: package_tenure,
        package_id: package_id,
        payment: paymnet,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 'Successfull') {
          navigate('HomeScreen');
        }
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};

export const deleteMyUser = async userId => {
  let api;
  try {
    api = await fetch(baseUrl + deleteuser, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        studentId: userId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};

export const resetAllActivities = async studentId => {
  let api;
  try {
    api = await fetch(baseUrl + resetallactivites, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};

export const updateUserBaremo = async (studentId, baremo) => {
  let api;
  try {
    api = await fetch(baseUrl + updatebaremo, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        baremo: baremo,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json?.status === 'Success') {
          Alert.alert('', 'Baremo se actualizó exitosamente.');
        } else {
          Alert.alert('Error', json?.message);
        }
        return json;
      })
      .catch(error => {
      });
  } catch (error) {
  }
  return api;
};

export const SocialLoginUser = async (givenName, familyName, email) => {
  return dispatch => {
    dispatch(setAuthLoading(true))
    fetch(baseUrl + social_login, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        FirstName: givenName,
        LastName: familyName,
        LoginType: 'Google',
        ipaddress: null,
        appleID: null,
        email: email,
      }),
    })
      .then(res => { })
      .then(json => {
        dispatch(setAuthLoading(false));
        if (json.status === 'Sucessfull') {
          if (!json.is_verified || json.is_verified === 'No') {
            navigate('OTP', {
              data: json,
              type: type,
            });
          } else {
            dispatch(setLoginData({ login: json }))
            dispatch(getRankAvatarImages());
            navigate('HomeScreen', {
              isSubscribe: 'ok',
            });
          }
        } else if (json.status === 'Unsucessfull') {
          dispatch(setErrorMessage(json?.message))
          dispatch(setAuthDialog(true))
        } else {
          dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
          dispatch(setAuthDialog(true))
        }
      })
      .catch(error => {
        dispatch(setAuthLoading(false));
        dispatch(setErrorMessage("Algo salió mal. Por favor, vuelva a intentarlo.!"))
        dispatch(setAuthDialog(true))
      });
  };
};

export const SocialSignUpUser = async (givenName, familyName, email) => {
  let api;
  try {
    api = await fetch(baseUrl + social_login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        FirstName: givenName,
        LastName: familyName,
        LoginType: 'Google',
        ipaddress: null,
        appleID: null,
        email: email,
      }),
    })
      .then(res => res.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        Alert.alert(error);
      });
  } catch (error) {
  }
  return api;
};
export const checkRegistration = async id => {
  let api;
  try {
    api = await fetch(baseUrl + checkregistration + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: null,
    })
      .then(res => res.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        Alert.alert(error);
      });
  } catch (error) {
  }
  return api;
};
export const addRegister = async data => {
  let api;
  try {
    api = await fetch(baseUrl + registerwith30days, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        Alert.alert(error);
      });
  } catch (error) {
  }
  return api;
};
