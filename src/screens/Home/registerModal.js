import {
  Button,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fonts } from '../../utils';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';

const RegisterModal = ({ visible, onPressClose, onPressButton }) => {

  const directionRef = useRef(null)
  const localidadRef = useRef(null)
  const postalRef = useRef(null)
  const dniRef = useRef(null)
  const instagramRef = useRef(null)


  const [direction, setDirection] = useState(null);
  const [localidad, setLocalidad] = useState(null);
  const [postal, setPostal] = useState(null);
  const [dni, setDni] = useState(null);
  const [instagram, setInstagram] = useState(null);
  const [color, setColor] = useState(null);
  const [shirtsize, setShirtsize] = useState(null);
  const [showSizes, setShowSizes] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [error, setError] = useState(null);

  const onPressSubmit = () => {
    if (!direction || direction?.trim()?.length < 1) {
      setError("El Dirección es requerido")
      return
    }
    if (!localidad || localidad?.trim()?.length < 1) {
      setError("El Localidad y provincia es requerido")
      return
    }
    if (!postal || postal?.trim()?.length < 1) {
      setError("El Código postal es requerido")
      return
    }
    if (!dni || dni?.trim()?.length < 1) {
      setError("El DNI es requerido")
      return
    }
    if (!shirtsize) {
      setError("El Talla de camiseta es requerido")
      return
    }
    if (!color) {
      setError("El Color de camiseta es requerido")
      return
    }



    const apiData = {
      shirtsize: shirtsize,
      color: color,
      dni: dni,
      domi: direction,
      localidad: localidad,
      postal: postal,
      direction: direction,
      instagram: instagram || '',
    };

    console.log('apiDtata', apiData);
    onPressButton(apiData);
  };

  return (
    <Modal transparent visible={visible}>
      <View style={styles.main_view}>
        <ImageBackground
          style={styles.sub_view}
          imageStyle={{ height: '100%', width: '100%' }}
          source={require('./assets/registerPopupBack.jpeg')}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPressClose}
            style={styles.icon_view}>
            <AntDesign name="close" color={'white'} size={30} />
          </TouchableOpacity>
          <Image
            style={{ height: 50, width: '60%', alignSelf: 'center' }}
            resizeMode="contain"
            source={require('../../Images/veoestudio.png')}
          />
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 12,
              fontFamily: fonts.novaBold,
              color: "#fff",
              fontSize: widthPercentageToDP(4),
            }}>
            {'iYA PUEDES DISFRUTAR DE TU\nPRUEBA DE 30 DÍAS GRATIS!'}
          </Text>
          <ScrollView
            keyboardShouldPersistTaps={"handled"}
            showsVerticalScrollIndicator={false}>
            <TextInput
              ref={directionRef}
              placeholderTextColor={"#fff"}
              value={direction}
              onChangeText={text => {
                setError(null);
                setDirection(text);
              }}
              style={styles.input}
              placeholder="Dirección (calle, número, piso, letra)"
              maxLength={255}
              onSubmitEditing={() => localidadRef.current.focus()}
            />
            <TextInput
              ref={localidadRef}
              placeholderTextColor={"#fff"}
              value={localidad}
              onChangeText={text => {
                setError(null);
                setLocalidad(text);
              }}
              style={styles.input}
              placeholder="Localidad y provincia"
              maxLength={255}
              onSubmitEditing={() => postalRef.current.focus()}
            />
            <TextInput
              ref={postalRef}
              placeholderTextColor={"#fff"}
              value={postal}
              onChangeText={text => {
                setError(null);
                setPostal(text);
              }}
              maxLength={20}
              style={styles.input}
              placeholder="Código postal"
              keyboardType="number-pad"
              onSubmitEditing={() => dniRef.current.focus()}
            />
            <TextInput
              ref={dniRef}
              placeholderTextColor={"#fff"}
              value={dni}
              onChangeText={text => {
                setError(null);
                setDni(text);
              }}
              style={styles.input}
              placeholder="DNI"
              keyboardType="number-pad"
              maxLength={20}
              onSubmitEditing={() => instagramRef.current.focus()}
            />
            <TextInput
              ref={instagramRef}
              placeholderTextColor={"#fff"}
              value={instagram}
              onChangeText={text => {
                setError(null);
                setInstagram(text);
              }}
              style={styles.input}
              placeholder="Instagram (optional)"
              onSubmitEditing={() => setShowSizes(true)}
            />

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setShowSizes(!showSizes)}
              style={styles.dropdown}>
              <Text style={{
                color: "#fff", flex: 1, textAlign
                  : "center"
              }} >{shirtsize || 'Talla de camiseta'}</Text>
              <AntDesign
                name={showSizes ? 'caretup' : 'caretdown'}
                size={12}
                color={'white'}
              />
            </TouchableOpacity>
            {showSizes && (
              <>
                {['S', 'L', 'M']?.map((item, index) => (
                  <TouchableOpacity
                    key={item}
                    activeOpacity={0.6}
                    onPress={() => {
                      setError(null)
                      setShirtsize(item);
                      setShowSizes(false);
                      setShowColors(true)
                    }}
                    style={styles.list_view}>
                    <Text style={styles.list_text}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setShowColors(!showColors)}
              style={styles.dropdown}>
              <Text style={{
                color: "#fff", flex: 1, textAlign
                  : "center"
              }} >{color || 'Color de camiseta'}</Text>
              <AntDesign
                name={showColors ? 'caretup' : 'caretdown'}
                size={12}
                color={'white'}
              />
            </TouchableOpacity>
            {showColors && (
              <>
                {['Blanco', 'Negro']?.map((item, index) => (
                  <TouchableOpacity
                    key={item}
                    activeOpacity={0.6}
                    onPress={() => {
                      setError(null)
                      setColor(item);
                      setShowColors(!showColors);
                    }}
                    style={styles.list_view}>
                    <Text style={styles.list_text}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}

            {error && <Text style={styles.error}>{error} </Text>}

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onPressSubmit}
              style={styles.btn}>
              <Text style={{ color: "#fff" }} >AMPLIAR A 30 días Gratis</Text>
            </TouchableOpacity>

            <View style={{ height: 20 }} />
          </ScrollView>
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default RegisterModal;

const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
  },
  sub_view: {
    height: '90%',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  icon_view: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: 12,
    marginRight: 12,
  },
  input: {
    width: '80%',
    alignSelf: 'center',
    height: 50,
    marginTop: 20,
    borderColor: 'white',
    // borderWidth: 1,
    paddingHorizontal: 12,
    textAlign: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    color: "#fff",
    shadowRadius: 16.0,
    fontFamily: fonts.novaRegular,
    fontSize: widthPercentageToDP(4),
    elevation: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dropdown: {
    width: '80%',
    alignSelf: 'center',
    height: 50,
    marginTop: 20,
    borderColor: 'white',
    // borderWidth: 1,
    paddingHorizontal: 12,
    textAlign: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  list_view: {
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '80%',
    alignSelf: 'center',
    borderBottomColor: '#444444',
    borderBottomWidth: 1,
  },
  list_text: {
    color: 'black',
  },
  btn: {
    marginTop: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    width: '80%',
    alignSelf: 'center',
  },
  error: {
    color: 'red',
    fontFamily: fonts.novaBold,
    fontSize: heightPercentageToDP(1.5),
    marginLeft: 40,
    marginTop: 12
  },
});
