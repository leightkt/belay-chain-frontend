import { Redirect, Route } from 'react-router-dom'

function PrivateRoute ({ path, component: Component, ...props }) {

    return localStorage.token 
        ?   <Route exact path={ path } render={() => <Component { ...props }/>
                            }
            />
        : <Redirect to="/login" />
}

export default PrivateRoute