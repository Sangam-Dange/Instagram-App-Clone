import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import LoginForm from "../components/LoginScreen/LoginForm";

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: "https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png",
            height: 100,
            width: 100,
          }}
        />
      </View>
      <LoginForm navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop:50,
    paddingHorizontal:12
  },
  logoContainer:{
      alignItems:"center",
      marginTop:70
  }

});

export default LoginScreen;
