import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Parse from 'parse'
import moment from 'moment'

const Redeemed = () => {
    const [receipts, setReceipts] = useState([])
    const { id } = useParams();

    useEffect(() => {
        getCoupons()
    }, [])
    const getCoupons = async () => {
        const role = await new Parse.Query(Parse.Role).get(id)
        const company = await new Parse.Query("Company").equalTo("name", role.get("name")).first()
        const result = await new Parse.Query("Receipt").include("user").include("coupon").equalTo("company", company).equalTo("active", true).equalTo("available", false).find()
        setReceipts(result)
    }
    return <div className='bg-body m-3 p-3'>
        <h1>Redimidos</h1>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Cupón</th>
                    <th scope="col">Fecha de redención</th>
                </tr>
            </thead>
            <tbody>
                {receipts.map((receipt, index) => {
                    return <tr key={index}>
                        <td>{receipt.id}</td>
                        <td>{receipt?.get("user")?.get("name")}</td>
                        <td>{receipt?.get("coupon")?.get("title")}</td>
                        <td>{moment(receipt.get("updatedAt")).format("DD/MM/YYYY")}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>;
};

export default Redeemed;