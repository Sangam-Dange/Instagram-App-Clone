import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { users } from "../../data/users";

const Stories = () => {
  return (
    <View style={{ marginBottom: 10, }} >
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        {users.map(({ userName, profilePic }, index) => (
          <View key={index} style={styles.storyContainer}>
            <Image source={{ uri: profilePic }} style={styles.story} />
            <Text style={{ color: "white" }}>
              {userName.length > 10
                ? userName.slice(0, 9).toLowerCase() + "..."
                : userName.toLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  storyContainer: {
    alignItems: "center",
    marginLeft: 10,
  },

  story: {
    width: 70,
    height: 70,
    
    borderRadius: 50,
    borderWidth: 2.5,
    borderColor: "#0e929c",
  },
});

export default Stories;
