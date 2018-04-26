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
define(["dojo/_base/declare", "apprt/BundleEvent", "require"], function (declare, BundleEvent, _require) {
    return declare([], {
        constructor: function (props) {
            console.debug("RCEnhancerActivator constructor", {props: props});
        },

        init: function (componentContext) {
            console.debug("RCEnhancerActivator init", {componentContext: componentContext});
            this._componentContext = componentContext;
        },

        start: function (bundleContext) {
            // register event listener function
            console.debug("RCEnhancerActivator start", {bundleContext: bundleContext});
            this._bundleEventListenerHandle = bundleContext.addBundleListener(this._onBundleEvent, this);
        },
        stop: function (bundleContext) {
            console.debug("RCEnhancerActivator stop", {bundleContext: bundleContext});
            // unregister event listener
            bundleContext.removeBundleListener(this._bundleEventListenerHandle);
            this._bundleEventListenerHandle = null;
        },

        activate: function (componentContext) {
            console.debug("RCEnhancerActivator activate", {componentContext: componentContext});
            this._componentContext = componentContext;
            var props = this._properties;
            // create and append to the document body the dom node where react creates a portal
            this.createReactPortalNode(props);
            this.createBridge(props);
            this.loadReactBundle(props);
        },

        modified: function (componentContext) {
            console.debug("RCEnhancerActivator modified", {componentContext: componentContext});
        },

        deactivate: function () {
            console.debug("RCEnhancerActivator deactivate");
            this._componentContext = null;
        },

        createReactPortalNode: function (props) {
            console.debug("RCEnhancerActivator createReactPortalNode");
            var node = document.createElement("div");
            node.id = props.config.bundleName;
            document.body.appendChild(node);
        },

        isDevelopmentRun: function (props) {
            console.debug("RCEnhancerActivator isDevelopmentRun");
            return window.location.href.startsWith(props.config.developmentURL);
        },

        getReactResourceLocations: function (props) {
            console.debug("RCEnhancerActivator getReactResourceLocations");
            if (this.isDevelopmentRun(props)) {
                var developmentBundleServer = props.config.developmentBundleServer;
                return {
                    bundleLocation: developmentBundleServer + "/static/js/bundle.js",
                    cssLocation: developmentBundleServer + "/static/css/main.css"
                }
            } else {
                return {
                    bundleLocation: "./react-app/build/static/js/main",
                    cssLocation: "./react-app/build/static/css/main.css"
                }
            }
        },

        loadReactBundle: function (props) {
            console.debug("RCEnhancerActivator loadReactBundle");
            var thisRef = this;
            return new Promise(function (res, rej) {
                var resourceLocations = thisRef.getReactResourceLocations(props);
                var bundleLocation = resourceLocations.bundleLocation;
                var cssLocation = resourceLocations.cssLocation;

                var p1 = new Promise(function (res, rej) {
                    _require([bundleLocation], function (bundle) {
                        console.debug("RCEnhancerActivator loadReactBundle", {bundleLocation: bundleLocation});
                        res(bundleLocation)
                    });
                });
                var p2 = new Promise(function (res, rej) {
                    _require(["xstyle/css!" + cssLocation], function (bundle) {
                        console.debug("RCEnhancerActivator loadReactBundle", {cssLocation: cssLocation});
                        res(cssLocation)
                    });
                });
                return Promise.all([p1, p2]);
            });
        },

        createBridge: function (props) {
            if (typeof window.react === "object") {
                window.react[props.config.bundleName] = {
                    config: props.config
                }
            } else {
                window.react = {};
                window.react[props.config.bundleName] = {
                    config: props.config
                }
            }
        },

        _onBundleEvent: function (evt) {
            var types = BundleEvent.types;
            if (types.STARTED === evt.getType()) {
                var bundle = evt.getBundle();
                // console.log("started bundle " + bundle.getSymbolicName(), bundle);
                // do something with the new started bundle
            }
        }
    });
});