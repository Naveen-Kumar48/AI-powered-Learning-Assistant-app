import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Children,
} from "react";
const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);
  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const userStr=localStorage.getItem('user')
      if(token && userStr){

         const userData=JSON.parse(useStr)
         setUser(userData);
         setIsAuthenticated(true)
      }
    } catch (error) {
       console.error('Auth check failed',error)
       logout() 
    }
    const value = {}
  };
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};
