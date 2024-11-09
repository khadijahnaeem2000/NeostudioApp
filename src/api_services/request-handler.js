import { del, get, patch, post, put } from "./http-provider";

const SERVICE_URLS = {

    // Classes Management
    getClasses: "getClassTopics",
    getTopics: "getClassTopicsMaterial",
};

//Classes Management
const getClasses = data => post(SERVICE_URLS.getClasses, data);
const getTopics = data => post(SERVICE_URLS.getTopics, data);


const apiServices = {

    //Classes Management
    getClasses,
    getTopics

};

export default apiServices;
