import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { useSelector} from 'react-redux';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import Header from '../../Component/Header';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
import {showHUD, hideHUD} from '../../Component/Loader';
import {
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  getSubscriptions,
  requestPurchase,

} from 'react-native-iap';
import {updateSubscription} from '../../Redux/action';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const items = Platform.select({
  ios: [
    'NGC2_15_PM',
    'NGC2_25_PF',
    'NGC2_120_PA',
    'NGC2_45_OM',
    'NGC2_75_OF',
    'NGC2_360_OA',
    'NGC2_80_DM',
    'NGC2_120_DF',
    'NGC2_560_DA',
  ],
  android: [''],
});

let purchaseUpdateListner;
let purchaseErrorListner;

const IAPurchase = props => {
  const login = useSelector(state => state.user.login);
  const [purchased, setPurchase] = useState(false);
  const [products, setProducts] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [tenure, setTenure] = useState('');
  const [packagePlan, setPackage] = useState('');
  const [myReceipt, setMyReceipt] = useState('');

   let purchaseUpdateSubscription = null;
   let purchaseErrorSubscription = null;

  useEffect(() => {
    if (Platform.OS === 'ios') {
        initConnection()
          .catch(error => {
          })
          .then(() => {
            getSubscription();
          });
        purchaseErrorSubscription = purchaseErrorListener(error => {
          setLoading(false);
        });
        purchaseUpdateSubscription = purchaseUpdatedListener(purchase => {
          try {
            const recipt = purchase?.transactionReceipt;
            setLoading(false);
            setMyReceipt(recipt);
            if (recipt) {
              updateMyPackage(amount, tenure, packagePlan);
              finishTranc(purchase);
            }
          } catch (error) {
            // setLoading(false);
          }
        });
     
    }
    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }

      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
    };
  }, []);

  const getSubscription = async () => {
    setLoading(true);
    try {
      const products = await getSubscriptions({skus: items});
      setProducts(products);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const validate = async receipt => {
    const reciptBody = {
      'receipt-data': receipt,
      password: '70f6c4d6a650424c9636968b5fbc6b3a',
    };
    const result = await IAP.validateReceiptIos(reciptBody, true)
      .catch(error => {
      })
      .then(receipt => {
        try {
          const renewalHistory = receipt.latest_expired_receipt_info;
          const expiration = renewalHistory.expires_date_ms;
          let expired = Date.now() > expiration;
          if (!expired) {
            setPurchase(true);
          } else {
            Alert.alert(
              'expire subscription',
              'Your subscription has been expired',
            );
          }
        } catch (error) {
        }
      });
  };

  const updateMyPackage = async (amount, tenure, packagePlan) => {
    await updateSubscription(
      login?.data?.id,
      amount,
      tenure,
      packagePlan,
      'success',
    );
     setLoading(false);
  };

  const requestPurchaseItem = async sku => {
    try {
      setLoading(true);
      await requestPurchase({
        sku,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });
    } catch (err) {
      Alert.alert('Error', err?.message)
    }
  };

  return (
    <FastImage
      source={require('../../Images/bg.png')}
      resizeMode={FastImage.resizeMode.stretch}
      style={styles.container}>
      <FastImage
        source={
          Platform.OS === 'android'
            ? require('../../Images/veoestudio.png')
            : require('../../Images/ios_logo.png')
        }
        resizeMode={FastImage.resizeMode.contain}
        style={styles.logo}
      />
      <Header
        iconName="left"
        leftClick={() => props.navigation.goBack()}
        title={'¡Pídelo ya!'}
      />
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        {!products || !products.length ? (
          <View />
        ) : (
          <View>
            <Text
              style={[
                styles.title,
                {
                  textAlign: 'center',
                  fontSize: widthPercentageToDP(8),
                  //marginBottom: heightPercentageToDP(3),
                  marginTop: heightPercentageToDP(2),
                },
              ]}>
              {'Plata'}
            </Text>
            <FastImage
              source={require('../../Images/Plata.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.packageImageView}
            />
            <FastImage
              source={require('./assets/Plata_min.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.packageDetail}
            />
            <View style={styles.rowView}>
              <TouchableOpacity
                style={{width: '33%', height: '100%'}}
                onPress={() => {
                  setLoading(true),
                    setPackage('4'),
                    setTenure('monthly'),
                    setAmount(products[2].price.toString()),
                    requestPurchaseItem(products[2]['productId'])
                    //IAP.requestSubscription(products[2]['productId']);
                }}>
                <FastImage
                  source={{
                    uri: 'https://www.neoestudio.net/neostudio/pages/comienza/Mensual.png',
                    priority: 'high',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={{width: '33%', height: '100%'}}
                onPress={() => {
                  setLoading(true);
                  setPackage('4');
                  setTenure('fractional');
                  setAmount(products[3].price);
                  IAP.requestSubscription(products[3]['productId']);
                }}>
                <FastImage
                  source={{
                    uri: 'https://www.neoestudio.net/neostudio/pages/comienza/Fraccionado.png',
                    priority: 'high',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity> */}
              <TouchableOpacity
                style={{width: '33%', height: '100%'}}
                onPress={() => {
                  setLoading(true);
                  setPackage('4');
                  setTenure('annual');
                  setAmount(products[1].price);
                  requestPurchaseItem(products[1]['productId'])
                  // IAP.requestSubscription(products[1]['productId']);
                }}>
                <FastImage
                  source={{
                    uri: 'https://www.neoestudio.net/neostudio/pages/comienza/Anual.png',
                    priority: 'high',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.rowView,
                {
                  height: heightPercentageToDP(5),
                  justifyContent: 'space-around',
                },
              ]}>
              <Text
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4),
                    //marginBottom: heightPercentageToDP(3),
                  },
                ]}>
                {products[2].localizedPrice}
                <Text
                  style={[
                    styles.title,
                    {
                      fontFamily: 'Proximasoft-Regular',
                      fontSize: widthPercentageToDP(4),
                    },
                  ]}>
                  {'/mes'}
                </Text>
              </Text>
              {/* <Text
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4),
                    marginRight: widthPercentageToDP(2),
                  },
                ]}>
                {products[3].localizedPrice}
                <Text
                  style={[
                    styles.title,
                    {
                      fontFamily: 'Proximasoft-Regular',
                      fontSize: widthPercentageToDP(4),
                    },
                  ]}>
                  {'\n' + 'durante 6 meses'}
                </Text>
              </Text> */}
              <Text
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4),
                    marginRight: widthPercentageToDP(3.5),
                  },
                ]}>
                {products[1].localizedPrice}
              </Text>
            </View>
            {/* Oro section start */}

            {/* <Text
              style={[
                styles.title,
                {
                  textAlign: 'center',
                  fontSize: widthPercentageToDP(8),
                  //marginBottom: heightPercentageToDP(3),
                  marginTop: heightPercentageToDP(2),
                },
              ]}>
              {'Oro'}
            </Text>
            <FastImage
              source={require('../../Images/Oro.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.packageImageView}
            />
            <FastImage
              source={require('./assets/Oro_min.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={[
                styles.packageDetail,
                {
                  height: widthPercentageToDP(160),
                },
              ]}
            />
            <View style={styles.rowView}>
              <TouchableOpacity
                style={{width: '33%', height: '100%'}}
                onPress={() => {
                  setLoading(true);
                  setPackage('5');
                  setTenure('monthly');
                  setAmount(products[5].price);
                  IAP.requestSubscription(products[5]['productId']);
                }}>
                <FastImage
                  source={{
                    uri: 'https://www.neoestudio.net/neostudio/pages/comienza/Mensual.png',
                    priority: 'high',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: '33%', height: '100%'}}
                onPress={() => {
                  setLoading(true);
                  setPackage('5');
                  setTenure('fractional');
                  setAmount(products[7].price);
                  IAP.requestSubscription(products[7]['productId']);
                }}>
                <FastImage
                  source={{
                    uri: 'https://www.neoestudio.net/neostudio/pages/comienza/Fraccionado.png',
                    priority: 'high',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: '33%', height: '100%'}}
                onPress={() => {
                  setLoading(true);
                  setPackage('5');
                  setTenure('annual');
                  setAmount(products[4].price);
                  IAP.requestSubscription(products[4]['productId']);
                }}>
                <FastImage
                  source={{
                    uri: 'https://www.neoestudio.net/neostudio/pages/comienza/Anual.png',
                    priority: 'high',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.rowView,
                {
                  height: heightPercentageToDP(5),
                  justifyContent: 'space-around',
                },
              ]}>
              <Text
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4),
                    //marginBottom: heightPercentageToDP(3),
                  },
                ]}>
                {products[5].localizedPrice}
                <Text
                  style={[
                    styles.title,
                    {
                      fontFamily: 'Proximasoft-Regular',
                      fontSize: widthPercentageToDP(4),
                    },
                  ]}>
                  {'/mes'}
                </Text>
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4),
                    marginRight: widthPercentageToDP(2),
                  },
                ]}>
                {products[7].localizedPrice}
                <Text
                  style={[
                    styles.title,
                    {
                      fontFamily: 'Proximasoft-Regular',
                      fontSize: widthPercentageToDP(4),
                    },
                  ]}>
                  {'\n' + 'durante 6 meses'}
                </Text>
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4),
                    marginRight: widthPercentageToDP(3.5),
                  },
                ]}>
                {products[4].localizedPrice}
              </Text>
            </View> */}

            {/* Diamante section start */}
            <Text
              style={[
                styles.title,
                {
                  textAlign: 'center',
                  fontSize: widthPercentageToDP(8),
                  //marginBottom: heightPercentageToDP(3),
                  marginTop: heightPercentageToDP(2),
                },
              ]}>
              {'Diamante'}
            </Text>
            <FastImage
              source={require('../../Images/Oro.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.packageImageView}
            />
            <FastImage
              source={require('./assets/Diamante_min.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={[
                styles.packageDetail,
                {
                  height: widthPercentageToDP(180),
                },
              ]}
            />
            <View style={styles.rowView}>
              <TouchableOpacity
                style={{width: '33%', height: '100%'}}
                onPress={() => {
                  setLoading(true);
                  setPackage('6');
                  setTenure('monthly');
                  setAmount(products[8].price);
                  // IAP.requestSubscription(products[8]['productId']);
                  requestPurchaseItem(products[8]['productId'])
                }}>
                <FastImage
                  source={{
                    uri: 'https://www.neoestudio.net/neostudio/pages/comienza/Mensual.png',
                    priority: 'high',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={{width: '33%', height: '100%'}}
                onPress={() => {
                  setLoading(true);
                  setPackage('6');
                  setTenure('fractional');
                  setAmount(products[0].price);
                  requestPurchaseItem(products[0]['productId'])
                  // IAP.requestSubscription(products[0]['productId']);
                }}>
                <FastImage
                  source={{
                    uri: 'https://www.neoestudio.net/neostudio/pages/comienza/Fraccionado.png',
                    priority: 'high',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity> */}
              <TouchableOpacity
                style={{width: '33%', height: '100%'}}
                onPress={() => {
                  setLoading(true);
                  setPackage('6');
                  setTenure('annual');
                  setAmount(products[6].price);
                  //IAP.requestSubscription(products[6]['productId']);
                  requestPurchaseItem(products[6]['productId'])
                }}>
                <FastImage
                  source={{
                    uri: 'https://www.neoestudio.net/neostudio/pages/comienza/Anual.png',
                    priority: 'high',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.rowView,
                {
                  height: heightPercentageToDP(5),
                  justifyContent: 'space-around',
                },
              ]}>
              <Text
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4),
                    //marginBottom: heightPercentageToDP(3),
                  },
                ]}>
                {products[8].localizedPrice}
                <Text
                  style={[
                    styles.title,
                    {
                      fontFamily: 'Proximasoft-Regular',
                      fontSize: widthPercentageToDP(4),
                    },
                  ]}>
                  {'/mes'}
                </Text>
              </Text>
              {/* <Text
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4),
                    marginRight: widthPercentageToDP(2),
                  },
                ]}>
                {products[0].localizedPrice}
                <Text
                  style={[
                    styles.title,
                    {
                      fontFamily: 'Proximasoft-Regular',
                      fontSize: widthPercentageToDP(4),
                    },
                  ]}>
                  {'\n' + 'durante 6 meses'}
                </Text>
              </Text> */}
              <Text
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4),
                    marginRight: widthPercentageToDP(3.5),
                  },
                ]}>
                {products[6].localizedPrice}
              </Text>
            </View>
            <View
              style={[
                styles.rowView,
                {
                  height: heightPercentageToDP(5),
                  justifyContent: 'space-around',
                },
              ]}>
              <Text
                onPress={() => {
                  Linking.openURL(
                    'https://neoestudio.net/pol%C3%ADtica-de-privacidad-y-protecci%C3%B3n-de-datos',
                  );
                }}
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4.5),
                    marginLeft: widthPercentageToDP(2),
                    //marginRight: widthPercentageToDP(2)
                  },
                ]}>
                {'Política de privacidad'}
              </Text>
              <Text
                onPress={() => {
                  Linking.openURL(
                    'https://neoestudio.net/aviso-legal-y-t%C3%A9rminos-de-uso',
                  );
                }}
                style={[
                  styles.title,
                  {
                    textAlign: 'center',
                    fontSize: widthPercentageToDP(4.5),
                    marginRight: widthPercentageToDP(2),
                    //marginRight: widthPercentageToDP(2)
                  },
                ]}>
                {'Términos de servicio'}
              </Text>
            </View>
          </View>
        )}
        <View style={{height: heightPercentageToDP(4)}} />
      </KeyboardAwareScrollView>
      {isLoading ? showHUD('Cargando..') : hideHUD()}
    </FastImage>
  );
};

export default IAPurchase;
