
import React from 'react';
import { Button, Icons } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer, getFocusedRouteNameFromRoute, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 
import LandingScreen from './components/screens/Landing';
import HomeScreen from './components/screens/Home';
import SignInScreen from './components/screens/Signin';
import PasswordForgetScreen from './components/screens/PasswordForget';
import SignUpScreen from './components/screens/Signup';
//import DataEntry from './components/screens/DataEntry';
import AdminScreen from './components/screens/Admin';
import Viz from './components/screens/Profile'
import Data from './components/screens/Dataform/Data'
import Df from './components/screens/Dataform/Df'
import Dummy from './components/screens/Dataform/Dummy'
import Data_Shift from './components/screens/Dataform/Data_Shift'
import BrPre from './Br_pre'
import Data_Day from './components/screens/Dataform/Data_Day'
import CardDetails from './components/screens/Tableau_Comp/CardDetails'
import Report from './components/screens/Dataform/Reports'
import ProdReport from './components/Reports/ProdReport'
import BrReport from './components/Reports/BrReport'
import ShiftReport from './components/Reports/ShiftReport'
import DayReport from './components/Reports/DayReport'
import SMSModule from './components/screens/SMS_Module'
import DataEntry from './components/screens/DataEntry';
 
const RootStack = createStackNavigator();

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();
 
const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={'#3385ff'} size={35} />
          ),
        }}/>
      <Tab.Screen name="Viz" component={Viz} options={{
          tabBarLabel: 'Viz',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={'#3385ff'} size={35} />
          ),
          activeTintColor: 'black',
        }}/>
    </Tab.Navigator>
  );
};
 
const HomeDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeTabs} />
      <Drawer.Screen
        name="Viz"
        component={Viz}
      />
      <Drawer.Screen
        name="Forgot Password"
        component={PasswordForgetScreen}
      />
      <Drawer.Screen name="Admin" component={AdminScreen} />
    </Drawer.Navigator>
  );
};
 
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
 
  const handleSignIn = () => {
    // TODO implement real sign in mechanism
 
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    // TODO implement real sign out mechanism
 
    setIsAuthenticated(false);
  };

  const handleSignUp = () => {
    // TODO implement real sign up mechanism
 
    setIsAuthenticated(true);
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {isAuthenticated ? (
          <RootStack.Screen name="Home" component={HomeDrawer} options={({ route, navigation }) => ({
              headerTitle: getFocusedRouteNameFromRoute(route),
               headerLeft: () => (
                <Button
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                  title="Menu"
                />
              ),
              headerRight: () => (
                <Button onPress={handleSignOut} title="Sign Out" />
              ),
            })}/>
        ) : (
          <>
            <RootStack.Screen
              name="Landing"
              component={LandingScreen}
              options={{
                animationTypeForReplace: 'pop',
              }}
            />
            <RootStack.Screen name="Sign In">
              {(props) => (
                <SignInScreen {...props} onSignIn={handleSignIn} />
              )}
            </RootStack.Screen>
            <RootStack.Screen name="Sign Up">
              {(props) => (
                <SignUpScreen {...props} onSignUp={handleSignUp} />
              )}
            </RootStack.Screen>
          </>
        )}
      <RootStack.Screen name="Production Data" component={Data} />
      <RootStack.Screen name="Breakdown Data" component={Df} />
      <RootStack.Screen name="Data Shiftwise" component={Data_Shift} />
      <RootStack.Screen name="Utility" component={Dummy} />
      <RootStack.Screen name="BrPre" component={BrPre} />
      <RootStack.Screen name="Data_Day" component={Data_Day} />
      <RootStack.Screen name="Details" component={CardDetails} options={({ route }) => ({
        headerTitle : `${route.params.headerTitle}`,
      })} />
      <RootStack.Screen name="Report" component={Report} />
      <RootStack.Screen name="ProdReport" component={ProdReport} />
      <RootStack.Screen name="BrReport" component={BrReport} />
      <RootStack.Screen name="ShiftReport" component={ShiftReport} />
      <RootStack.Screen name="DayReport" component={DayReport} />
      <RootStack.Screen name="SMSModule" component={SMSModule} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
 
export default App;