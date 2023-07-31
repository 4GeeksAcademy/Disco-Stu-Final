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
					"mail": "karai1@gmail.com",
					"nombre_real": "Nombre Quemado 1",
					"username": "karai1"
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
					const response = await fetch("https://ferrami-ubiquitous-space-robot-74vw4w4xqjr2w65g-3001.preview.app.github.dev/api/users/register", {
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

			login: async ({ username_or_mail, password }) => {
				try {
					const response = await fetch("https://ferrami-ubiquitous-space-robot-74vw4w4xqjr2w65g-3001.preview.app.github.dev/api/users/login", {
						method: 'POST',
						body: JSON.stringify({ username_or_mail, password }),
						headers: {
							"Content-Type": "application/json"
						}
					});

					if (!response.ok) {
						const responseData = await response.json();
						throw new Error(responseData.message || "Invalid username or password");
					}

					const data = await response.json();
					const token = data.token;

					sessionStorage.setItem('token', token);

					setStore({ authToken: token, isAuthenticated: true });

				} catch (error) {
					console.error('Error in login:', error.message);
				}
			},

			getAllMessages: async () => {
				try {
					const store = getStore()
					const response = await fetch('https://karai2mil-urban-space-tribble-5wgr9ppv6gwc6qv-3001.preview.app.github.dev/api/inbox_user/messages/1')
					if (!response.ok) {
						throw new Error('Response error')
					}
					const data = await response.json()
					console.log('Messages obtained succesfully: ', data)
					setStore({ ...store, inbox: data.inbox })
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
					const response = await fetch('https://karai2mil-urban-space-tribble-5wgr9ppv6gwc6qv-3001.preview.app.github.dev/api/inbox_user/messages/sent/1', {
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
					const { getAllMessages } = getActions()
					getAllMessages()
				} catch (error) {
					console.log('Error sending message: ', error)
				}
			},

			deleteMessage: async (message_data) => {
				try {
					const response = await fetch('https://karai2mil-urban-space-tribble-5wgr9ppv6gwc6qv-3001.preview.app.github.dev/api/inbox_user/messages/trash', {
						method: 'POST',
						body: JSON.stringify(message_data),
						headers: {
							"Content-Type": "application/json"
						}
					})
					if (!response.ok) {
						console.log('Response error: ', response.status)
					}
					const data = await response.json()
					console.log('Message deleted succesfully', data)
					const { getAllMessages } = getActions()
					getAllMessages()
				} catch (error) {
					console.log('Error deleting message: ', error)
				}
			},

			recoverDeletedMessage: async (message_data) => {
				try {
					const response = await fetch('https://karai2mil-urban-space-tribble-5wgr9ppv6gwc6qv-3001.preview.app.github.dev/api/inbox_user/messages', {
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
					const { getAllMessages } = getActions()
					getAllMessages()
				} catch (error) {
					console.log('Error recovering message: ', error)
				}
			},

			deleteSentMessage: async (message_data) => {
				try {
					const response = await fetch('https://karai2mil-urban-space-tribble-5wgr9ppv6gwc6qv-3001.preview.app.github.dev/api/inbox_user/messages/sent', {
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
					const { getAllMessages } = getActions()
					getAllMessages()
				} catch (error) {
					console.log('Error deleting sent message: ', error)
				}
			},
			createArtist: async (artist) => {
				const backendUrl = process.env.BACKEND_URL + "api/artists/create";
				const response = await fetch(backendUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(artist)
				});

				if (!response.ok)
					throw new Error("Error al intentar guardar Artista");

				const data = await response.json();

				if (response.status == 400) {
					throw new Error(data.message);
				}

				return data;
			},
			getAllArticles: async () =>{
				const backendUrl = process.env.BACKEND_URL + "api/articles/";
				const response = await fetch(backendUrl, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				});

				if (!response.ok)
					throw new Error("Error al intentar obtener Artículos");

				const data = await response.json();
				
				if(response.status == 400) {
					throw new Error(data.message);
				}

				return data;
			},
			getAllArtists: async () =>{
				const backendUrl = process.env.BACKEND_URL + "api/artists/";
				const response = await fetch(backendUrl, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				});

				if (!response.ok)
					throw new Error("Error al intentar obtener Artistas");

				const data = await response.json();
				
				if(response.status == 400) {
					throw new Error(data.message);
				}

				return data;
			}
		}
	};
};

export default getState;
