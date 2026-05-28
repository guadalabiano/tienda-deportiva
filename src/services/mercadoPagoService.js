import api from './api';

export const mercadoPagoService = {
  createPayment: async ({ cardHolder, cardNumber, expiration, cvv, amount }) => {
    const response = await api.post('/mercadopago/checkout', {
      cardHolder,
      cardNumber,
      expiration,
      cvv,
      amount
    });
    return response.data;
  }
};
