export const useSecretChatMessagesListen = () => {
  // const setChatsLastReadTs = useAtomSet(secretChatsLastReadTsAtom);
  // const getChats = useAtomGet(secretChatFacesAtom);
  // const setChats = useAtomSet(secretChatFacesAtom);
  // const myDeviceId = useDeviceId();
  // const [isAlternativeList, setIsAlternativeList] = useAtom(secretChatsIsAlternativeMessageHashMapAtom);
  // useEffect(() => {
  //   // return soki.listenEvent('chatsData', async chatsData => {
  //   //   if (chatsData == null) return;
  //   //   const { chats, messages, unreachedMessages, alternativeMessages } = chatsData;
  //   //   if (chats?.length) {
  //   //     setChats(prev => {
  //   //       const newChats = { ...prev };
  //   //       for (const chat of chats) newChats[chat.chatId] = chat;
  //   //       return newChats;
  //   //     });
  //   //   }
  //   //   if (unreachedMessages) {
  //   //     fillMessagesHashMap(unreachedMessages, 'unreachedMessages', isAlternativeList);
  //   //   }
  //   //   if (alternativeMessages) {
  //   //     fillMessagesHashMap(alternativeMessages, 'alternativeMessages', isAlternativeList);
  //   //   }
  //   //   if (messages) {
  //   //     setChats(prev => {
  //   //       let newChats = { ...prev };
  //   //       let isAdded = false;
  //   //       for (const chatIdStr in messages) {
  //   //         const chatId = chatIdStr as SecretChat.ChatId;
  //   //         const message = messages[chatId]?.[0];
  //   //         if (message !== undefined && !message.isRemoved) {
  //   //           newChats = { ...newChats, [chatId]: { ...newChats[chatId]!, messages: [message] } };
  //   //           isAdded = true;
  //   //         }
  //   //       }
  //   //       return isAdded ? newChats : prev;
  //   //     });
  //   //     fillMessagesHashMap(messages, 'chatMessages', isAlternativeList);
  //   //   }
  //   // });
  // }, [getChats, isAlternativeList, myDeviceId, setChats, setChatsLastReadTs]);
};

// const fillMessagesHashMap = (
//   messagesHashMap: Partial<Record<SecretChat.ChatId, SecretChat.ImportableMessage[]>>,
//   hashMapPrefix: 'chatMessages' | 'unreachedMessages' | 'alternativeMessages',
//   isAlternativeList: Partial<Record<SecretChat.ChatId, boolean>>,
// ) => {
//   MyLib.entries(messagesHashMap).forEach(([chatId, chatMessages]) => {
//     if (chatMessages == null) return;

//     const atom = chatsMolecule.take(
//       `${
//         hashMapPrefix === 'chatMessages' && isAlternativeList[chatId] ? 'alternativeMessages' : hashMapPrefix
//       }/${chatId}`,
//     );
//     const newMessages = { ...atom.get() };
//     let isChanged = false;

//     for (const message of chatMessages) {
//       const savedMessage = newMessages[message.id];

//       if (message.isRemoved) {
//         delete newMessages[message.id];
//         isChanged = true;
//       } else if (savedMessage === undefined || savedMessage.text !== message.text) {
//         newMessages[message.id] = message;
//         isChanged = true;
//       }
//     }

//     if (isChanged) atom.set(newMessages);
//   });
// };
