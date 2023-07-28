const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

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

		}
	};
};

export default getState;
