/*
 * Copyright (C) 2017 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, {Component} from 'react';
import logo from './../../logo.svg';
import './App.css';
import winston from 'winston';

const logger = new (winston.Logger)({
    level: 'warn',
    transports: [
        new (winston.transports.Console)()
    ]
});

class App extends Component {
    constructor(props) {
        super(props);
        console.debug(`${this.constructor.name} constructor`, {
            window: window,
            react: window.react
        });

        logger.log({
            level: 'info',
            message: `${this.constructor.name} constructor - Initialized winston logger.`
        });
    }

    render() {
        return (
            <div className="App" onClick={() => {
                window.alert("Hello Conterra!");
            }}>
                <h1>Hello world!</h1>
            </div>
        );
    }
}

export default App;
