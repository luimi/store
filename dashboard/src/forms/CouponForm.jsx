import { useEffect, useState } from "react";
import Parse from 'parse';
import moment from 'moment';
import RuleMaker from "../components/RuleMaker";
import CouponStyle from "../components/CouponStyle";

const CouponForm = ({ edit }) => {
    const [coupon, setCoupon] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [companies, setCompanies] = useState();
    const handleChange = ({ target }) => {
        let value = target.name === "haveAmount" ? target.checked : target.value
        setCoupon({ ...coupon, [target.name]: value })

    }
    useEffect(() => {
        if (!companies) getCompanies()
        if (edit) {
            setIsEdit(true)
            setCoupon({
                title: edit.get("title"),
                company: edit.get("company").id,
                description: edit.get("description"),
                price: edit.get("price"),
                originalPrice: edit.get("originalPrice"),
                discount: edit.get("discount"),
                left: edit.get("left"),
                expiration: moment(edit.get("expiration")).format("YYYY-MM-DD"),
                haveAmount: edit.get("haveAmount"),
                rules: edit.get("rules"),
                style: edit.get("style"),
                color: edit.get("color"),
                border: edit.get("border"),
            })
        }
    }, [edit])
    const getCompanies = async () => {
        const companies = await new Parse.Query("Company").find();
        setCompanies(companies);
    }
    return <div className="container p-5">
        <div className="row">
            <div className="mb-3 col-6">
                <label htmlFor="title" className="form-label">Titulo</label>
                <input type="text" className="form-control" id="title" aria-describedby="title" name="title" value={coupon.title} onChange={handleChange} />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="company" className="form-label">Compañia</label>
                <select className="form-select" aria-label="company" id="company" name="company" onChange={handleChange} value={coupon.company} >
                    {companies?.map((company, index) => {
                        return <option value={company.id} key={index}>{company.get("name")}</option>
                    })}
                </select>
            </div>
            <div className="mb-3 col-12">
                <label htmlFor="description" className="form-label">Descripción</label>
                <textarea className="form-control" id="description" rows="3" name="description" onChange={handleChange} value={coupon.description} ></textarea>
            </div>

            <div className="mb-3 col-5">
                <label htmlFor="price" className="form-label">Precio</label>
                <input type="number" className="form-control" id="price" aria-describedby="price" name="price" onChange={handleChange} value={coupon.price} />
            </div>
            <div className="mb-3 col-4">
                <label htmlFor="originalPrice" className="form-label">Precio original</label>
                <input type="number" className="form-control" id="originalPrice" aria-describedby="originalPrice" name="originalPrice" onChange={handleChange} value={coupon.originalPrice} />
            </div>
            <div className="mb-3 col-3">
                <label htmlFor="discount" className="form-label">Descuento (%)</label>
                <input type="number" className="form-control" id="discount" aria-describedby="discount" name="discount" onChange={handleChange} value={coupon.discount} />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="expiration" className="form-label">Expiracion</label>
                <input type="date" className="form-control" id="expiration" aria-describedby="left" name="expiration" onChange={handleChange} value={coupon.expiration} />
            </div>
            <div className="col-6 row">
                <div className="form-check col">
                    <input className="form-check-input" type="checkbox" value="" id="haveAmount" checked={coupon.haveAmount} onChange={handleChange} name="haveAmount" />
                    <label className="form-check-label" htmlFor="haveAmount">
                        Limitado
                    </label>
                </div>
                <div className="mb-3 col">
                    <label htmlFor="left" className="form-label">Cantidad</label>
                    <input type="number" className="form-control" id="left" aria-describedby="left" name="left" onChange={handleChange} value={coupon.left} disabled={!coupon.haveAmount} />
                </div>
            </div>


            <div className="col-6" style={{ height: 400, overflow: 'scroll' }}>
                <RuleMaker oldRules={coupon.rules} update={(copy) => setCoupon({ ...coupon, rules: copy })} />
            </div>
            <div className="col-6">
                <CouponStyle oldStyle={coupon.style} oldColor={coupon.color} oldBorder={coupon.border} change={(style, color, border) => {
                    setCoupon({ ...coupon, style, color, border })
                }} />
            </div>
        </div>

        <button type="submit" className="btn btn-primary" onClick={() => {
            console.log(coupon)
        }}>Guardar</button>
    </div>
}

export default CouponForm;