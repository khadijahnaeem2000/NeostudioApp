import { del, get, patch, post, put } from "./http-provider";

const SERVICE_URLS = {

    // Classes Management
    getClasses: "getClassTopics",
    getTopics: "getClassTopicsMaterial",

    //Temario Management
    getPdfFolders: 'getDownloadPdfFolders',
    getPdfFiles: 'getDownloadPdfFiles',

    //Videos Management
    getVideos: "getTopics",
    getVideoFiles: "getVideoFiles",


    //Audi Management
    getAudios: "getTopics",
    getAudioFiles: "getAudioFiles",


    //Repaso Management
    getRepasoFolders: "getAllReviewFolders",
    getRepasoExams: "getReviewFolderExams",


    // Exam Management
    getAllExams: "getAllExamsOfFolderApp",

    //Activity Management
    getUserPrograms: "getAllPrograms",

};

//Classes Management
const getClasses = data => post(SERVICE_URLS.getClasses, data);
const getTopics = data => post(SERVICE_URLS.getTopics, data);

//Teamrio Management
const getPdfFolders = data => post(SERVICE_URLS.getPdfFolders, data);
const getPdfFiles = data => post(SERVICE_URLS.getPdfFiles, data);

//Videos Mangement
const getVideos = data => post(SERVICE_URLS.getVideos, data);
const getVideoFiles = data => post(SERVICE_URLS.getVideoFiles, data);


//Audios Mangement
const getAudios = data => post(SERVICE_URLS.getAudios, data);
const getAudioFiles = data => post(SERVICE_URLS.getAudioFiles, data);


//Repaso Management
const getRepasoFolders = data => post(SERVICE_URLS.getRepasoFolders, data);
const getRepasoExams = data => post(SERVICE_URLS.getRepasoExams, data);

///Exams Management
const getAllExams = data => post(SERVICE_URLS.getAllExams, data);


//Activity Management
const getUserPrograms = data => post(SERVICE_URLS.getUserPrograms, data);



const apiServices = {

    //Classes Management
    getClasses,
    getTopics,

    //Temario Managment
    getPdfFolders,
    getPdfFiles,

    //Videos Management
    getVideos,
    getVideoFiles,

    //Audios Management
    getAudios,
    getAudioFiles,

    //Repaso Management
    getRepasoFolders,
    getRepasoExams,

    //Exam Management
    getAllExams,

    //Activity Management
    getUserPrograms


};

export default apiServices;
