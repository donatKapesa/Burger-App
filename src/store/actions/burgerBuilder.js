import axios from '../../axios-order';
import * as actionTypes from './actionTypes';

// addIngredient is an action creator
export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
} // inside mapDispatchToProps in BurgerBuilder.js, onIngredientAdded takes ingredient name. So must pass it here

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

// synchronous action creator which I want to dispatch once the async
// code initIngredients is done

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => { // async code
    return dispatch => {
        axios.get('https://burger-project-ac320.firebaseio.com/ingredients.json')
            .then(response => {
                console.log(response);
                dispatch(setIngredients(response.data)) // dispatch setIngredients axios get is done
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed())
            });
    }
}

