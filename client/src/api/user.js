export const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  const user = { firstName, lastName, email, password };

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return await res.json();
  } catch (error) {
    throw new Error(`Cannot register at this time. ${error}`);
  }
};

export const loginUser = async ({ email, password }) => {
  const user = { email, password };

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return await res.json();
  } catch (error) {
    throw new Error(`Cannot login at this time. ${error}`);
  }
};

export const logoutUser = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/logout`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    throw new Error(`Cannot logout at this time. ${error}`);
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/users/current-user`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    return await res.json();
  } catch (error) {
    throw new Error(`Cannot get current user at this time. ${error}`);
  }
};
