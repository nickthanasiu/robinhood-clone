const Stock = require('../../models/Stock');

exports.buy_stock = (req, res) => {
  const {
    currentUserId,
    companyId,
    companyPrice,
    shares,
  } = req.body;

  if (!currentUserId || !companyId) {
    res.status(422).send({ error: 'Both user and company id\'s are required to buy stock' });
  }

  if (!companyPrice || !shares) {
    res.status(422).send({ error: 'Company price and number of shares are required to buy stock' });
  }

  const stock = new Stock({
    user_id: currentUserId,
    company_id: companyId,
    price: companyPrice,
    num_shares: shares,
  });

  console.log('NEW STOCK ITEM TO BE SAVED: ', stock);

  stock.save();

  res.json(stock);
};

exports.get_stocks = (req, res) => {
  const { currentUserId } = req.body;
  console.log('GET_STOCKS REQ.BODY: ', req.body);
};
