const Logout = () => {
  const logout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include', 
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
        } else {
          console.error('Logout failed:', data.error);
        }
      } else {
        console.error('Failed to logout:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };


    logout();

};

export default Logout;
