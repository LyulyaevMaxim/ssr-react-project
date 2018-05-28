import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Switch, Route, withRouter } from 'react-router-dom';
import { addTodo } from './store/todo/todoActions';
import { NotFoundPage } from './components/AsyncComponents';
import routes from './routes';
import styles from '../css/index.scss';

class App extends Component {
    handleAddTodoClick = () => {
        this.props.addTodo(`Random Todo #${Math.round(Math.random() * 100)}`);
    };

    render() {
        const { todos } = this.props;
        return (
            <div>
                <Helmet>
                    <title>React Universal</title>
                </Helmet>
                <h1>Welcome to React SSR!</h1>
                {!!todos.length && (
                    <ul>
                        {todos.map(todo => <li key={todo.id}>{todo.name}</li>)}
                    </ul>
                )}
                <img src="/img/content/example-avatar-1.png" alt="" />
                <button onClick={this.handleAddTodoClick}>
                    Add random todo
                </button>
                <Switch>
                    {routes.map(({ path, exact, component: C, ...rest }) => (
                        <Route
                            key={path}
                            path={path}
                            exact={exact}
                            render={props => <C {...props} {...rest} />}
                        />
                    ))}
                    <Route render={props => <NotFoundPage {...props} />} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = ({ todos, routing }) => ({ todos, routing });
export default withRouter(connect(mapStateToProps, { addTodo })(App));
