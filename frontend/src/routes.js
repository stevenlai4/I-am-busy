import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import UserToDo from './pages/User/ToDo';
import ToDoUpdate from './pages/User/ToDoUpdate';
import ToDoCreate from './pages/User/ToDoCreate';
import ToDoHistory from './pages/User/ToDoHistory';
import Register from './pages/Register';
import ConfirmEmail from './pages/Register/ConfirmEmail';
import EmailVerified from './pages/Register/EmailVerified';

export default function Routes({ setUser }) {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route
                        path="/login"
                        render={() => <Login setUser={setUser} />}
                    />
                    <Route path="/user/register" component={Register} />
                    <Route
                        path="/user/todo/update/:todo_id"
                        component={ToDoUpdate}
                    />
                    <Route path="/user/todo/history" component={ToDoHistory} />
                    <Route path="/user/todo/create" component={ToDoCreate} />
                    <Route path="/user/todo" component={UserToDo} />

                    <Route
                        path="/user/email-confirm"
                        component={ConfirmEmail}
                    />
                    <Route
                        path="/user/email-verified/:token"
                        component={EmailVerified}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    );
}
