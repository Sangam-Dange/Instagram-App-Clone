import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { auth, signOut } from "../../firebase";
const Header = ({ navigation,currentLoggedInUser }) => {
  const handleSignOut = async () => {
    try {
     
      await signOut(auth);
     console.log("signed out successfull");
    
    } catch (error) {
     
      console.log(error.message);
    }
  };
 

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignOut}>
        <Image
          source={require("../../assets/header-logo.png")}
          style={styles.logo}
        />
       
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
      <Text style={{color:"white"}}>Hello {currentLoggedInUser?.username}</Text>
        <TouchableOpacity onPress={() => navigation.push("NewPostScreen")}>
          <AntDesign
            name="plussquareo"
            size={25}
            style={styles.icon}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name="hearto"
            size={25}
            style={styles.icon}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
          <Image
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/100/ffffff/facebook-messenger.png",
            }}
            style={{
              resizeMode: "contain",
              height: 32,
              width: 31,
              marginLeft: 8,
              top: -4,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop:8
  },

  logo: {
    height: 50,
    width: 100,
    resizeMode: "contain",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems:"center"
  },
  icon: {
    marginLeft: 10,
  },
  unreadBadge: {
    backgroundColor: "#FF3250",
    position: "absolute",
    left: 20,
    bottom: 23,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  unreadBadgeText: {
    color: "white",
    fontWeight: "700",
  },
});
export default Header;
