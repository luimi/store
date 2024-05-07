const axios = require('axios');

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
                console.log(response)
                res({id: response.data.data.id, link: `https://checkout.wompi.co/l/${response.data.data.id}`})
            }).catch((error) => {
                console.log(error);
            });
        })
    },
    handleUpdate: async (data) => {
        if(data.event !== "transaction.updated" || data.data.transaction.status !== "APPROVED") return
        let receipt = await new Parse.Query("Receipt").equalTo("linkId", data.data.transaction.payment_link_id).first({useMasterKey: true});
        receipt.set("active", true);
        receipt.set("transaction", data);
        receipt.save(null, {useMasterKey: true})
    }
}