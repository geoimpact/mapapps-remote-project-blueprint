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
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
// import registerServiceWorker from './registerServiceWorker';

// registerServiceWorker();


// import registerServiceWorker from './registerServiceWorker';

const env = process.env.NODE_ENV;

if(env === 'production'){
    console.debug("Initializing React Application", {config: window.react});
    const reactPortalDomNodeID = window.react["react_bundle"].config.bundleName;
    ReactDOM.render(<App />, document.getElementById(reactPortalDomNodeID));
} else if (env === "development"){
    console.debug("Initializing React Application", {config: window.react, env});
    const reactPortalDomNodeID = "react_bundle";
    ReactDOM.render(<App />, document.getElementById(reactPortalDomNodeID));
}
// registerServiceWorker();