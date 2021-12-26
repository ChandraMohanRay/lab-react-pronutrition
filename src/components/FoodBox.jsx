import React, { Component } from 'react'

export default class FoodBox extends Component {

    constructor(props){
        super(props);
        this.state={
            // Data
        food:[
            {name:"pizza",calories:400,img:"https://i.imgur.com/eTmWoAN.png"},
            {name:"Samosa",calories:500,img:"https://res.cloudinary.com/dlvhhibcv/image/fetch/q_auto,w_1920/https://images.ctfassets.net/hhv516v5f7sj/Rw21s2qIvL35ghw8e9wZx/4e0bbb3507a143f0f1f9955812e3a3bd/IMPOSSIBLE__SAMOSA.jpeg?width=1920"},
            {name:"burger",calories:800,img:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hamburger_%28black_bg%29.jpg/1200px-Hamburger_%28black_bg%29.jpg"},
            {name:"jucie",calories:120,img:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Orange_juice_1.jpg/255px-Orange_juice_1.jpg"},
            {name:"pasta",calories:600,img:"https://www.bowlofdelicious.com/wp-content/uploads/2020/08/bruschetta-pasta-1.jpg"},
            {name:"maggie",calories:600,img:"https://asmallbite.com/wp-content/uploads/2018/05/Maggi-Masala-Noodles.jpg"},
            {name:"fried rice",calories:300,img:"https://www.simplyrecipes.com/thmb/3iYNbCWqxYcqIseJxWilc-KRncc=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2018__08__Veggie-Fried-Rice-LEAD-05v2-9c6ffd7b99bb4a7fa223634df96394b6.jpg"},
            { name: "biscuit", calories: 325, img: "https://www.biggerbolderbaking.com/wp-content/uploads/2017/02/Digestive-Biscuits-copy-1.jpg" },
            { name: "hotchoclate", calories: 200, img: "https://natashaskitchen.com/wp-content/uploads/2020/11/Hot-Chocolate-Recipe-3-500x500.jpg" },
            { name: "coke", calories: 450, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOn0USEoGWLdgSoHPOIhjJyUfNmw8wOhAN4ySx1u1UFLP-IM4omD5F7GJ0Ve0JSRuz8kY&usqp=CAU" },
            { name: "vadapav", calories: 300, img: "https://i.ytimg.com/vi/UDLg5FYo9F4/maxresdefault.jpg" }

        ],
        searchTxt: "", // Data to be searched
            calories_count: 0, // Total calories
            myFoods: []
        }
    }
    // method for searching the fruit
    searchFood = (event) => {
        this.setState({
            searchTxt: event.target.value
        })
    }
    // Capitalize the first letter of the fruit
    capatalize = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
    // Add fruits to calories section
    addFood = (event) => {
        let count = document.getElementById(event.target.value).value;
        let cal = this.state.food.filter((food) => {
            return food.name === event.target.value;
        })
        let foodObj = {
            id: event.target.value,
            text: `${count} ${event.target.value} = ${(cal[0].calories) * count}`,
            btn_id: `${event.target.value}R`,
            calo: cal[0].calories * count
        }
        this.setState({
            myFoods: this.state.myFoods.concat(foodObj),
            calories_count: this.state.calories_count + (cal[0].calories * count)
        })
        console.log(this.state.myFoods);
    }
    // remove foods from caloris

    removeFood = (event) => {
        document.getElementById(event.target.value).remove();
        let calorie = this.state.myFoods.filter((food) => {
            return `${food.id}R` === event.target.value
        })
        this.setState({
            calories_count: this.state.calories_count - calorie[0].calo
        })
    }
    render() {
        return (
            <>
            <div className='main-conatiner'>
                <div className='serach-container'>
                    <h1>search</h1>
                    <input type="text" placeholder='Find a Food' onChange={this.searchFood} id='serach'/>
                </div>
            </div>
            <div className='food-container'>
                <div className='left'>
                     {this.state.food.filter((food) => {
                            return food.name.includes(this.state.searchTxt);
                        })
                        .map((food) => {
                                return <div key={food.name} className="food">
                                    <img src={food.img} alt="" />
                                    <div className="detail">
                                        <h1>{this.capatalize(food.name)}</h1>
                                        <h4>{food.calories}</h4>
                                    </div>
                                    <div className="count">
                                        <input type="number" defaultValue="1" id={food.name} min="0" />
                                        <button onClick={this.addFood} value={food.name}>+</button>
                                    </div>
                                </div>
                            })}
                </div>
                <div className="right">
                        <h1>Today's Food {this.state.calories_count} Calories</h1>
                        {
                            this.state.myFoods.filter((food) => {
                                return food.text !== "";
                            })
                                .map((food) => {
                                    return <div key={food.id} className="item" id={food.btn_id}>
                                        <span>{food.text}</span>
                                        <button onClick={this.removeFood} value={food.btn_id}>X</button>
                                    </div>
                                })
                        }
                    </div>
            </div>


            </>
        )
    }
}
