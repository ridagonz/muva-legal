"use client";

import { FaPaypal } from "react-icons/fa";

export function PayPalPayment() {
  const checkoutUrl = process.env.NEXT_PUBLIC_PAYPAL_CHECKOUT_URL?.trim();
  const label = <><FaPaypal aria-hidden="true" /><span>Pagar con <strong>PayPal</strong></span></>;

  return (
    <div className="contact-payment">
      {checkoutUrl ? (
        <a className="contact-paypal-button" href={checkoutUrl} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      ) : (
        <>
          <button className="contact-paypal-button" type="button" disabled aria-describedby="paypal-status">
            {label}
          </button>
          <p id="paypal-status">Pagos con PayPal pendientes de activación.</p>
        </>
      )}
    </div>
  );
}
