import Parse from 'parse';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(Parse.User.current()) goToMain()
    }, [])
    const login = async (evt) => {
        evt.preventDefault();
        const { username, password } = evt.target;
        if (!username.value || !password.value || username.value.trim() === "" || password.value.trim() === "") {
            alert("Missing username or password")
            return
        }
        try {
            await Parse.User.logIn(username.value, password.value)
            goToMain()
        } catch (e) {
            alert(e.message)
        }
    }
    const goToMain = () => {
        navigate("/main")
    }
    return <div className="row vh-100 m-0">
    <div className="col-md-6 col-sm-12 bg-body-tertiary d-flex align-items-center">
        <main className="w-75 m-auto">
            <form onSubmit={login}>
                <div className="d-flex align-items-center justify-content-center mb-4">
                <i className="bi bi-ticket-perforated" style={{ fontSize: 150 }}></i>
                </div>
                <h1 className="h3 mb-3 fw-normal text-center">{process.env.REACT_APP_NAME}</h1>

                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Usuario" name="username" />
                    <label for="floatingInput">Usuario</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Contraseña" name="password" />
                    <label for="floatingPassword">Contraseña</label>
                </div>
                <button className="btn btn-primary w-100 py-2 my-3" type="submit">Login</button>
                <p className="mt-5 mb-3 text-body-secondary">{process.env.REACT_APP_NAME} &copy; 2024</p>
            </form>
        </main>
    </div>
    <div className="d-none d-md-block col-md-6 bg-primary">

    </div>
</div>
    
    /*<div className='cotainer'>
        <div className='row'>
            <div className='col'></div>
            <div className='col mb-5'>
                <div className="card mt-5">
                    <div className="card-body">
                        <div style={{ height: 200, display: 'flex', justifyContent: "center", alignItems: "center" }}>
                            
                        </div>
                        <h1 className='text-center mb-4'></h1>
                        <form >
                            <div className="mb-3">
                                <label htmlFor="usernameInput" className="form-label">Correo electrónico</label>
                                <input type="email" className="form-control" id="usernameInput" name="username" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="passwordInput" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" id="passwordInput" name="password" />
                            </div>
                            <button type="submit" className="btn btn-primary mb-3">Login</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className='col'></div>
        </div>

    </div>*/
}

export default Login;