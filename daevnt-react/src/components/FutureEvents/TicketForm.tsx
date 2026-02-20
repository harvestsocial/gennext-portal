import React, { useState } from "react";

import type { FormEvent, ChangeEvent } from "react";

interface Ticket {
  type: string;
  label: string;
  price: number;
}

const TicketForm: React.FC = () => {
  const tickets: Ticket[] = [
    { type: "silver", label: "Silver Pass", price: 285 },
    { type: "gold", label: "Gold Pass", price: 400 },
    { type: "platinum", label: "Platinum Pass", price: 550 },
  ];

  const [ticketType, setTicketType] = useState<Ticket>(tickets[0]);
  const [quantity, setQuantity] = useState<number>(1);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = tickets.find((t) => t.type === e.target.value);
    if (selected) {
      setTicketType(selected);
    }
  };

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const totalCost = ticketType.price * quantity;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(
      `You purchased ${quantity} ${
        ticketType.label
      }(s) for $${totalCost.toFixed(2)}`
    );
  };

  return (
    <form className="ticket-purchase__form" onSubmit={handleSubmit}>
      {/* Ticket Select */}
      <div className="position-relative">
        <select
          value={ticketType.type}
          onChange={handleSelectChange}
          className="form-select ticket-purchase__dropdown"
        >
          {tickets.map((ticket) => (
            <option key={ticket.type} value={ticket.type}>
              {ticket.label}
            </option>
          ))}
        </select>
        <div className="dropdown-icon">
          <i className="flaticon-down-arrow-1"></i>
        </div>
      </div>

      {/* Price + Quantity */}
      <div className="ticket-purchase__price-control">
        <div className="ticket-purchase__price">
          <span className="ticket-purchase__amount">
            ${ticketType.price.toFixed(2)}
          </span>
          <span className="ticket-purchase__label">Unlimited</span>
        </div>

        <div
          className="ticket-purchase__quantity-selector"
          aria-label="Select Quantity"
        >
          <button
            type="button"
            onClick={decreaseQty}
            className="ticket-purchase__quantity-btn"
          >
            -
          </button>
          <span className="ticket-purchase__quantity" aria-live="polite">
            {quantity}
          </span>
          <input type="hidden" name="quantity" value={quantity} />
          <button
            type="button"
            onClick={increaseQty}
            className="ticket-purchase__quantity-btn"
          >
            +
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="ticket-purchase__summary">
        <p className="ticket-purchase__summary-item">
          <span>Quantity:</span>
          <span>{String(quantity).padStart(2, "0")}</span>
        </p>
        <p className="ticket-purchase__summary-item">
          <span>Total Cost:</span>
          <span>${totalCost.toFixed(2)}</span>
        </p>
      </div>

      <button type="submit" className="ticket-purchase__button">
        Purchase Now
      </button>
    </form>
  );
};

export default TicketForm;
