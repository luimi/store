import { useNavigate, useParams } from "react-router-dom";
import CouponForm from "../forms/CouponForm";
import { useEffect, useState } from "react";
import Parse from 'parse';

const EditCoupon = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [coupon, setCoupon] = useState();

    useEffect(() => {
        getCoupon(id)
    }, [])
    const getCoupon = async (id) => {
        const coupon = await new Parse.Query("Coupon").include("company").get(id);
        setCoupon(coupon)
    }
    return <>
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="">
                    <i className="bi bi-arrow-left me-3" onClick={() => navigate("/main/coupons")} />
                    Modificar Cupón
                </a>
            </div>
        </nav>
        <CouponForm edit={coupon}/>
    </>
}

export default EditCoupon;