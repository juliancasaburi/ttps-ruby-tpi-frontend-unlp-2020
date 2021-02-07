const logout = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

const login = async (email: string, password: string): Promise<Response> => {
  const response = await fetch(
    `${process.env.VUE_APP_API_URL}/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          "user": {
            'email':email,
            'password':password,
          }
        }
      ),
    },
  );
  const json = await response.json();

  if (String(json.id) === "null") {
    if (response.status === 401) {
      logout();
      location.reload(true);
    }
    const error = 'Invalid credentials';
    return Promise.reject(error);
  }

  const user = json;
  if (user.jti) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', response.headers.get('Authorization') || '');
  }

  return user;
};

const register = async (email: string, password: string): Promise<Response> => {
  const response = await fetch(
    `${process.env.VUE_APP_API_URL}/signup`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          "user": {
            'email':email,
            'password':password,
          }
        }
      ),
    },
  );
  const json = await response.json();

  if (String(json.id) === "null") {
    const error = 'Email address in use';
    return Promise.reject(error);
  }

  const user = json;

  return user;
};

export const userService = {
  login,
  register,
  logout,
};
