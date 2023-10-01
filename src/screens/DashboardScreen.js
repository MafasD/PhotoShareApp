//The screen where posts created by users will appear.
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import TextStyles from '../styles/TextStyle';
import NaviButtonStyles from '../styles/NaviButton';

const DashboardScreen = () => {
  const navigation = useNavigation(); //Initializing the navigation object
  const [posts, setPosts] = useState([]); //This will store the posts data fetched from Firestore

  //Function for navigating to Home screen
  const goToHome = () => {
    navigation.navigate('Home');
  };
  //Function for navigating to Dashboard screen
  const goToShare = () => {
    navigation.navigate('CreatePost');
  };
  //Function for navigating to MyPosts screen
  const goToMyPosts = () => {
    navigation.navigate('MyPosts');
  };      

  //Function for fetching the posts from Firestore
  const fetchPosts = async () => {
    try {
      const postsRef = firestore().collection('posts');
      const snapshot = await postsRef.get();
      //If snapshot is not empty, the documents will be mapped to an array of post data.
      if (!snapshot.empty) {
        const postsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  //Fetches posts when the component mounts(renders)
  useEffect(() => {
    fetchPosts();
  }, []);

  //This will sort the posts by date in descending order, so newest post should show on top.
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.datePosted);
    const dateB = new Date(b.datePosted);
    return dateB - dateA;
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            
            <Text style={TextStyles.Text}>{item.description}</Text>
            <Text style={TextStyles.Text}>By: {item.posterName}</Text>
            {item.imageUri && (
            <View style={{ alignItems: 'center' }}>
              <Image source={{ uri: item.imageUri }} style={styles.image} />
            </View>
            )}
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
        <View style={NaviButtonStyles.buttonContainer}>
          <Button title="Home" onPress={goToHome} />
          <Button title="Create Post" onPress={goToShare} />
          <Button title="My Posts" onPress={goToMyPosts} />
        </View>
    </View>
  );
};

//Some style changes/additions
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    marginBottom: 55
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 8,
  },
  image: {
    width: "100%",
    maxWidth: 400,
    height: 300,
  },
});

export default DashboardScreen;
