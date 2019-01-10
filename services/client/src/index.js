import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="columns">
                    <div className="column is-one-third">
                        <br/>
                        <h1 className="title is-1 is-1">All Users</h1>
                        <hr/><br/>
                    </div>

                </div>

            </div>

        </section>
    )
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);