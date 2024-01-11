import { useEffect, useState } from 'react';
import styled from 'styled-components'
import SearchResults from './components/SearchResults/SearchResults';

export const BASE_URL = "http://localhost:9000";


const App = () => {

  const [data, setData] = useState(null)
  const [filteredData, setFilteredData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedBtn, setSelectedBtn] = useState("all")
  
  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try{
      const response = await fetch(BASE_URL)
  
      const json = await response.json()
      
  
      setData(json)
      setFilteredData(json)
      setLoading(false)
  
      }
      catch (error) {
        setError("Unable to fetch data...")
      }
    }
    fetchFoodData()
  }, [])
  
  const searchFood = (e) => {
    const searchValue = e.target.value;

    if(searchValue == ""){
      setFilteredData(null)
    }

    const filter = data?.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()))

    setFilteredData(filter)
  }

  const FilterFood = (type) => {
    if(type == "all"){
      setFilteredData(data)
      setSelectedBtn("all")
      return;
    }

    const filter = data?.filter((food) => food.type.toLowerCase().includes(type.toLowerCase()))

    setFilteredData(filter);
    setSelectedBtn(type)
}


  const filterBtns = [
    {
    name : "All",
    type : "all",
    },
    {
    name : "Breakfast",
    type : "breakfast",
    },
    {
    name : "Lunch",
    type : "lunch",
    },
    {
    name : "Dinner",
    type : "dinner",
    },
  ]



  // fetchFoodData()

  if(error){
    return <div> {error} </div>
  }
  if(loading){
    return <div>loading... </div>
  }




  return (
     <>
     
     <Container> 
      <TopContainer>
      <div className="logo">
      <img src="/logo.png" alt="logo" />
      </div>

      <div className="search">
        <input onChange={searchFood} type="text" placeholder='Search Food' />
      </div>
      </TopContainer>


      <FilterContainer>
      {
        filterBtns.map((value =>
          <Button
          isSelected = {selectedBtn == value.type}
          
          key={value.name} onClick={() => FilterFood(value.type)}>{value.name}</Button> ))


      }



      
      {/* <Button onClick={() => FilterFood("breakfast")}>Breakfast</Button>
      <Button onClick={() => FilterFood("lunch")}>Lunch</Button>
      <Button onClick={() => FilterFood("dinner")}>Dinner</Button> */}
      </FilterContainer>

      

      
    
     </Container>
     <SearchResults data = {filteredData}/>
     
     
     </>
     )
};

export default App


export const Container = styled.div`
/* max-width: 1200px; */
margin: 0 auto;
  
`

const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
  padding: 10px 100px;


  .search{
    input{
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder{
        color: white;
      }
    }
  }

  @media (0 < width < 600px){
    flex-direction: column;
    height: 120px;
  }

`

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 30px;
  
`

export const Button =  styled.button`
padding: 6px 12px;
border-radius: 5px;
background: ${({isSelected}) => (isSelected ?"#b41f1f" :  "#FF4343")} ;
outline: 1px solid ${({isSelected}) => (isSelected ?"white" :  "#FF4343")} ;
border: none;
color: white;
cursor: pointer;

&:hover{
  background-color: #870c0c;
}



`


