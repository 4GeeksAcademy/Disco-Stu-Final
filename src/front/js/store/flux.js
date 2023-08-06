const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isLoggedIn: false,
			inbox: [],
			sent_messages: [],
			deleted_messages: [],

			explorer_articles: [],
			filtered_explorer_articles: [],
			on_filtered_or_explorer: true,

		},
		actions: {
			registerNewUser: async (newUser) => {
				try {
					const backendUrl = process.env.BACKEND_URL + "api/users/signup";
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
						return true;
					} else {

						const errorResponse = await response.json();
						throw new Error(errorResponse.message); // Throw an error with the server's error message
					}

				} catch (error) {
					console.error("Error adding contact:", error);
					throw error;
				}
			},

			login: async ({ username_or_email, password }) => {
				try {
					const backendUrl = process.env.BACKEND_URL + "api/users/login";
					const response = await fetch(backendUrl, {
						method: 'POST',
						body: JSON.stringify({ username_or_email, password }),
						headers: {
							"Content-Type": "application/json"
						}
					});

					const responseData = await response.json(); // Leer el cuerpo de la respuesta solo una vez

					if (!response.ok) {
						throw new Error(responseData.error || "Usuario o contraseña incorrecta");
					}

					const token = responseData.access_token;
					const userID = responseData.user_id;
					localStorage.setItem('token', token);
					localStorage.setItem('userID', userID);

					const { checkAuthentication } = getActions();
					await checkAuthentication();

					return responseData;

				} catch (error) {
					throw new Error("Error al iniciar sesión. Por favor revise sus credenciales e intente de nuevo");
				}
			},

			checkAuthentication: async () => {
				try {
					const token = localStorage.getItem('token');
					if (token) {
						setStore({ isLoggedIn: true });
					} else {
						setStore({ isLoggedIn: false });
					}
					return token;
				} catch (error) {
					throw new Error("Error al verificar la autenticación");
				}
			},

			logout: () => {
				localStorage.removeItem('token');
				setStore({ isLoggedIn: false });
			},

			getUserById: async (userId) => {
				try {
					const token = localStorage.getItem('token');
					console.log(token)

					const backendUrl = process.env.BACKEND_URL + `api/users/profile/${userId}`;
					const response = await fetch(backendUrl, {
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`
						}
					});

					if (!response.ok) {
						const responseData = await response.json();
						throw new Error(responseData.error || "Error al obtener información del usuario");
					}

					const userData = await response.json();

					return userData;

				} catch (error) {
					// Si hay un error en la solicitud o en el procesamiento de la respuesta, lanza un error con un mensaje genérico
					throw new Error("Error al obtener información del usuario. Por favor, inténtelo de nuevo más tarde.");
				}
			},

			editUser: async (userId, userData) => {
				const token = localStorage.getItem('token');
				const backendUrl = process.env.BACKEND_URL + "api/users/edit_user/";

				try {
					const response = await fetch(`${backendUrl}${userId}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify(userData),
					});

					if (!response.ok) {
						const responseData = await response.json();
						throw new Error(responseData.error || "Error al editar el usuario");
					}

					const responseData = await response.json();
					return responseData.message; 

				} catch (error) {
					throw new Error("Error al editar el usuario. Por favor, inténtelo de nuevo más tarde.");
				}
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
				console.log(data)

				const store = getStore()
				setStore({
					...store,
					explorer_articles: data,
					on_filtered_or_explorer: true
				})


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
			addArticle: async (article) => {
				const backendUrl = process.env.BACKEND_URL + "api/articles/add";
				const response = await fetch(backendUrl, {
					method: "POST",
					body: JSON.stringify(article),
					headers: {
						"Content-Type": "application/json"
					}
				});
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
			},
			getAllArtistsLikeName: async (inputValue) => {
				const backendUrl = process.env.BACKEND_URL + "api/artists/" + inputValue;
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
			},
			expandedSearch: async (searchContent) => {
				try {
					console.log(searchContent)
					const backendUrl = process.env.BACKEND_URL + "api/searchbar/search/" + searchContent;
					const response = await fetch(backendUrl)
					if (!response.ok)
						throw new Error("Error on searching response");

					const data = await response.json();
					// console.log(data)
					const store = getStore()
					setStore({ ...store, filtered_explorer_articles: [] })
					setStore({
						...store,
						filtered_explorer_articles: data.articles,
						on_filtered_or_explorer: false
					})

				} catch (error) {
					console.log('Error in searching', error)
				}
			},
			getGenres: async () => {
				const backendUrl = process.env.BACKEND_URL + "api/articles/genres/";
				const response = await fetch(backendUrl, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				});

				if (!response.ok)
					throw new Error("Error al intentar obtener Generos");

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
