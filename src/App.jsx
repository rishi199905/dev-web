import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./Body.jsx";
import Login from "./Login";
import Profile from "./Profile";
import Footer from "./Footer";
import { Provider } from "react-redux";
import userStore from "./utils/userStore";
import Feed from "./Feed";
import Connections from "./Connections";
import Requests from "./Requests";
import Chat from "./Chat";
function App() {
  return (
    <><Provider store={userStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />}>
              {" "}
            </Route>
            <Route path="/" element={<Feed />}>
              {" "}
            </Route>
            <Route path="/profile" element={<Profile />}>
              {" "}
            </Route>
            <Route path="/connections" element={<Connections />}>
              {" "}
            </Route>
            <Route path="/requests" element={<Requests />}>
              {" "}
            </Route>
            <Route path="/chat/:id" element={<Chat />}>
              {" "}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
      </Provider>
    </>
  );
}

export default App;
