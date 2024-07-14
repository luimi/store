import React, { useState } from 'react';
import Parse from 'parse';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const Redeem = () => {
    const [receipt, setReceipt] = useState()
    const { id } = useParams();

    const search = async (evt) => {
        evt.preventDefault();
        const { code } = evt.target;
        try {
            const role = await new Parse.Query(Parse.Role).get(id)
            const company = await new Parse.Query("Company").equalTo("name", role.get("name")).first()
            let result = await new Parse.Query("Receipt").include("user").include("coupon").equalTo("company", company).equalTo("available", true).equalTo("active", true).get(code.value)
            setReceipt(result)
            code.value = ""
        } catch (e) {
            alert("Código invalido")
        }

    }
    const redeem = async (evt) => {
        receipt.set("available", false)
        await receipt.save()
        setReceipt(undefined)
        alert("Cupón redimido")
    }
    const showCoupon = () => {
        if (!receipt) return ""
        else return <div className='text-center'>
            <table className="table ">
                <tbody>
                    <tr>
                        <th scope="row">Nombre</th>
                        <td>{receipt.get("user").get("name")}</td>
                    </tr>
                    <tr>
                        <th scope="row">Cupón</th>
                        <td>{receipt.get("coupon").get("title")}</td>
                    </tr>
                    <tr>
                        <th scope="row">Descuento</th>
                        <td>-{receipt.get("coupon").get("discount")}%</td>
                    </tr>
                    <tr>
                        <th scope="row">Expiración</th>
                        <td>{moment(receipt.get("coupon").get("expiration")).format("DD/MM/YYYY")}</td>
                    </tr>
                </tbody>
            </table>
            <button className='btn btn-primary' onClick={redeem}>Redimir</button>
        </div>
    }
    return <div className='text-center p-4'>
        <div className='row'>
            <div className='col-md-2 col-sm-0 col-lg-3'></div>
            <div className='col-md-8 col-sm-12 col-lg-6'>
                <form onSubmit={search}>
                    <h4>Código</h4>
                    <div className="mb-3 ">
                        <input type="text" className="form-control text-center" id="code" placeholder="AbCdE1234" name="code" />
                    </div>
                    <button type="submit" className="btn btn-primary mb-3">Buscar</button>
                </form>
                {showCoupon()}
            </div>
            <div className='col-md-2 col-sm-0 col-lg-3'></div>
        </div>


    </div>;
};

export default Redeem;