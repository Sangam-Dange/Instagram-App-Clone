import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, Button } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements";
import validUrl from "valid-url";
import { auth } from "../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  limit,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

const PLACEHOLDER =
  "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required"),
  caption: Yup.string().max(2200, "Caption has reached the character limit"),
});

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState({});

  

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
        });
      });
    });
    return unsub;
  }, []);

  const uploadPost = (imageUrl, caption) => {
    const post = doc(db, "users", auth.currentUser.email);

    const unsub = addDoc(collection(post, "posts"), {
      imageUrl: imageUrl,
      userName: currentLoggedInUser.username,
      profilePic: currentLoggedInUser.profilePicture,
      owner_uid: auth.currentUser.uid,
      owner_email:auth.currentUser.email,
      caption: caption,
      createdAt: serverTimestamp(),
     
      likes_by_users: [],
      comments: [],
    }).then(() => navigation.goBack());
    return unsub;
  };

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        uploadPost(values.imageUrl, values.caption);
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 20,
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "flex-start",
            }}
          >
            <Image
              source={{
                uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER,
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 5,
                marginLeft: -8,
              }}
            />

            <View
              style={{
                flex: 1,
                marginLeft: 15,

                display: "flex",
                flexDirection: "row",
              }}
            >
              <TextInput
                placeholder="Write a caption..."
                placeholderTextColor="gray"
                multiline={true}
                style={{
                  color: "white",
                  fontSize: 20,
                }}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
          </View>
          <Divider width={0.2} orientation="vertical" />
          <TextInput
            style={{ color: "white", fontSize: 17 }}
            placeholder="Enter Image Url"
            placeholderTextColor="gray"
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            value={values.imageUrl}
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
          />
          {errors.imageUrl && (
            <Text style={{ fontSize: 10, color: "red" }}>
              {errors.imageUrl}
            </Text>
          )}
          <View style={{ width: 120, marginTop: 20, alignSelf: "center" }}>
            <Button
              onPress={handleSubmit}
              title="Share"
              disabled={!isValid}
              color="#000"
            />
          </View>
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;
