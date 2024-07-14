import { useEffect, useState } from "react";
import Parse from 'parse';
import moment from 'moment';
import { Link } from "react-router-dom";

const Coupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [filter, setFilter] = useState("");
    useEffect(() => {
        getCoupons()
    }, [])
    const getCoupons = async () => {
        let coupons = await new Parse.Query("Coupon").include("company").descending("expiration").find()
        setCoupons(coupons)
    }
    const getFilter = (coupon) => {
        return coupon.get("title").toLowerCase().includes(filter) ||
            coupon.id.toLowerCase().includes(filter) ||
            coupon.get("company").get("name").toLowerCase().includes(filter)
    }
    return <div className="container">
        <div className="input-group mb-3 mt-3">
            <input type="text" className="form-control" placeholder="Filtrar" aria-label="filter" aria-describedby="filter" onChange={(evt) => setFilter(evt.target.value.toLowerCase())}/>
            <span className="input-group-text"><Link to="/main/newcoupon">Nuevo Cupón</Link></span>
        </div>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Titulo</th>
                    <th scope="col">Empresa</th>
                    <th scope="col">Descuento</th>
                    <th scope="col">Expiración</th>
                    <th scope="col">Acciónes</th>
                </tr>
            </thead>
            <tbody>
                {coupons.filter((coupon) => getFilter(coupon)).map((coupon, index) => {
                    return <tr key={index}>
                        <td>{coupon.get("title")}</td>
                        <td>{coupon.get("company").get("name")}</td>
                        <td>-{coupon.get("discount")}%</td>
                        <td>{moment(coupon.get("expiration")).format("DD/MM/YYYY")}</td>
                        <td className="text-center">
                            <Link to={`/main/editcoupon/${coupon.id}`}><i className="bi bi-pencil me-1" /></Link>
                            <i className="bi bi-trash ms-1" />
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

export default Coupons;