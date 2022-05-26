//rnfe
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  ScrollView,
} from "react-native";
import Header from "../components/Home/Header";
import Post from "../components/Home/Post";
import Stories from "../components/Home/Stories";
import { Divider } from "react-native-elements/dist/divider/Divider";
import BottomTabs from "../components/Home/BottomTabs";
import { db, auth } from "../firebase";
import {
  collectionGroup,
  onSnapshot,
  query,
  orderBy,
  limit,
  collection,
  where,
} from "firebase/firestore";
import { LogBox } from "react-native";

const HomeScreen = ({ navigation }) => {
  LogBox.ignoreLogs(["Setting a timer"]);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState({});
  const [timelinePosts, setTimelinePosts] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collectionGroup(db, "posts"), orderBy("createdAt", "desc")),
      (snapshot) => {
        setTimelinePosts(
          snapshot.docs.map((post) => ({ id: post.id, ...post.data() }))
        );
      }
    );

    return unsub;
  }, []);

  useEffect(() => {
    const user = auth.currentUser;

    const q = query(
      collection(db, "users"),
      where("owner_uid", "==", user.uid),
      limit(1)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        setCurrentLoggedInUser({
          username: doc.data().username,
          profilePicture: doc.data().profile_picture,
          email: doc.data().email,
        });
      });
    });

    return unsub;
  }, []);

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Header
        navigation={navigation}
        currentLoggedInUser={currentLoggedInUser}
      />
      <Stories />
      <Divider width={0.5} orientation="vertical" />
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        {timelinePosts?.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs currentLoggedInUser={currentLoggedInUser} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default HomeScreen;
