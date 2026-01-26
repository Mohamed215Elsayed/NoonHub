// import { useMemo } from 'react';

// const useAuth = () => {
//   const user = useMemo(() => {
//     try {
//       return JSON.parse(localStorage.getItem('user'));
//     } catch {
//       return null;
//     }
//   }, []);

//   const role = user?.role;

//   return {
//     user,
//     isAuthenticated: !!user,
//     isUser: role === 'user',
//     isAdmin: role === 'admin',
//   };
// };

// export default useAuth;

import { useSelector } from 'react-redux';
const useAuth = () => {
  const { user, token } = useSelector((state) => state.auth);
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const finalUser = user || storedUser;

  return {
    user: finalUser,
    isAuthenticated: !!(token || localStorage.getItem('token')),
    isUser: finalUser?.role === 'user',
    isAdmin: finalUser?.role === 'admin',
    isManager: finalUser?.role === 'manager',
  };
};
export default useAuth;
