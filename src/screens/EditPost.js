import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { firestoreDB } from '../firebase/firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';

const EditPost = ({ route, navigation }) => {
  const { postId, postData } = route.params;
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  //This will load the post data from Firestore based on the postId
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postDocRef = doc(firestoreDB, 'posts', postId);
        const postDocSnapshot = await getDoc(postDocRef);

        if (postDocSnapshot.exists()) {
          const postData = postDocSnapshot.data();
          setDescription(postData.description);
          setImage(postData.imageUri);
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [postId]);

//This function allows user to upload an image from their device
const handleImageUpload = async () => {
  try {
    const image = await ImagePicker.openPicker({
      //These are the settings for the image
      mediaType: 'photo', 
      cropping: true,
      cropperToolbarTitle: 'Edit Image',
    });

    setImage(image.path);
  } catch (error) {
    console.error('Image selection error:', error);
  }
};

const handleEditPost = async () => {
    try {
      const currentUser = auth().currentUser;
  
      if (currentUser) {
        const { uid } = currentUser;
        
        if (!description) {
          console.error('Description is required.');
          return;
        }
        setIsCreatingPost(true); 
  
        let updatedImageUri = image; //Initialize with the current image URI
        
        //This checks if the image has been changed
        if (image !== null && image !== postData.imageUri) {
          //If the image has been changed, this will create a filename for the image
          const imageFileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
          const storagePath = `users/${uid}/images/${imageFileName}`;
          //This uploads the new image to the Firebase Storage
          const imageRef = storage().ref(storagePath);
          await imageRef.putFile(image);
          //This gets the download URL of the new image
          updatedImageUri = await imageRef.getDownloadURL();
        }  
        //This updates the post data in Firestore
        const postDocRef = doc(firestoreDB, 'posts', postId);
        await updateDoc(postDocRef, {
          description,
          imageUri: updatedImageUri, //The URL of the new image
        });
        setIsCreatingPost(false);
        //Navigates user back to the MyPosts screen
        navigation.navigate('MyPosts');
      }
    } catch (error) {
      console.error('Error editing post:', error);
      setIsCreatingPost(false);
    }
  };
  

  return (
    <View>
        <Text>Edit description:</Text>
        <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
        />
        <Button
            title="Change Image"
            onPress={handleImageUpload}
            disabled={isCreatingPost}
        />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Button
            title="Confirm changes" 
            onPress={handleEditPost} 
            disabled={isCreatingPost || !description}
        />
        {isCreatingPost && (description) && <ActivityIndicator size="large" color="#007BFF" />} 
    </View>
  );
};

export default EditPost;
