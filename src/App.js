import React from 'react';
import { Component} from 'react';
import 'bulma/css/bulma.css';
import foods from './foods.json';
import logo from './logo.svg';
import './App.css';
import FoodBox from './FoodBox';
import AddFood from './AddFood';
import Search from './Search';
import Selection from './Selection';

class App extends Component() {
  constructor(props) {
    super(props);
    foodArray: foods,
    toAdd: false,
    searchCurrent:'',
    selectedArray: []
  };
}
toggleToAdd() {
  const currentToAddValue = this.state.toAdd;
  this.steState({ toAdd: !currentToAddValue });
}
addNewFood(foodItem) {
  const foodList = this.state.foodArray;
  foodList.unshift(foodItem);
  this.setState({ foodArray: foodList, toAdd: false})
}

updateList(searchString) {
  this.setState({ searchCurrent: searchString});
}

clearFilter() {
  this.setState({searchCurrent:''});
}

updateSelection(foodItemSelected) {
  const selectedList = this.state.selectedArray;

  const nameArray = selectedList.map(foodItem => foodItem.name);
  const newName = foodItemSelected.name;

  if (nameArray.indexOf(newName) >= 0) {
    const index = nameArray.indexOf(newName);

    selectedList[index].quantity += foodItemSelected.quantity;

    selectedList[index].totalCalories =
      selectedList[index].quantity * selectedList[index].calories;
    this.setState({ selectedArray: selectedList });
  } else {
    selectedList.push(foodItemSelected);
    this.setState({ selectedArray: selectedList });
  }
}

deleteFoodItem(foodName) {
  const selectedFoodList = this.state.seletedArray;
  const selectedNameList = selectedFoodList.map(foodItem => foodItem.name);
  const index = selectedNameList.indexOf(foodName);

  selectedFoodList.splice(index, 1);
  this.setState({selectedArray: selectedFoodList});
}
render() {
  const {foodArray, toAdd, searchCurrent, selectedArray} = this.state;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <h2 className="title">Iron Nutrition</h2>

      {/* Search section */}
      <section className="searchSection">
        <Search
          searchSubmit={searchString => this.updateList(searchString)}
          searchClear={() => this.clearFilter()}
        />
      </section>

      {/* Add Button section */}
      <section className="addButtonSection">
        {!toAdd && (
          <button
            className="button"
            id="addButton"
            onClick={() => this.toggleToAdd()}
          >
            Add New Food Item
          </button>
        )}

        {toAdd && (
          <AddFood foodSubmit={foodItem => this.addNewFood(foodItem)} />
        )}
      </section>

      {/* List section */}
      <section className="listSection">
        <div className="columns">
          <div className="column" id="list-column">
            <ul>
              {foodArray.map((oneFood, index) => {
                if (searchCurrent === "") {
                  return (
                    <li key={index}>
                      <FoodBox
                        name={oneFood.name}
                        calories={oneFood.calories}
                        image={oneFood.image}
                        quantity={oneFood.quantity}
                        addToSelection={foodItemSelected =>
                          this.updateSelection(foodItemSelected)
                        }
                      />
                    </li>
                  );
                } else {
                  console.log(searchCurrent);
                  return (
                    oneFood.name.includes(searchCurrent) && (
                      <li key={index}>
                        <FoodBox
                          name={oneFood.name}
                          calories={oneFood.calories}
                          image={oneFood.image}
                          quantity={oneFood.quantity}
                          addToSelection={foodItemSelected =>
                            this.updateSelection(foodItemSelected)
                          }
                        />
                      </li>
                    )
                  );
                }
              })}
            </ul>
          </div>
          <div className="column" id="selection-column">
            <Selection
              selectedFoods={selectedArray}
              deleteSelected={foodName => this.deleteFoodItem(foodName)}
            />
          </div>
        </div>
      </section>
    </div>  
  );
}

export default App;
