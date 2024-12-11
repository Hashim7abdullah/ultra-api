const main = async (req, res) => {
    try {
      return res.status(200).json({
        success: true,
        message: "Authorized",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  const checkAuth = async (req, res) => {
    try {
      return res.status(200).json({
        success: true,
        message: "User is authenticated",
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }
  };
  
  export { main, checkAuth };