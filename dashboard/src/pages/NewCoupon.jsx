import { useNavigate } from "react-router-dom"
import CouponForm from "../forms/CouponForm";

const NewCoupon = () => {
    const navigate = useNavigate();
    return <>
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="">
                    <i className="bi bi-arrow-left me-3" onClick={() => navigate("/main/coupons")} />
                    Nuevo Cupón
                </a>
            </div>
        </nav>
        <CouponForm />
    </>
}

export default NewCoupon