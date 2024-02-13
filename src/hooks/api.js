const BASE_URL = 'http://localhost:5000/api/v1/';

export const loginApi = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const { user, token } = await response.json();

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
        console.log("yes", user)
      return { success: true, data: user };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.error };
    }
  } catch (error) {
    return { success: false, error: 'An error occurred' };
  }
};


export const signupApi = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const { user, token } = await response.json();
  
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
  
        return { success: true, data: user };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error };
      }
    } catch (error) {
      return { success: false, error: 'An error occurred' };
    }
  };


  export const uploadImageApi = async (file, token) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
  
      const response = await fetch(`${BASE_URL}images`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        return { success: true, message: 'Image uploaded successfully' };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error };
      }
    } catch (error) {
      console.error('Error during image upload:', error);
      return { success: false, error: 'An error occurred' };
    }
  };


  export const getImagesApi = async () => {
    try {
     
      const response = await fetch(`${BASE_URL}images`, {
        method: 'GET',
        
      });
  
      if (response.ok) {
        const images = await response.json();
        return { success: true, data: images };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error };
      }
    } catch (error) {
      console.error('Error during fetching images:', error);
      return { success: false, error: 'An error occurred' };
    }
  };