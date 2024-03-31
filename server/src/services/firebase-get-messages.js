import {db} from "../../firebase.js"; // Assuming you have a Firebase Firestore instance initialized
import {collection, query, where, orderBy, limit, onSnapshot} from "firebase/firestore";

export const firebaseGetMessages = (chatId) => {
    console.log("firebaseGetMessages, chatId", chatId)
    if (!chatId) return Promise.reject("Chat ID is required.");

    const q = query(
        collection(db, "messages"),
        where("chatId", "==", chatId),
        orderBy("createdAt", "asc"),
        limit(10)
    );

    return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedMessages = [];
            querySnapshot.forEach((doc) => {
                fetchedMessages.push({...doc.data(), id: doc.id});
            });
            const sortedMessages = fetchedMessages.sort(
                (a, b) => a.createdAt - b.createdAt
            );
            resolve(sortedMessages);
        }, reject);

        // Returning a function to unsubscribe from the snapshot listener
        return () => unsubscribe();
    });
}
