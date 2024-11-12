// using this npm install moment-timezone react-native-device-info crypto-js
// Libraries and here is a method using this:

import moment from 'moment-timezone';
import DeviceInfo from 'react-native-device-info';
import CryptoJS from 'crypto-js';
import React from 'react'

const getEncryptedTS = () => {
  // Step 1: Get the current time in New York timezone (EST/EDT)
  const currentTime = moment().tz("America/New_York").format("YYYY-MM-DD HH:mm:ss");

  // Step 2: Get the device UUID
  const deviceUUID = DeviceInfo.getUniqueId();

  // Step 3: Concatenate current time and device UUID
  const timestampString = `${currentTime}|${deviceUUID}`;

  // Step 4: Encrypt the concatenated string
  const encryptionKey = 'your-secret-key'; // Replace with your actual encryption key
  const encryptedTS = CryptoJS.AES.encrypt(timestampString, encryptionKey).toString();

  return encryptedTS;
};

// Usage
const ts = getEncryptedTS();
console.log(ts);