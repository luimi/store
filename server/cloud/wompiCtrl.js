const axios = require('axios');
const dotenv = require("dotenv");
const emailCtrl = require("./emailCtrl");
dotenv.config();

const { WOMPI_URL, WOMPI_TOKEN } = process.env;
axios.defaults.headers.post['Authorization'] = `Bearer ${WOMPI_TOKEN}`;
module.exports = {
    createLink: (title, id, price) => {
        
        return new Promise((res, rej) => {
            axios.post(`${WOMPI_URL}/payment_links`, {
                "name": title,
                "description": "Pago cupón",
                "single_use": true,
                "collect_shipping": false,
                "currency": "COP",
                "amount_in_cents": price * 100,
                "sku": id
            }).then((response) => {
                res({success: true, data : {id: response.data.data.id, link: `https://checkout.wompi.co/l/${response.data.data.id}`}})
            }).catch((error) => {
                res({success: false, message: error.message})
            });
        })
    },
    handleUpdate: async (data) => {
        if(data.event !== "transaction.updated" || data.data.transaction.status !== "APPROVED") return
        let receipt = await new Parse.Query("Receipt").include("coupon").include("user").equalTo("linkId", data.data.transaction.payment_link_id).first({useMasterKey: true});
        receipt.set("active", true);
        receipt.set("transaction", data);
        const coupon = receipt.get("coupon")
        if(coupon.get("haveAmount")) coupon.set("left", coupon.get("left")-1);
        receipt.save(null, {useMasterKey: true});
        coupon.save(null, {useMasterKey: true});
        emailCtrl.send(receipt.get("user").get("email"),receipt.get("user").get("name"),coupon.get("description"), receipt.id)
    }
}