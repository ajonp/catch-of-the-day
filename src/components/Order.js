import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { formatPrice } from '../helpers';

class Order extends React.Component {
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';
    const transOption = {
      classNames: 'order',
      key: { key },
      timeout: { enter: 250, exit: 250 }
    };

    if (!fish) return null;

    if (!isAvailable) {
      return (
        <CSSTransition {...transOption}>
          <li key={key}>
            Sorry {fish ? fish.name : 'fish'} is no longer available
            <button onClick={() => this.props.deleteFromOrder(key)}>X</button>
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transOption}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 5000, exit: 5000 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name} {formatPrice(fish.price)}
            <button onClick={() => this.props.deleteFromOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
