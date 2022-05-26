import React from 'react'
import { View, Text ,SafeAreaView,StyleSheet,Platform,StatusBar} from 'react-native'
import AddNewPost from '../components/NewPost/AddNewPost';

const NewPostScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.SafeAreaView}>
         <AddNewPost navigation={navigation}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    SafeAreaView: {
      flex: 1,
      backgroundColor: "black",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  });

export default NewPostScreen
