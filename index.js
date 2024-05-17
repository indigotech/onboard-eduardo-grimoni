import {Navigation} from 'react-native-navigation';
import LoginScreen from './components/login-screen.tsx';
import UserList from './components/user-list.tsx';

Navigation.registerComponent('Login', () => LoginScreen);
Navigation.registerComponent('User', () => UserList);

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
