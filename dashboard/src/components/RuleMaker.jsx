import { useEffect, useState } from "react";

const RuleMaker = ({ oldRules, update }) => {
    const [rules, setRules] = useState([])
    const [current, setCurrent] = useState("")
    useEffect(() => {
        if( oldRules) setRules(oldRules)
    }, [oldRules])
    return <div>
        <h5>Reglas</h5>
        <div className="input-group">
            <input type="text" className="form-control" placeholder="Regla" aria-label="rule" aria-describedby="rule" name="rule" onChange={({ target }) => setCurrent(target.value)} value={current} />
            <span className="input-group-text" id="rule" onClick={() => {
                setRules([...rules, [current]])
                setCurrent("")
            }}>+</span>
        </div>
        <ul className="list-group">
            {rules.map((rule, index) => {
                return <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                {rule}
                <i className="bi bi-x-lg" onClick={() => {
                    let copy = [...rules]
                    copy.splice(index,1)
                    setRules(copy)
                    update(copy)
                }}></i>
              </li>
            })}
        </ul>
    </div>
}

export default RuleMaker;