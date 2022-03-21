import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from "react-native-flash-message";
import { Colors, FontFamily } from '../Constants/Constants';

export const createNotificationListener = async () => {
  const {navigation} = useNavigation;
  console.log('coming in noification');

  // messaging().onNotificationOpenedApp(async (remoteMessage) => {
  //     console.log('Notification caused app to open from background state bla bla:', remoteMessage);
  //     alert(remoteMessage)
  //     // navigation.navigate('Haulage')
  // });

  messaging().onNotificationOpenedApp(async remoteMessage => {
    // setTimeout(() => {
    //   console.log(
    //     navigation,
    //     'hte +++++++++++++++++++++++++++++++++++++++++++',
    //   );
    //   remoteMessage.data?.type == "chat_message"
    //    &&  navigation.navigate('SignUp')
    // }, 1000);
  });

  messaging().onMessage(async remoteMessage => {
    console.log('recived in foreground', remoteMessage);
    showMessage({
      description: remoteMessage?.notification?.title,
      message:remoteMessage?.notification?.body,
      type: "info",
      floating: true,
      duration: 4000,
      style: { backgroundColor:Colors.orange,marginTop: Platform.OS == "ios" ? 0 : 20 },
      textStyle: { fontFamily: FontFamily.default },
      titleStyle: { fontFamily: FontFamily.default },
    });
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('remote message', remoteMessage);
      }
    });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
};

// messaging().onTokenRefresh(fcmToken => {
//     console.log("New token refresh: ", fcmToken)

// })
