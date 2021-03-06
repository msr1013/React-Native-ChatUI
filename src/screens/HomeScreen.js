import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Divider, Title, List} from 'react-native-paper';
import {AuthContext} from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
import firestore from '@react-native-firebase/firestore';
import Loading from '../components/Loading';

export default function HomeScreen({navigation}) {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user, logout} = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('THREADS')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            name: '',
            ...documentSnapshot.data(),
          };
        });
        setThreads(threads);
        if (loading) {
          setLoading(false);
        }
      });
    return () => unsubscribe();
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Room', {thread: item})}>
            <List.Item
              title={item.name}
              description="Item description"
              titleNumberOfLines={1}
              titleStyle={styles.fontSize}
              descriptionStyle={styles.fontSize}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      />
      <Title>HomeScreen</Title>
      <Title>All chat rooms will be listed here</Title>
      <Title>{user.uid}</Title>
      <FormButton
        modeValue="contained"
        title="Logout"
        onPress={() => logout()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,

    fontSize: 22,
  },
});
