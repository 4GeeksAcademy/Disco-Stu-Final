const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			inbox: [],
			sent_messages: [],
			deleted_messages: [],
			users: [
				{
					"id": 1,
					"is_admin": false,
					"mail": "karai@gmail.com",
					"nombre_real": "Nombre Quemado 1",
					"username": "karai"
				},
				{
					"id": 2,
					"is_admin": false,
					"mail": "karai2@gmail.com",
					"nombre_real": "Nombre Quemado 2",
					"username": "karai2"
				}
			]
		},
		actions: {

			// Add contact function
			createUser: async (newUser) => {
				try {
					const response = await fetch("https://ferrami-ubiquitous-barnacle-wjrxjxj4jpv35qp4-3001.preview.app.github.dev/api/users/user", {
					  method: "POST",
					  body: JSON.stringify(newUser),
					  headers: {
						"Content-Type": "application/json"
					  }
					});

					if (response.ok) {
						const data = await response.json();
						console.log("User has been created:", data);
					} else {
						console.error("Error creating user. Status:", response.status);
					}
				} catch (error) {
					console.error("Error adding contact:", error);
				}
			},

			getAllMessages: async () => {
				try {
					const store = getStore()
					const response = await fetch('https://karai2mil-refactored-goldfish-rj46xvv7j5p25g46-3001.preview.app.github.dev/api/inbox_user/messages/1')
					if (!response.ok) {
						throw new Error('Response error')
					}
					const data = await response.json()
					console.log('Messages obtained succesfully: ', data)
					setStore({...store, inbox: data.inbox})
					setStore({ ...store, sent_messages: data.sent_messages })
					setStore({ ...store, deleted_messages: data.deleted_messages })
				} catch (error) {
					console.log('Error charging messages: ', error)
				}
			},

			sendMessage: async (message_data) => {
				try {
					console.log(message_data)
					// const store = getStore()
					const response = await fetch('https://karai2mil-refactored-goldfish-rj46xvv7j5p25g46-3001.preview.app.github.dev/api/inbox_user/messages/sent/1', {
						method: 'POST',
						body: JSON.stringify(message_data),
						headers: {
							"Content-Type": "application/json"
						}
					})
					if (!response.ok) {
						console.log('Response error', response.status)
					}
					const data = await response.json()
					console.log('Message sent succesfully', data)
					const {getAllMessages} = getActions()
					getAllMessages()
				} catch (error) {
					console.log('Error sending message: ', error)
				}
			},

			deleteMessage: async (message_data) => {
				try {
					const store = getStore()
					const response = await fetch(store.url + 'api/inbox_user/messages/trash/' + store.user_id, {
						method: 'POST',
						body: JSON.stringify(message_data),
						headers: {
							"Content-Type": "application/json"
						}
					})
					if (!response.ok) {
						throw new Error('Response error')
					}
					const data = await response.json()
					console.log('Message deleted succesfully', data)
				} catch (error) {
					console.log('Error deleting message: ', error)
				}
			},

			recoverDeletedMessage: async (message_data) => {
				try {
					const store = getStore()
					const response = await fetch(store.url + 'api/inbox_user/messages/' + store.user_id, {
						method: 'POST',
						body: JSON.stringify(message_data),
						headers: {
							"Content-Type": "application/json"
						}
					})
					if (!response.ok) {
						throw new Error('Response error')
					}
					const data = await response.json()
					console.log('Message recovered succesfully', data)
				} catch (error) {
					console.log('Error recovering message: ', error)
				}
			},

			deleteSentMessage: async (message_data) => {
				try {
					const store = getStore()
					const response = await fetch(store.url + 'api/inbox_user/messages/sent/' + store.user_id, {
						method: 'DELETE',
						body: JSON.stringify(message_data),
						headers: {
							"Content-Type": "application/json"
						}
					})
					if (!response.ok) {
						throw new Error('Response error')
					}
					const data = await response.json()
					console.log('Sent message deleted succesfully', data)
				} catch (error) {
					console.log('Error deleting sent message: ', error)
				}
			},
		}
	};
};

export default getState;
