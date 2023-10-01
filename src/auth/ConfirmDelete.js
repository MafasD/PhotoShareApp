//This is the Confirm Delete popup box, which will appear when user wants to delete a post on MyPosts screen
import React from 'react';
import { View, Text, Modal, Button } from 'react-native';

const ConfirmDelete = ({ isVisible, onCancel, onDelete }) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20 }}>
          <Text>Are you sure you want to delete this post?</Text>
          <Button title="Cancel" onPress={onCancel} />
          <Button title="Delete" onPress={onDelete} />
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDelete;
