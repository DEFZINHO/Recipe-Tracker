import { Route,Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./login";
import RecipeTrackers from "./recipe_tracker";
 const App = () => {

  return (
  
      
    <div>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard"element={<RecipeTracker/>}/>
    </Routes>
    
    </div>
    
    );
 }
  
 export default App;