import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, ActivityIndicator } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-crop-picker';
import { firestoreDB } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const PostPhotoScreen = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false); 

  //Function for requesting location permission
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to provide location-based services.',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        getCurrentLocation(); 
      } else {
        console.log('Location permission denied'); 
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  //Function for getting the current location of the device
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        //Getting latitude and longitude coordinates
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude }); 
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  //With this, the app will ask for location permission as soon as user navigates to this screen
  useEffect(() => {
    requestLocationPermission();
  }, []);

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

  //Function for creating new posts
  const handleCreatePost = async () => {
    try {
      const currentUser = auth().currentUser;
  
      if (currentUser) {
        const { displayName, uid } = currentUser;
        const currentDate = new Date();
        //Check if either is missing:
        if (!image || !description) {
          console.error('Image and description are required.');
          return; //Exits the function if either image or description is missing
        }
        setIsCreatingPost(true);
        //This generates a unique filename for the image
        const imageFileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
        const storagePath = `users/${uid}/images/${imageFileName}`;
        //This uploads the new image to the Firebase Storage
        const imageRef = storage().ref(storagePath);
        await imageRef.putFile(image);

        const downloadURL = await imageRef.getDownloadURL();
        
        //New post object
        const post = {
          description,
          location,
          imageUri: downloadURL,
          datePosted: currentDate.toISOString(),
          posterName: displayName || 'Anonymous', //User's username which defaults to "Anonymous" in case there is no username
          posterId: uid,
        };
  
        //This adds the new post to Firestore posts collection
        await addDoc(collection(firestoreDB, 'posts'), post);
  
        setIsCreatingPost(false);
        //Navigates to Home screen after post is created
        navigation.navigate('Home'); 
        console.log('Post created successfully!');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setIsCreatingPost(false);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Add description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Location"
        value={`lat: ${location.latitude}, long: ${location.longitude}`}
        editable={false}
      />
      <Button
        title="Select Image"
        onPress={handleImageUpload}
        disabled={isCreatingPost} //Disables the "select image" button while post is being added to database
      />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Text>Upload time may take a while, depending on image size</Text>
      <Button title="Create Post" onPress={handleCreatePost} 
      disabled={isCreatingPost || !description || !image} //Disables the button while post is being added to DB, or if user has not set a description or an image.
      />
      {isCreatingPost && (description || image) && <ActivityIndicator size="large" color="#007BFF" />} 
    </View>
  );
};

export default PostPhotoScreen;
