import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Divider } from "react-native-elements/dist/divider/Divider";

 

const BottomTabs = ({currentLoggedInUser}) => {
  const [activeTab, setActiveTab] = useState("Home");
  
  const bottomTabIcons = [
    {
      name: "Home",
      active: "https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png",
      inactive:
        "https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png",
    },
    {
      name: "Search",
      active: "https://img.icons8.com/ios-filled/500/ffffff/search--v1.png",
      inactive: "https://img.icons8.com/ios/500/ffffff/search--v1.png",
    },
    {
      name: "Reels",
      active: "https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png",
      inactive: "https://img.icons8.com/ios/500/ffffff/instagram-reel.png",
    },
    {
      name: "Shop",
      active:
        "https://img.icons8.com/fluency-systems-filled/48/ffffff/shopping-bag-full.png",
      inactive:
        "https://img.icons8.com/fluency-systems-regular/48/ffffff/shopping-bag-full.png",
    },
    {
      name: "Profile",
      active:currentLoggedInUser?.profilePicture,
        
      inactive:
      currentLoggedInUser?.profilePicture,
    },
  ];


  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image
        source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }}
        style={[
          styles.icon,
          icon.name === "Profile" ? styles.profilePic() : null,
          activeTab === "Profile" && icon.name === activeTab
            ? styles.profilePic(activeTab)
            : null,
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {bottomTabIcons.map((icon, index) => (
          <Icon icon={icon} key={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // position: "absolute",
    width: "100%",
    bottom: "0%",
    zIndex: 999,
    backgroundColor: "#000",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 5,
    height: 45,
  },
  icon: { height: 30, width: 30 },
  profilePic: (activeTab = "") => ({
    borderRadius: 50,
    borderWidth: activeTab === "Profile" ? 2 : 0,
    borderColor: "#0e929c",
  }),
});

export default BottomTabs;
