const Order = require('../models/Order');

// Faz o mapeamento do JSON de entrada para o formato do banco
function mapInputToOrder(body) {
  if (!body || typeof body !== 'object') throw new Error('Body inválido');
  const orderId = (body.numeroPedido || '').replace(/-\d+$/, '') // exemplo clean, mas mantém o id
  return {
    orderId: orderId || body.numeroPedido,
    value: Number(body.valorTotal),
    creationDate: body.dataCriacao ? new Date(body.dataCriacao) : new Date(),
    items: (body.items || []).map(i => ({
      productId: Number(i.idItem),
      quantity: Number(i.quantidadeItem),
      price: Number(i.valorItem)
    }))
  };
}

exports.createOrder = async (req, res, next) => {
  try {
    const mapped = mapInputToOrder(req.body);
    // validações simples
    if (!mapped.orderId) return res.status(400).json({ error: 'orderId é obrigatório' });
    const existing = await Order.findOne({ orderId: mapped.orderId });
    if (existing) return res.status(409).json({ error: 'OrderId já existe' });

    const order = new Order(mapped);
    await order.save();
    res.status(201).json({ message: 'Pedido criado', order });
  } catch (err) {
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findOne({ orderId });
    if (!order) return res.status(404).json({ error: 'Pedido não encontrado' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.listOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ creationDate: -1 }).limit(100);
    res.json({ count: orders.length, orders });
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const mapped = mapInputToOrder(req.body);
    const updated = await Order.findOneAndUpdate({ orderId }, mapped, { new: true });
    if (!updated) return res.status(404).json({ error: 'Pedido não encontrado' });
    res.json({ message: 'Pedido atualizado', order: updated });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const deleted = await Order.findOneAndDelete({ orderId });
    if (!deleted) return res.status(404).json({ error: 'Pedido não encontrado' });
    res.json({ message: 'Pedido deletado' });
  } catch (err) {
    next(err);
  }
};
