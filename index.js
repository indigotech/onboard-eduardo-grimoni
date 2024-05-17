import {Navigation} from 'react-native-navigation';
import LoginScreen from './components/login-screen.tsx';
import HomeScreen from './components/home-screen.tsx';

Navigation.registerComponent('Login', () => LoginScreen);
Navigation.registerComponent('Home', () => HomeScreen);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Login',
            },
          },
        ],
      },
    },
  });
});
