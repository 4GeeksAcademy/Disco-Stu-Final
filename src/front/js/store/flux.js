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
			currentOffers: [],
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

			changePassword: async ({ currentPassword, newPassword, confirmPassword }) => {
				try {
					const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
					const backendUrl = process.env.BACKEND_URL + "api/users/update-password";
					const response = await fetch(backendUrl, {
						method: 'POST',
						body: JSON.stringify({ old_password: currentPassword, new_password: newPassword }),
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}` // Agregar el token de autenticación en el encabezado
						}
					});

					const responseData = await response.json(); // Leer el cuerpo de la respuesta solo una vez

					if (!response.ok) {
						throw new Error(responseData.error || "Error al cambiar la contraseña");
					}

					return responseData;

				} catch (error) {
					throw new Error("Error al cambiar la contraseña. Por favor inténtalo de nuevo");
				}
			},

			logout: () => {
				localStorage.removeItem('token');
				localStorage.removeItem('userID');
				setStore({ isLoggedIn: false }); // Actualizar el estado de autenticación
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
				try {
					const backendUrl = process.env.BACKEND_URL + "api/users/delete_user/";
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

			getAllMessages: async (userId) => {
				try {
					const backendUrl = process.env.BACKEND_URL + "/api/inbox_user/messages/" + userId;
					const response = await fetch(backendUrl)

					if (!response.ok) {
						throw new Error('Response error')
					}
					const data = await response.json()
					console.log("Data obtenida de mensajes por id de usuario", data);
					return data;
				} catch (error) {
					console.log('Error charging messages: ', error)
					return [];
				}
			},

			sendMessage: async (senderID, message_data) => {
				try {
					const backendUrl = process.env.BACKEND_URL + "api/inbox_user/messages/sent/" + senderID;
					const response = await fetch(backendUrl, {
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
					return data;
				} catch (error) {
					console.log('Error sending message: ', error)
				}
			},

			deleteMessage: async (message_id) => {
				try {
					const backendUrl = process.env.BACKEND_URL + "api/inbox_user/messages/trash";
					await Promise.all(selectedItems.map(async (messageId) => {
						const response = await fetch(backendUrl, {
							method: 'POST',
							body: JSON.stringify({ message_id: messageId }),
							headers: {
								"Content-Type": "application/json"
							}
						});

						if (!response.ok) {
							console.log('Response error:', response.status);
						}

						const data = await response.json();
						console.log('Message deleted successfully', data);
					}));

					setSelectedItems([]);
					actions.getAllMessages(userId);
				} catch (error) {
					console.log('Error deleting messages:', error);
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
			addArticleForApproval: async (article, file) => {
				const backendUrl = process.env.BACKEND_URL + "api/approvals/add";

				const formData = new FormData();
				formData.append("article", JSON.stringify(article));
				formData.append("file", file);

				const response = await fetch(backendUrl, {
					method: "POST",
					body: formData,
					mode: "no-cors"
				});

				return response;
			},
			/*addArticle: async (article, file) => {
				const backendUrl = process.env.BACKEND_URL + "api/articles/add";

				const formData = new FormData();
				formData.append("article", JSON.stringify(article));
				formData.append("file", file);

				const response = await fetch(backendUrl, {
					method: "POST",
					body: formData,
					mode: "no-cors"
				});

				return response;
			},*/
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
			},

			adminMessages: async () => {
				try {
					const backendUrl = process.env.BACKEND_URL + "/api/inbox_admin/messages/1";
					const store = getStore()
					const response = await fetch('backendUrl')
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
			postOffer: async (offer) => {
				try {
					const backendUrl = process.env.BACKEND_URL + "/api/offers/post";
					const response = await fetch(backendUrl, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(offer)
					});
					if (!response.ok) {
						throw new Error('Error on adding offer response')
					}

					const data = response.json()
					console.log('Offer added:', data)

				} catch (error) {
					console.log('Error posting offer:', error)
				}
			},

			getOffers: async () => {
				try {
					const article = JSON.parse(localStorage.getItem('currentArticle'));
					const backendUrl = process.env.BACKEND_URL + `/api/offers/${article.id}`;
					const response = await fetch(backendUrl)
					if (!response.ok) {
						throw new Error('Error on getting offers response')
					}
					const data = await response.json()
					console.log('Offers obtained')
					const store = getStore()
					setStore({ ...store, currentOffers: data })
					console.log("Ofertas obtenidas", store.currentOffers)
				} catch (error) {
					console.log('Error getting offers:', error)
				}
			}
		}
	};
};

export default getState;
