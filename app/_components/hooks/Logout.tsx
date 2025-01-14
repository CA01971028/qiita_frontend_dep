const Logout = () => {
  const logout = async () => {
    try {
      const response = await fetch('https://qiita-api-dccbbecyhma3dnbe.japaneast-01.azurewebsites.net/logout', {
        method: 'POST',
        credentials: 'include', 
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          window.location.reload();
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
