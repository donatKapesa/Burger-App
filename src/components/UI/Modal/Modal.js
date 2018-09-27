import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    // this only updates if 'show' changes. this.props.show is prev state
    // Why we didn't put this inside OrderSummar.js? Because we need to update ONLY IF the modal is 'shown'
    // Here we only do 1 check. Using Pure Components would do more checks, which I don't need
    shouldComponentUpdate(nextProps, nextState) { // make sure that if children change (Spinner/OrderSummary), component should update too
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate() {
        console.log('[Modal] WillUpdate');
    }

    render() {
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;
