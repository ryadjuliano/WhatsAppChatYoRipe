import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';



const ChatScreen = ({ route }) => {
  const { groupName } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedMessages, setSearchedMessages] = useState([]);

  useEffect(() => {
  if (route.params && route.params.messages) {
    setMessages(route.params.messages);
  }
}, []);

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <TouchableOpacity style={styles.messageBubble}>
        <Text>{item.text}</Text>
      </TouchableOpacity>
      <Text style={styles.messageInfo}>{`${item.sender} - ${item.timestamp}`}</Text>
    </View>
  );

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        id: String(messages.length + 1),
        text: inputText,
        sender: 'user', 
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const openUserInfoModal = () => {
    setShowUserInfoModal(true);
    };

  const closeUserInfoModal = () => {
    setShowUserInfoModal(false);
  };

  const searchMessages = () => {
    const filteredMessages = messages.filter(
      (message) =>
        message.text.toLowerCase().includes(searchText.toLowerCase()) ||
        message.sender.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchedMessages(filteredMessages);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={openUserInfoModal}>
        <Text style={styles.headerText}>{groupName}</Text>
      </TouchableOpacity>

      <Modal visible={showUserInfoModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={closeUserInfoModal}>
            <Text>{groupName}</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TextInput
        style={styles.searchInput}
        placeholder="Search messages..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        onSubmitEditing={searchMessages}
      />

      <FlatList
        data={searchText.length > 0 ? searchedMessages : messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.chatView}
        inverted
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 50,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageContainer: {
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  messageBubble: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
    maxWidth: '80%',
  },
  messageInfo: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'right',
    marginRight: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  searchInput: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ChatScreen;
