import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { GetGroupMessages } from './config/service';

// Sample data for groups/DMs
const groupsDMs = [
  { id: '1', name: 'Group 1' },
  { id: '2', name: 'Group 2' },
  { id: '3', name: 'Group 3' },
];

const HomeScreen = ({ navigation }) => {
  const [groupM, setGroupM] = useState([]);

  const fetchDataMessages = async () => {
    GetGroupMessages().then((result) => {
      setGroupM(result.data);
    });
  };

  useEffect(() => {
    fetchDataMessages();
  }, []);

  const renderGroupDM = ({ item }) => (
    <TouchableOpacity
      style={styles.groupDMItem}
      onPress={() => navigation.navigate('ChatScreen', { groupName: item.name, messages: item.members })}
    >
      <Image source={{uri :'https://w7.pngwing.com/pngs/1003/487/png-transparent-github-pages-random-icons-white-logo-monochrome-thumbnail.png'}} style={styles.groupImage} />
      <Text style={styles.groupName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={groupM}
        renderItem={renderGroupDM}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  groupDMItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
