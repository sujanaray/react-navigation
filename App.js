import React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();
function HomeScreen() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
     let iconName;
     if (route.name === 'Home') {
        iconName = focused
        ? 'md-checkmark-circle'
        : 'home-outline';
      } else if (route.name === 'Profile') {
        iconName = focused
        ? 'md-checkmark-circle'
        : 'person-outline';
      }
return <Ionicons name={iconName} size={size} color={color}     />;
        },
      })}
      tabBarOptions={{
      activeTintColor: '#0da2ff',
      inactiveTintColor: 'gray',
      }}
    >
        <Tab.Screen name="Home" component={TabAScreen} />
        <Tab.Screen name="Profile" component={TabBScreen} />
    </Tab.Navigator>
  );
}
function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>No New Notifications!</Text>
      <Button 
      onPress={() => navigation.goBack()}
      title="Go back to home"
      />
    </View>
  );
}
function HelpScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Help page!</Text>
      <Button 
      onPress={() => alert('Link to help')}
      title="Need Help"
      />
      <Button 
      onPress={() => navigation.goBack()}
      title="Go back to home"
      />
    </View>
  );
}
const Stack = createStackNavigator();
function TabAScreen() {
  return (
    <Stack.Navigator initialRouteName="Home"
  screenOptions={({ route, navigation }) => ({headerTintColor: 'white',
          headerStyle: { backgroundColor: '#0da2ff' },
    headerShown: true,
    gestureEnabled: true,
    cardOverlayEnabled: true,
    headerStatusBarHeight:
      navigation
        .dangerouslyGetState()
        .routes.findIndex((r) => r.key === route.key) > 0
        ? 0
        : undefined,
    ...TransitionPresets.ModalPresentationIOS,
  })}
  mode="modal">
      <Stack.Screen name="Home" component={TabADetailsScreen} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
function TabADetailsScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
      <Text>
        Welcome to Home page!
      </Text>
      <Button 
      onPress={() => navigation.navigate('Details')}
      title="Go to Home Details page"
      />
    </View>
  );
}
function Details() {
  return (
    <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
      <Text>
        Home Page Details here!
      </Text>
    </View>
  );
}
function TabBScreen() {
  return (
    <View>
      <Text style={{textAlign: 'center', marginTop: 300}}>
        Welcome to Profiles page!
      </Text>
    </View>
  );
}
const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
<Drawer.Navigator initialRouteName="Home"  drawerStyle={{
    backgroundColor: '#0da2ff',
    width: 240,
  }} >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        </Drawer.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home"  drawerStyle={{
    backgroundColor: '#0da2ff',
    width: 240,
  }} >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Help" component={HelpScreen} />
        </Drawer.Navigator>
    </NavigationContainer>
  )
}