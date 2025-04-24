import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./bODY.JSX";
import Login from "./Login";
import Profile from "./Profile";
import Footer from "./Footer";
import { Provider } from "react-redux";
import userStore from "./utils/userStore";
import Feed from "./Feed";
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
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
      </Provider>
    </>
  );
}

export default App;
