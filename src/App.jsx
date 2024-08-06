import "./App.scss";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import { useSelector } from "react-redux";
import UpdateForm from "./components/update/UpdateForm";

const App = () => {
  const update = useSelector((state) => state.user.userId);
  return (
    <div className="main">
      <Navbar />
      <Home />
      {update && <UpdateForm />}
    </div>
  );
};

export default App;
