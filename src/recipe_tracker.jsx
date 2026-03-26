import { useEffect,useState } from "react";
import Navbar from "./nav";
import { useNavigate } from "react-router-dom";

const RecipeTracker = () => {
    const storedData=JSON.parse(localStorage.getItem("loginValue"))||{}
     const navigate= useNavigate()
     if(!storedData){
        navigate("/")
     }
    const[recipes,setRecipes]=useState([])
    const[newRecipe, setNewRecipe]=useState({
        ingredients:"",
        procedure:"",
        title:"",
        cookingTime:"",
         })
    const [editId,setEditId]= useState(null)
    useEffect(()=>{
        const stored = JSON.parse(localStorage.getItem("recipeValue"))
        setRecipes(stored)
    },[])
     const handleChange=(e)=>{
     const {value, name }=e.target
      setNewRecipe((prev)=>({
        ...prev,[name]:value
      })) 
    }

     const handleEdit=(recipe)=>{
        setNewRecipe({title: recipe.title,
            ingredients:recipe.ingredients,
            procedure:recipe.procedure,
            cookingTime:recipe.cookingTime
})
        setEditId(recipe.id)

    }
    const handleSubmit=(e)=>{
        e.preventDefault()
      if(editId){
        const edittedRecipes= recipes.map((item)=>{
            if(item.id===editId){
          return{...newRecipe,id:editId}
            }return item
        })
        setRecipes(edittedRecipes)
        setEditId(null)
      }else{
        setRecipes((prev)=>[
            ...prev, {...newRecipe,id:Date.now()}
        ])
        console.log(recipes)
    }
        setNewRecipe({
        ingredients:"",
        procedure:"",
        title:"",
        cookingTime:"",
        })
        
    }
    const handleDelete=(id)=>{
        const updatedRecipes= recipes.filter((item)=>item.id!==id)
       setRecipes(updatedRecipes)
    }
    useEffect(() => {
      localStorage.setItem("recipeValue", JSON.stringify(recipes||[]))
}, [recipes]);

  return ( 
        <div className="tracker-page"> 
            <Navbar/>
            <div className="tracker-container">
                <h1>Welcome {storedData.name||"user"}, to your Personalized Recipe Tracker</h1>
                <form className="recipe-form" onSubmit={handleSubmit}>
                <label htmlFor="title">Input your Recipe name here:</label>
                <input type="text" name="title" value={newRecipe.title} onChange={handleChange}/>
                <label htmlFor="ingredients">Enter the ingredients here:</label>
                <textarea value={newRecipe.ingredients} name="ingredients" placeholder="eg 1) ...... 2)......" onChange={handleChange} />
                <label htmlFor="procedure"> Input the procedure for making it:</label>
                <textarea  name="procedure" value={newRecipe.procedure} placeholder="eg 1) ...... 2)......" onChange={handleChange}/>
                <label htmlFor="cookingTime">Input the cooking Time:</label>
                <input type="text" onChange= {handleChange} name="cookingTime" value={newRecipe.cookingTime} />
                 <button>{editId? "Update Recipe":"Submit"}</button>
                </form>
                
            </div>

             <div className="recipe-list">
                { recipes.map((item)=>
                <div className="recipe-card" key={item.id}>
                    <h3>{item.title}</h3>
                    <h4>{item.ingredients}</h4>
                    <h5>{item.procedure}</h5>
                    <p>{item.cookingTime}</p>
                    <button onClick={()=>handleDelete(item.id)} style={{
                        backgroundColor:"red",}}>Delete</button>
                    <button style={{
                        backgroundColor:"#ff7a00",
                        bottom:"10%",
                    }} onClick={()=>handleEdit(item)}>Edit</button>
                </div>
                )}
             </div>
        </div>
       
     );
}
 
export default RecipeTracker;