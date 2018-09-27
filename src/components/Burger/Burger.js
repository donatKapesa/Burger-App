import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    console.log(props)
    // transformedIngredients is an array1 of 'empty' arrays2. elements of arrays2 have no names try console.log(transformedIngredients)
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => { // or return new Array(props.ingredients[igKey]).fill(undefined).map...
            return <BurgerIngredient key={igKey + i} type={igKey}/> // lecture 117
        });
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    // how to check if we have ingredients? we can reduce the array
    //console.log(transformedIngredients);

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;