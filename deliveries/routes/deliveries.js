const express = require('express');
const router = express.Router();

const {Delivery} = require('../models');
const {Order} = require('../models');
const {User} = require('../models');

const verifyToken = require('../middlewares/authMiddleware');

router.get('/',verifyToken, async (req, res) => {
  try {
    delivery_id = req.user.user_id;
    const deliveries = await Delivery.findAll({where : {delivery_id}});
    console.log(deliveries);
    res.render('deliveries', { deliveries });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { order_id } = req.body;
    const status = "배송 중";

    
    const order = await Order.findOne({where : {id:order_id}});
    if(order){
      const user_id = order.user_id;
      console.log(user_id);
      user_info = await User.findOne({where: {id:user_id },attributes: ['address', 'tel']})
      
      const delivery_address = user_info.dataValues.address;
      const delivery_tel = user_info.dataValues.tel;
      const delivery_id = req.user.user_id;
      console.log(delivery_id);
      const memo = '';

      await Delivery.create({ status, memo, order_id, delivery_address, delivery_tel, delivery_id});
      await Order.update({ state: status }, { where: { id: order_id } });
    }
    res.redirect('/orders');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, order_id, delivery_address } = req.body;
    
    console.log(req.body);
    console.log(req.body.order_id);
      // If the status is '배송 완료', update the order state to '배송 완료'
      if (status === '배송 완료' || status ==='보류') {
        await Order.update({ state: status }, { where: { id: order_id } });

        await Delivery.update({ status: status }, { where: { id: id } });
      }

    res.redirect('/deliveries');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Delivery.destroy({ where: { id } });
    res.redirect('/deliveries');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
