import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ConfirmDelete from '../auth/ConfirmDelete';
import NaviButtonStyles from '../styles/NaviButton';
import TextStyles from '../styles/TextStyle';

const MyPostsScreen = () => {
  const navigation = useNavigation();
  const [userPosts, setUserPosts] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  //This will fetch and display the current user's posts from Firestore
  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      //onSnapshot method will be triggered whenever there is a change in the posts collection (add, edit, delete)
      const unsubscribe = firestore()
        .collection('posts')
        .where('posterId', '==', userId)
        //onSnapshot fetches the data of each document from the posts collection and then pushes the data into posts array
        .onSnapshot((querySnapshot) => { 
          const posts = [];
          querySnapshot.forEach((documentSnapshot) => {
            posts.push({
              id: documentSnapshot.id,
              ...documentSnapshot.data(),
            });
          });
          //This will sort the posts by date in descending order, so newest post should show on top
          const sortedPosts = posts.sort((a, b) => {
            const dateA = new Date(a.datePosted);
            const dateB = new Date(b.datePosted);
            return dateB - dateA;
          });
          
          setUserPosts(sortedPosts); 
        });

      return () => unsubscribe();
    }
  }, []);

  //This identifies the post to be deleted, and brings up the delete confirmation box
  const handleDeletePost = (postId) => {
    setPostToDelete(postId);
    setConfirmDelete(true); //ConfirmDelete is set to true, meaning the confirmation box will be shown
  };
  //If user clicked "Delete" on the popup confirmation box, this part actually does the removing of the post from Firestore 
  const confirmDeletePost = async () => {
    try {
      await firestore().collection('posts').doc(postToDelete).delete();
      setConfirmDelete(false); //ConfirmDelete is set to false, hiding the box
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  //If user clicked "Cancel" on the popup confirmation box, ConfirmDelete is set to false, hiding the box
  const cancelDeletePost = () => {
    setConfirmDelete(false);
  };

  //Function for navigating to Home screen
  const goToHome = () => {
    navigation.navigate('Home');
  };
  //Function for navigating to Dashboard screen
  const goToDashboard = () => {
    navigation.navigate('Dashboard');
  };
  //Function for navigating to CreatePost screen
  const goToShare = () => {
    navigation.navigate('CreatePost');
  };
  //This function finds the data of the post to edit and then navigates to EditPost screen with the selected post's data.
  const handleEditPost = (postId) => {
  const postData = userPosts.find((post) => post.id === postId);
    navigation.navigate('EditPost', { postId, postData });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
      <FlatList
        data={userPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={TextStyles.Text}>{item.description}</Text>
            {item.imageUri && (
              <View style={{ alignItems: 'center' }}>
                <Image source={{ uri: item.imageUri }} style={styles.image} />
              </View>
            )}
            <View style={styles.buttons}>
              <View style={styles.button}>
            <Button title="Edit" onPress={() => handleEditPost(item.id)} />
            </View>
            <View style={styles.button}>
            <Button
                title="Delete"
                color="red"
                onPress={() => handleDeletePost(item.id)}
            />
            </View>
            </View>
          </View>
        )}
      />
      </View>
      <View style={NaviButtonStyles.buttonContainer}>
        <Button title="Home" onPress={goToHome} />
        <Button title="Dashboard" onPress={goToDashboard} />
        <Button title="Create Post" onPress={goToShare} />
      </View>
      <ConfirmDelete
        isVisible={confirmDelete}
        onDelete={confirmDeletePost}
        onCancel={cancelDeletePost}
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    marginBottom: 60
  },
  image: {
    width: "100%",
    maxWidth: 400,
    height: 300,
  },
  buttons: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  button: {
    flex: 1, 
    maxWidth: "50%"
  },
});

export default MyPostsScreen;
