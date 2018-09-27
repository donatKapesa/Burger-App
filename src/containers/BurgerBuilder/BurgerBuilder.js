import React, {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorhandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'; // can even ommit index here
import axios from '../../axios-order';

class BurgerBuilder extends Component {
    state = {
        purchasable: false, // becomes true once there's at least 1 ingredient
        purchasing: false
    }

    // good to fetch data from server inside componentDidMount
    componentDidMount() {
        console.log(this.props); // these are route props
        this.props.onInitIngredients();
    }

    // updatePurchaseState(ingredients) is very important
    updatePurchaseState(ingredients) { // updatePurchaseState() doesn't work properly inside add and remove handlers because ingredients might be outdated in the state
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
        this.props.onInitPurchase();
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; // so now disabledInfo[key] is boolean
        }
        // disabledInfo = {salad: true, cheese: false, etc...}

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded !</p> : <Spinner />

        if(this.props.ings) { // only display these after they've been retrieved from the server
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}/>
                </Aux>
            );
            orderSummary = (
                <OrderSummary 
                    ingredients={this.props.ings}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.props.price.toFixed(2)}/>
            )
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.initIngredients())
    }
    
    // return {
    //     onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    //     onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    // };

    // The action creators (e.g. inside burgerBuilder in /store/actions) are just there to make the files look nicer.
    // it's basically a function that turns
    // onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)) 
    // into 
    // onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName})

    /*
    * ACTION CREATORS HELP US RUN ASYNC CODE
    */

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorhandler(BurgerBuilder, axios)); // axios error is centrally handled here. BECAUSE WE ARE USING AN AXIOS INSTANCE INSIDE AXIOS-ORDER.JS