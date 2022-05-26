import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../firebase";
import {
  collection,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const handleLike = (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(
      auth.currentUser.email
    );
    setLiked(currentLikeStatus)

    updateDoc(doc(db, "users", post.owner_email, "posts", post.id), {
      likes_by_users: currentLikeStatus
        ? arrayUnion(auth.currentUser.email)
        : arrayRemove(auth.currentUser.email),
    }).then(()=>{
      console.log("updated succefully ")
    }).catch((err)=>{
      console.log("error :", err)
    })
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <PostHeader post={post} />
      <PostImage post={post} />
      <PostFooter post={post} handleLike={handleLike} liked={liked} />
      <Likes post={post} />
      <Caption post={post} />
      <CommentSection post={post} />
      <Comment post={post} />
    </View>
  );
};
const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      margin: 5,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: post.profilePic }} style={styles.story} />
      <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
        {post.userName}
      </Text>
    </View>
    <TouchableOpacity>
      <Feather name="more-horizontal" size={24} color="white" />
    </TouchableOpacity>
  </View>
);

const PostImage = ({ post }) => (
  <View style={{ width: "100%", height: 490 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostFooter = ({ post, handleLike ,liked}) => {
  

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 4,
        marginHorizontal: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: 110,
          marginLeft: 4,
        }}
      >
        
          <TouchableOpacity onPress={()=>handleLike(post)}>
            <AntDesign
              name={!liked ? "hearto" : "heart"}
              size={26}
              color={!liked ? "white" : "red"}
            
            />
          </TouchableOpacity>
       

        <TouchableOpacity>
          <Ionicons name="chatbubble-outline" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="send" size={26} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ marginRight: 3 }}>
        <Feather name="bookmark" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginLeft: 9 }}>
    <Text style={{ color: "white", fontWeight: "700" }}>
      {post.likes_by_users.length
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
      likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginVertical: 3, marginHorizontal: 9 }}>
    <Text style={{ color: "white" }}>
      <Text style={{ fontWeight: "700" }}>{post.userName + "  "}</Text>
      <Text>{post.caption}</Text>
    </Text>
  </View>
);

const CommentSection = ({ post }) => (
  <View style={{ marginLeft: 9 }}>
    {!!post.comments.length && (
      <Text style={{ color: "grey" }}>
        View {post.comments.length > 1 ? "all " : ""}
        {post.comments.length}{" "}
        {post.comments.length > 1 ? "comments" : "comment"}
      </Text>
    )}
  </View>
);

const Comment = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View
        key={index}
        style={{ flexDirection: "row", marginLeft: 9, marginTop: 3 }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>
          {comment.user + "  "}
        </Text>
        <Text style={{ color: "white" }}>{comment.comment}</Text>
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    marginLeft: 6,
    borderRadius: 50,
    borderWidth: 1.6,
    borderColor: "#0e929c",
  },
});
export default Post;
