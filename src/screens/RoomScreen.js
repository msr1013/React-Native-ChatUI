import React, {useState} from 'react';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
// import {IconButton} from 'react-native-paper';
// import {View, StyleSheet} from 'react-native';

export default function RoomScreen() {
  const [messages, setMessages] = useState([
    /**
     * Mock mesasge data
     *
     */
    {
      _id: 0,
      text: 'New room created',
      createdAt: new Date().getTime(),
      system: true,
    },
    {
      _id: 1,
      text: 'Hello',
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Test User',
      },
    },
  ]);
  //helper method that sends a message
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }

  // function renderSend(props) {
  //   return (
  //     <Send {...props}>
  //       <View style={styles.sendingContainer}>
  //         <IconButton icon="send-circle" size={32} color="#6646ee" />
  //       </View>
  //     </Send>
  //   );
  // }

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#6646ee',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      user={{_id: 1}}
      renderBubble={renderBubble}
      placeholder="Type your message here..."
      showUserAvatar
      alwaysShowSend
      scrollToBottom
      // renderSend={renderSend}
    />
  );
}

// const styles = StyleSheet.create({
//   sendingContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
