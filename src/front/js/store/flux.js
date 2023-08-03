const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			inbox: [],
			sent_messages: [],
			deleted_messages: [],
			user: {
				isAdmin: false,
				isLoggedIn: false,
				UserID: null
			},
		},
		actions: {

			// Add contact function
			createUser: async (newUser) => {
				try {
					const backendUrl = process.env.BACKEND_URL + "api/users/register";
					const response = await fetch(backendUrl, {
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
					const backendUrl = process.env.BACKEND_URL + "api/users/login";
					const response = await fetch(backendUrl, {
						method: 'POST',
						body: JSON.stringify({ username_or_mail, password }),
						headers: {
							"Content-Type": "application/json"
						}
					});

					if (!response.ok) {
						const response_data = await response.json();
						throw new Error(response_data.error || "Usuario o contraseña incorrecta");
					}

					const data = await response.json();

					console.log('Data from login:', data); // Agrega este log para verificar el contenido de la respuesta

					const token = data.access_token;

					localStorage.setItem('token', token);

					const isAdmin = data.is_admin === 'true';
					const userID = data.user_id;
					setStore({
						user: {
							isLoggedIn: false,
							isAdmin: isAdmin,
							userId: userID
						},
					});

					await getActions().checkAuthentication(); // Espera a que checkAuthentication termine antes de continuar

					return data;


				} catch (error) {
					throw new Error("Error al iniciar sesión. Por favor revise sus credenciales e intente de nuevo");
				}
			},

			checkAuthentication: async () => {
				const token = localStorage.getItem('token');
				if (token) {
					// Establecer isLoggedIn en true directamente, ya que no hay una llamada asíncrona aquí
					setStore({ user: { isLoggedIn: true } });
				} else {
					// Si no hay token, establecer isLoggedIn en false
					setStore({ user: { isLoggedIn: false } });
				}

				return token;
			},


			logout: () => {
				localStorage.removeItem('token');
				setStore({
					user: {
						isLoggedIn: false,
						isAdmin: false,
					}
				});
			},

			getAllUsersInfo: async () => {
				const backendUrl = process.env.BACKEND_URL + "api/users/all_users";
				const response = await fetch(backendUrl, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				});

				try {
					if (!response.ok) {
						throw new Error("Error al obtener la lista de usuarios");
					}

					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error en getAllUsersInfo:", error.message);
					throw error;
				}
			},

			deleteUser: async (userId) => {
				const backendUrl = process.env.BACKEND_URL + "api/users/delete_user/";

				try {
					const response = await fetch(`${backendUrl}${userId}`, {
						method: 'DELETE',
					});

					if (!response.ok) {
						throw new Error('Error al eliminar el usuario');
					}

					const data = await response.json();
					return data;
				} catch (error) {
					console.error('Error en deleteUser:', error.message);
					throw error;
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
			getAllArticles: async () => {
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

				if (response.status == 400) {
					throw new Error(data.message);
				}

				return data;
			},
			getAllArticlesByGenre: async (genre) => {
				const backendUrl = process.env.BACKEND_URL + "api/articles/genre/" + genre;
				const response = await fetch(backendUrl, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				});

				if (!response.ok)
					throw new Error("Error al intentar obtener Artículos");

				const data = await response.json();

				if (response.status == 400) {
					throw new Error(data.message);
				}

				return data;
			},
			getAllArtists: async () => {
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

				if (response.status == 400) {
					throw new Error(data.message);
				}

				return data;
			}
		}
	};
};

export default getState;
