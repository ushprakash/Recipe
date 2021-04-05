import React, {useEffect,useState} from 'react';
function Recipes() {
    
    const APP_ID="df29c10f";
    const APP_KEY="af2776755f2fd3ef1f29fa93a86a8536";
    const [recipess,setRecipes] = useState([])
    const [search,setSearch]=useState("")
    const [query,setQuery]=useState('chicken')
    
    useEffect(() => {
    getRecipes();
    },[query])
    

    const getRecipes=async()=>{

    const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data= await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
    
}

    const handleSubmit=(e)=>{
    e.preventDefault();
    setQuery(search);
    setSearch('')
}

    const rec=recipess.map(r => 
    
        (<div className="recipe">
            <h1 className="title">{r.recipe.label}</h1>
    
            <ul className="ingredients">
                {r.recipe.ingredients.map(ingre =>
                    (<li>{ingre.text}</li>)
                )}
            </ul>
    
            <img className="images" src={r.recipe.image}/>
    
        </div>))
    
    return (
        <div>
            <form className="search-form" onSubmit={handleSubmit}>
            <input className="search-bar" type="text"  value={search} onChange={e=>setSearch(e.target.value)}/>
            <button className="search-button" type="submit"> search</button>
            </form>
            <div className="container">
            {rec}
            </div>
            </div>
            );
        }

export default Recipes
