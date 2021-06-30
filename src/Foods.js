import React from 'react';
import FoodBox from "./FoodBox";
import FoodForm from "./FoodForm";
import Search from "./Search";
import foods from "../foods.json";

class Foods extends React.Component {
    state = {
        form: false,
        foods,
        filtered: foods,
        today: [],
    };

    handleClick = () => {
        this.state({
            form: !this.state.form,
        });
    };

    handleDelete = (index) => {
        const arrCopy = [...this.state.today];
        arrCopy.splice(index, 1);
        this.setState({ today: [...arrCopy]});
    };

    filterFood = (input) => {
        const filtered = this.state.foods.filter((el) => el.name.toLowerCase().includes
        (input.toLowerCase())
        );
        this.setState({ filtered });
  };

  pushFood = (food) => {
    // const foods = this.state.foods.slice();
    const foods = [...this.state.foods];
    foods.unshift(food);
    this.setState({ foods, filtered: foods, form: false });
  };

  addFood = (food) => {
    let today = this.state.today.slice();
    let found = today.find((el) => el.name === food.name);

    food.calories *= food.quantity;

    if (found) {
      found.quantity += food.quantity;
      found.calories += food.calories;
    } else {
      today.push(food);
    }

    this.setState({
      today,
    });
  };

  render() {
    const totalCalories = this.state.today.reduce(
      (acc, val) => acc + val.calories,
      0
    );

    return (
      <div>
        <Search filterFood={this.filterFood} />
        <button className="button" onClick={this.handleClick}>
          Add Food
        </button>
        {this.state.form && <FoodForm pushFood={this.pushFood} />}
        <div>
          <div style={{ width: "70%", float: "left" }}>
            {this.state.filtered.map((el, i) => (
              <FoodBox key={i} food={el} addFood={this.addFood} />
            ))}
          </div>
          <div style={{ width: "30%", float: "right" }}>
            <h2>Today's food</h2>
            <ul>
              {this.state.today.map((el, i) => {
                return (
                  <li key={i}>
                    <span className="pr-2">
                      {el.quantity} {el.name} = {el.calories} cal
                    </span>
                    <i
                      className="fas fa-trash"
                      onClick={() => this.handleDelete(i)}
                    ></i>
                  </li>
                );
              })}
              <p>Total: {totalCalories} calories</p>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Foods;

    
