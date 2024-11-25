import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Alert,
} from 'react-native';
import { styles } from './styles';
import { widthPercentageToDP } from '../../Component/MakeMeResponsive';
import ModalBox from '../../Component/Modal';
import {
  deleteMyUser,
  resetAllActivities,
  resetAllExams,
  updateUserBaremo,
  getCurrentUser,
  notificationToggle,
  addRegister,
  getRegisterData
} from '../../Redux/action';
import { useSelector, useDispatch } from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import BaremoUpdate from '../../Component/BaremoModal';
import { onLogoutUser } from '../../Redux/slices/user-slice';
import { Button, Container, LoaderModal } from '../../Component';
import { useFocusEffect } from '@react-navigation/native';
import { RegisterModal } from '../HomePage/components';

const Settings = () => {

  const dispatch = useDispatch();
  const [isPopUp, setpop] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [baremoTxt, setBaremo] = useState(0);
  const [baremoModal, showBaremo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [registerPopupData, setRegisterPopupData] = useState(null);

  const { login, AuthLoading, toggle } = useSelector(state => state.user);
  const text = 'User has been deleted !';

  const getRegisterPopupData = async () => {
    const data = await getRegisterData(login?.data?.id)
    setRegisterPopupData(data?.data)
  }

  useFocusEffect(useCallback(() => { getRegisterPopupData() }, []))


  const apiCall = async () => {
    setpop(false);
    setLoading(true);
    const response = await deleteMyUser(login?.data?.id);
    setLoading(false);
    if (response?.message === text) {
      logoutApi();
    } else {
      Alert.alert('Solicitud fallida', response?.message);
    }
  };

  const barempApiCall = async () => {
    setLoading(true);
    const response = await updateUserBaremo(login?.data?.id, baremoTxt);
    setLoading(false);
    dispatch(getCurrentUser(login?.data?.id));
  };

  const logoutApi = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(onLogoutUser());
    }, 15000);
  };

  const _resetActivity = async () => {
    setLoading(true);
    const result = await resetAllActivities(login?.data?.id);
    setLoading(false);
    if (result?.status === 'Successfull') {
      Alert.alert('', 'Todas las actividades se han reiniciado.');
    }
  };

  const onRegister = async (val) => {
    const response = await addRegister({ ...val, id: login?.data?.id });
    if (response?.status === 'Successful') {
      setShowModal(false)
    }
  }

  return (
    <Container title={"Ajustes"} >
      <View
        style={[
          styles.rowView,
          { marginTop: 0, width: widthPercentageToDP(75) },
        ]}>
        <Text style={styles.itemTitle}>{'Puntos de baremo'}</Text>
        <Text onPress={() => showBaremo(true)} style={styles.itemTitle}>
          {login?.data?.baremo === "." ? 0 : login?.data?.baremo}
        </Text>
      </View>
      <View
        style={[
          styles.rowView,
          { marginTop: 0, width: widthPercentageToDP(80) },
        ]}>
        <Text style={styles.itemTitle}>{'Notificaciones Push'}</Text>
        <ToggleSwitch
          isOn={toggle}
          onColor="green"
          offColor="red"
          labelStyle={{ color: 'black', fontWeight: '900' }}
          size="small"
          onToggle={isOn => dispatch(notificationToggle(isOn))}
        />
      </View>
      <View style={[styles.rowView, { marginTop: 0 }]}>
        <Text style={styles.itemTitle}>{'Resetear Exámenes'}</Text>
        <Button
          title={'Reiniciar'}
          style={styles.btn}
            textStyle={styles.btn_text}
          onPress={() => dispatch(resetAllExams(login?.data?.id))}
        />
      </View>
      <View style={[styles.rowView, { marginTop: 0 }]}>
        <Text style={styles.itemTitle}>{'Resetear Actividades'}</Text>
        <Button
          title={'Reiniciar'}
          style={styles.btn}
          textStyle={styles.btn_text}
          onPress={() => _resetActivity()}
        />

      </View>
      <View style={[styles.rowView, { marginTop: 0 }]}>
        <Text style={styles.itemTitle}>{'Datos registro'}</Text>
        <Button
          title={'Modificar'}
          style={styles.btn}
            textStyle={styles.btn_text}
          onPress={() => {
            getRegisterPopupData()
            setShowModal(true)
          }}
        />
      </View>
      <View style={[styles.rowView, { marginTop: 0 }]}>
        <Text style={styles.itemTitle}>{'Borrar usuario'}</Text>
        <Button
          title={'Confirmar'}
          style={styles.btn}
            textStyle={styles.btn_text}
          onPress={() => setpop(true)}
        />
      </View>

      <ModalBox
        isOpen={isPopUp}
        myText={
          'Tu cuenta y tus datos personales han sido borrados.?'
        }
        noClick={() => setpop(false)}
        closeBox={() => setpop(false)}
        yesClick={() => apiCall()}
      />

      <LoaderModal visible={AuthLoading || isLoading} />
      <BaremoUpdate
        isOpen={baremoModal}
        baremoText={text => setBaremo(text)}
        yesClick={() => {
          if (baremoTxt === 0) {
            Alert.alert('', 'Por favor escriba un número baremo válido.');
          } else {
            showBaremo(false);
            barempApiCall();
          }
        }}
        noClick={() => {
          showBaremo(false);
        }}
        myText={"Escribe los puntos de\n\baremo y pulsa \"Enviar\". "}
      />

      <RegisterModal
        visible={showModal}
        onPressClose={() => setShowModal(false)}
        onPressButton={val => onRegister(val)}
        data={registerPopupData}
      />
    </Container>
  );
};

export default Settings;
