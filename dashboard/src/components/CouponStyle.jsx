import { useEffect, useState } from "react"
import { getCouponStyle } from "../assets/CouponBuilder"

const CouponStyle = ({ oldStyle, oldColor, oldBorder, change }) => {
    const [style, setStyle] = useState(oldStyle || 0)
    const [color, setColor] = useState(oldColor || "black")
    const [border, setBorder] = useState(oldBorder || 0)

    useEffect(() => {
        if (oldStyle) setStyle(oldStyle)
        if (oldColor) setColor(oldColor)
        if (oldBorder) setBorder(oldBorder)
    }, [oldStyle, oldColor, oldBorder])
    return <div className="row">
        <h5>Estilo</h5>
        <div className="mb-3 col-4">
            <label htmlFor="style" className="form-label">Tipo</label>
            <select className="form-select" aria-label="style" name="style" value={style} onChange={({target}) => {
                setStyle(target.value)
                change(style,color,border)
            }}>
                <option value="0">1</option>
                <option value="1">2</option>
                <option value="2">3</option>
            </select>
        </div>
        <div className="mb-3 col-4">
            <label htmlFor="color" className="form-label">Color</label>
            <select className="form-select" aria-label="color" name="color" value={color} onChange={({target}) => {
                setColor(target.value)
                change(style,color,border)
            }}>
                <option value="black">Negro</option>
                <option value="blue">Azul</option>
                <option value="pale">Ocre</option>
                <option value="red">Rojo</option>
                <option value="yellow">Amarillo</option>
            </select>
        </div>
        <div className="mb-3 col-4">
            <label htmlFor="border" className="form-label">Borde</label>
            <select className="form-select" aria-label="border" name="border" value={border} onChange={({target}) => {
                setBorder(target.value)
                change(style,color,border)
            }}>
                <option value="0">1</option>
                <option value="1">2</option>
                <option value="2">3</option>
            </select>
        </div>
        <div className="col-12">
            <div style={{ backgroundImage: `url(${getCouponStyle(color, style)})`, backgroundRepeat: 'no-repeat', height: 150, width: 287 }} className="p-4">
                <div style={{...borders[border]}}></div>
            </div>
        </div>
    </div>
}
const borders = [
    {
      borderRadius: 15,
      borderWidth: 2,
      border: 'solid white',
      height: '100%'
    },
    {
      borderStyle: 'dashed',
      borderRadius: 15,
      borderWidth: 2,
      borderColor: 'white',
      height: '100%'
    },
    {
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderTop: 'solid',
      borderBottom: 'solid',
      borderTopColor: 'white',
      borderBottomColor: 'white',
      height: '100%'
    },
  ];
export default CouponStyle