import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Parse from 'parse';
import { getCurrentRole } from "../utils/roles";
import { useEffect, useState } from "react";


const Main = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [roles, setRoles] = useState([])
    const [selected, setSelected] = useState({})
    const user = Parse.User.current();

    useEffect(() => {
        if (roles.length === 0) getRoles()
        let pathData = location.pathname.split("/")
        if(pathData.length>3) {
            setSelected({module: pathData.at(-2), id: pathData.at(-1)})
        }
    }, [])
    const getRoles = async () => {
        setRoles(await getCurrentRole())
    }
    const getCompanyMenu = (role) => {
        return <div>
            <h4 className="d-none d-md-inline">{role.get("name")}</h4>
            <hr />
            <div className={`rounded-pill px-4 py-2 ${selected.module === 'redeemed' && selected.id === role.id? 'text-bg-primary' : ''}`}>
                <a href={`/main/redeemed/${role.id}`} className="nav-link text-truncate" style={{ maxWidth: 150 }} aria-current="page">
                    <span className="pe-none"><i className="bi bi-check-circle"></i></span>
                    <span className="d-none d-md-inline ms-2">Redimidos </span>
                </a>
            </div>
            <div className={`rounded-pill px-4 py-2 ${selected.module === 'redeem' && selected.id === role.id? 'text-bg-primary' : ''}`}>
                <a href={`/main/redeem/${role.id}`} className="nav-link text-truncate" style={{ maxWidth: 150 }} aria-current="page">
                    <span className="pe-none"><i className="bi bi-qr-code"></i></span>
                    <span className="d-none d-md-inline ms-2">Redimidir </span>
                </a>
            </div>
            <hr />
        </div>
    }
    return <div className="d-flex flex-column vh-100">
        <nav className="navbar bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">
                    {process.env.REACT_APP_NAME}
                </span>
            </div>
        </nav>
        <div className="flex-row flex-grow-1 overflow-auto d-flex">
            <div className="p-4 flex-column d-flex bg-body-tertiary">
                <canvas className="d-none d-md-block" width="200" height="0"></canvas>
                <div className="flex-grow-1 overflow-y-scroll">
                    {roles.map((role) => {
                        return <div key={role.id}>
                            {getCompanyMenu(role)}
                        </div>
                    })}
                </div>
                <div>
                    <div className="d-flex text-body-secondary py-3 align-items-center justify-content-center">
                        <i className="bd-placeholder-img flex-shrink-0 rounded bi bi-person-circle d-inline-block text-center me-3" style={{ fontSize: 30, verticalAlign: "middle" }} />
                        <p className="ms-2 mb-0 small lh-sm d-none d-md-block">
                            <strong className="d-block text-gray-dark">{user.get("username")}</strong>
                            {user.get("name")}
                        </p>
                    </div>
                    <div className="align-items-center justify-content-center d-flex">
                        <button type="button" className="btn btn-light " onClick={() => {
                            if (window.confirm("¿Desea cerrar la sesión?")) {
                                Parse.User.logOut().then(() => {
                                    navigate("/")
                                });
                            }
                        }}>🚪<span className="d-none d-md-inline ms-2">LogOut</span></button>
                    </div>
                </div>
            </div>
            <div className="flex-grow-1 bg-body-tertiary">
                <Outlet />

            </div>
        </div>
    </div>

    /*<>
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="">
                    <i className="bi bi-ticket-perforated d-inline-block text-center me-3" style={{ fontSize: 30, verticalAlign: "middle" }} />
                    {process.env.REACT_APP_NAME}
                </a>
            </div>
        </nav>
        <div className="row">
            <div className="col-3 bg-light">
                <div className="text-center">
                    <i className="bi bi-person-circle" style={{fontSize: 60}}></i>
                    <h1>{user.get("name")}</h1>

                </div>
                <div className="p-2">
                    <ul className="list-group">
                        <Link to={"coupons"}>
                            <li className="list-group-item d-flex align-items-center text-start">
                                <i className="bi bi-ticket-perforated me-3"></i>
                                Cupones
                            </li>
                        </Link>
                    </ul>
                </div>

            </div>
            <div className="col">
                <Outlet />
            </div>
        </div>
    </>*/
}

export default Main;