import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/PostList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Login from "./pages/Login";
import { FetchData, RemoveData, SaveData } from "./utils/DataUtils";
import CreateUser from "./pages/CreateUser";
import UserTab from "./components/UserTab";
import MyPosts from "./pages/MyPosts";
import Post from "./pages/Post";
import MyLikedPosts from "./pages/MyLikedPosts";

// 保护路由的组件，判断用户是否登录
const ProtectedRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // 在初始加载时检查 localStorage 中是否存在用户信息
  useEffect(() => {
    const storedUser = FetchData("user");
    if (storedUser?.username) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }
  const handleLogin = (user) => {
    setUser(user);
    SaveData("user", user);
  };

  const handleLogout = () => {
    RemoveData("user");
    setUser(null);
  };

  return (
    <>
      <Router>
        <UserTab user={user} outLog={handleLogout} />
        <Header />
        <Routes>
          {/* home */}
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Home user={user} />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/create"
            element={
              <ProtectedRoute user={user}>
                <CreatePost user={user} />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute user={user}>
                <EditPost user={user} />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/post/:id"
            element={
              <ProtectedRoute user={user}>
                <Post />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/myposts"
            element={
              <ProtectedRoute user={user}>
                <MyPosts user={user} />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/mylikes"
            element={
              <ProtectedRoute user={user}>
                <MyLikedPosts user={user} />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          ></Route>
          <Route path="/createuser" element={<CreateUser />}></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}
export default App;
