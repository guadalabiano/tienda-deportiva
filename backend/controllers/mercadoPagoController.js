export async function createPayment(req, res) {
  try {
    const { cardHolder, cardNumber, expiration, cvv, amount } = req.body;

    if (!cardHolder || !cardNumber || !expiration || !cvv || !amount) {
      return res.status(400).json({ error: 'Faltan datos de pago' });
    }

    const sanitizedCardNumber = cardNumber.replace(/\D/g, '');
    const cardRegex = /^\d{13,19}$/;
    if (!cardRegex.test(sanitizedCardNumber)) {
      return res.status(400).json({ error: 'Número de tarjeta inválido' });
    }

    const cvvRegex = /^\d{3,4}$/;
    if (!cvvRegex.test(cvv)) {
      return res.status(400).json({ error: 'CVV inválido' });
    }

    const expirationParts = expiration.split('/').map(part => part.trim());
    if (expirationParts.length !== 2) {
      return res.status(400).json({ error: 'Fecha de expiración inválida' });
    }

    const month = parseInt(expirationParts[0], 10);
    let year = parseInt(expirationParts[1], 10);
    if (Number.isNaN(month) || Number.isNaN(year) || month < 1 || month > 12) {
      return res.status(400).json({ error: 'Fecha de expiración inválida' });
    }

    if (year < 100) {
      year += 2000;
    }

    const now = new Date();
    const expirationDate = new Date(year, month - 1, 1);
    if (expirationDate < new Date(now.getFullYear(), now.getMonth(), 1)) {
      return res.status(400).json({ error: 'La tarjeta está vencida' });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: 'Monto de pago inválido' });
    }

    return res.status(200).json({
      success: true,
      transactionId: `MP-${Date.now()}`,
      amount,
      message: 'Pago aprobado con tarjeta de prueba'
    });
  } catch (error) {
    console.error('Error en createPayment:', error);
    res.status(500).json({ error: 'Error procesando el pago' });
  }
}
