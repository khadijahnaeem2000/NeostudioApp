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
import React, { useEffect, useRef, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fonts } from '../../../utils';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../../Component/MakeMeResponsive';
import { images } from '../../../constant';

const RegisterModal = ({ visible, onPressClose, onPressButton, data }) => {

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const phoneRef = useRef(null)
  const baremoRef = useRef(null)
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const directionRef = useRef(null)
  const localidadRef = useRef(null)
  const postalRef = useRef(null)
  const dniRef = useRef(null)
  const instagramRef = useRef(null)


  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [baremo, setBaremo] = useState(null);
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

  useEffect(() => {
    if (data) {
      setName(data?.name || null)
      setEmail(data?.email || null)
      setPhone(data?.telephone || null)
      setBaremo(data?.baremo || null)
      setUsername(data?.username || null)
      setPassword(data?.password || null)
      setDirection(data?.domi || null)
      setLocalidad(data?.localidad || null)
      setPostal(data?.postal || null)
      setDni(data?.dni || null)
      setInstagram(data?.Instagram || null)
      setColor(data?.color || null)
      setShirtsize(data?.shirtsize || null)
    }

  }, [data])


  const onPressSubmit = () => {
    if (!name || name?.trim()?.length < 1) {
      setError("Name es requerido")
      return
    }
    if (!email || email?.trim()?.length < 1) {
      setError("Email es requerido")
      return
    }
    if (!phone || phone?.trim()?.length < 1) {
      setError("Telephone es requerido")
      return
    }
    if (!baremo || baremo?.trim()?.length < 1) {
      setError("Baremo es requerido")
      return
    }
    if (!username || username?.trim()?.length < 1) {
      setError("Username es requerido")
      return
    }
    if (!password || password?.trim()?.length < 1) {
      setError("Password es requerido")
      return
    }
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
      shirtsize,
      color,
      dni,
      domi: direction,
      localidad,
      postal,
      direction,
      name,
      email,
      telephono:phone,
      baremo,
      username,
      password,
      Instagram: instagram || '',
    };

    onPressButton(apiData);
  };

  return (
    <Modal transparent visible={visible}>
      <View style={styles.main_view}>
        <ImageBackground
          style={styles.sub_view}
          imageStyle={{ height: '100%', width: '100%' }}
          source={images.register_modal_background_image}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPressClose}
            style={styles.icon_view}>
            <AntDesign name="close" color={'white'} size={30} />
          </TouchableOpacity>
          <Image
            style={{ height: 50, width: '60%', alignSelf: 'center' }}
            resizeMode="contain"
            source={images.logo}
          />
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 12,
              fontFamily: fonts.novaBold,
              color: "#fff",
              fontSize: widthPercentageToDP(4),
            }}>
            {data ? '¿Quieres modificar tus datos personales?' : 'iYA PUEDES DISFRUTAR DE TU\nPRUEBA DE 48 HORAS GRATIS!'}
          </Text>
          <ScrollView
            keyboardShouldPersistTaps={"handled"}
            showsVerticalScrollIndicator={false}>
            <TextInput
              ref={nameRef}
              placeholderTextColor={"#fff"}
              value={name}
              onChangeText={text => {
                setError(null);
                setName(text);
              }}
              style={styles.input}
              placeholder="Nombre"
              maxLength={255}
              onSubmitEditing={() => emailRef.current.focus()}
            />
            <TextInput
              ref={emailRef}
              placeholderTextColor={"#fff"}
              value={email}
              onChangeText={text => {
                setError(null);
                setEmail(text);
              }}
              style={styles.input}
              placeholder="Correo electrónico"
              maxLength={255}
              onSubmitEditing={() => phoneRef.current.focus()}
            />
            <TextInput
              ref={phoneRef}
              placeholderTextColor={"#fff"}
              value={phone}
              onChangeText={text => {
                setError(null);
                setPhone(text);
              }}
              style={styles.input}
              placeholder="Teléfono"
              maxLength={255}
              onSubmitEditing={() => usernameRef.current.focus()}
            />
            <TextInput
              ref={usernameRef}
              placeholderTextColor={"#fff"}
              value={username}
              onChangeText={text => {
                setError(null);
                setUsername(text);
              }}
              style={styles.input}
              placeholder="Usuario"
              maxLength={255}
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            <TextInput
              ref={passwordRef}
              placeholderTextColor={"#fff"}
              value={password}
              onChangeText={text => {
                setError(null);
                setPassword(text);
              }}
              style={styles.input}
              placeholder="Contraseña"
              maxLength={255}
              onSubmitEditing={() => baremoRef.current.focus()}
            />
            <TextInput
              ref={baremoRef}
              placeholderTextColor={"#fff"}
              value={baremo}
              onChangeText={text => {
                setError(null);
                setBaremo(text);
              }}
              style={styles.input}
              placeholder="Baremo"
              maxLength={255}
              onSubmitEditing={() => directionRef.current.focus()}
            />
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
              <Text style={{ color: "#fff" }} >{data ? "GUARDAR" : "AMPLIAR A 48 HORAS Gratis"}</Text>
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