"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/page",{

/***/ "(app-pages-browser)/./src/components/Header/page.tsx":
/*!****************************************!*\
  !*** ./src/components/Header/page.tsx ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var _DropdownUser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DropdownUser */ \"(app-pages-browser)/./src/components/Header/DropdownUser.tsx\");\n/* harmony import */ var _web3modal_ethers_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @web3modal/ethers/react */ \"(app-pages-browser)/./node_modules/@web3modal/ethers/dist/esm/exports/react.js\");\n/* harmony import */ var _barrel_optimize_names_FiMenu_react_icons_fi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=FiMenu!=!react-icons/fi */ \"(app-pages-browser)/./node_modules/react-icons/fi/index.mjs\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nconst Header = (param)=>{\n    let { sidebarOpen, setSidebarOpen } = param;\n    _s();\n    const [connected, setConnected] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [signedIn, setSignedIn] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [account, setAccount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [network, setNetwork] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const { open } = (0,_web3modal_ethers_react__WEBPACK_IMPORTED_MODULE_4__.useWeb3Modal)();\n    const trigger = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const checkConnection = async ()=>{\n            try {\n                const provider = await open();\n                if (provider) {\n                    const signer = provider.getSigner();\n                    const account = await signer.getAddress();\n                    const network = await provider.getNetwork();\n                    setConnected(true);\n                    setAccount(account);\n                    setNetwork(network.name);\n                }\n            } catch (error) {\n                console.error(\"Error checking connection:\", error);\n            }\n        };\n        checkConnection();\n    }, [\n        open\n    ]);\n    const connectMetaMask = async ()=>{\n        try {\n            const provider = await open();\n            if (provider) {\n                const signer = provider.getSigner();\n                const account = await signer.getAddress();\n                const network = await provider.getNetwork();\n                setConnected(true);\n                setAccount(account);\n                setNetwork(network.name);\n                setSignedIn(true);\n                router.push(\"/dashboard\");\n            }\n        } catch (error) {\n            console.error(\"Error connecting:\", error);\n        }\n    };\n    const handleSignIn = ()=>{\n        setSignedIn(true);\n    };\n    const handleConnect = ()=>{\n        if (!signedIn) {\n            handleSignIn();\n        } else {\n            connectMetaMask();\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n        className: \"bg-gray-800\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex items-center justify-between h-16\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        ref: trigger,\n                        onClick: ()=>setSidebarOpen(!sidebarOpen),\n                        \"aria-controls\": \"sidebar\",\n                        \"aria-expanded\": !!sidebarOpen,\n                        className: \"block bg-red-900\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FiMenu_react_icons_fi__WEBPACK_IMPORTED_MODULE_5__.FiMenu, {\n                            className: \"w-6 h-6\"\n                        }, void 0, false, {\n                            fileName: \"/home/dev/blockchain/visitor-web/frontend/src/components/Header/page.tsx\",\n                            lineNumber: 85,\n                            columnNumber: 13\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"/home/dev/blockchain/visitor-web/frontend/src/components/Header/page.tsx\",\n                        lineNumber: 78,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex items-center\",\n                        children: connected && account && network && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"text-white\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    children: [\n                                        \"Account: \",\n                                        account\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/home/dev/blockchain/visitor-web/frontend/src/components/Header/page.tsx\",\n                                    lineNumber: 91,\n                                    columnNumber: 17\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    children: [\n                                        \"Network: \",\n                                        network\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/home/dev/blockchain/visitor-web/frontend/src/components/Header/page.tsx\",\n                                    lineNumber: 92,\n                                    columnNumber: 17\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/home/dev/blockchain/visitor-web/frontend/src/components/Header/page.tsx\",\n                            lineNumber: 90,\n                            columnNumber: 15\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"/home/dev/blockchain/visitor-web/frontend/src/components/Header/page.tsx\",\n                        lineNumber: 88,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"hidden lg:flex gap-3 items-center\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        className: \"bg-blue-950 text-white rounded-full hover:bg-blue-500 transition duration-300\",\n                                        onClick: handleConnect,\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"w3m-button\", {}, void 0, false, {\n                                            fileName: \"/home/dev/blockchain/visitor-web/frontend/src/components/Header/page.tsx\",\n                                            lineNumber: 103,\n                                            columnNumber: 17\n                                        }, undefined)\n                                    }, void 0, false, {\n                                        fileName: \"/home/dev/blockchain/visitor-web/frontend/src/components/Header/page.tsx\",\n                                        lineNumber: 99,\n                                        columnNumber: 15\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        className: \"bg-blue-950 text-white rounded-full hover:bg-blue-500 transition duration-300\",\n                                        onClick: handleConnect,\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"w3m-network-button\", {}, void 0, false, {\n                                            fileName: \"/home/dev/blockchain/visitor-web/frontend/src/components/Header/page.tsx\",\n                                            lineNumber: 109,\n                                            columnNumber: 17\n                                        }, undefined)\n                                    }, void 0, false, {\n                                        fileName: \"/home/dev/blockchain/visitor-web/frontend/src/components/Header/page.tsx\",\n                                        lineNumber: 105,\n                                        columnNumber: 15\n                                    }, undefined)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/home/dev/blockchain/visitor-web/frontend/src/components/Header/page.tsx\",\n                                lineNumber: 98,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_DropdownUser__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n                                fileName: \"/home/dev/blockchain/visitor-web/frontend/src/components/Header/page.tsx\",\n                                lineNumber: 112,\n                                columnNumber: 13\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/dev/blockchain/visitor-web/frontend/src/components/Header/page.tsx\",\n                        lineNumber: 97,\n                        columnNumber: 11\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/dev/blockchain/visitor-web/frontend/src/components/Header/page.tsx\",\n                lineNumber: 77,\n                columnNumber: 9\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"/home/dev/blockchain/visitor-web/frontend/src/components/Header/page.tsx\",\n            lineNumber: 76,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/home/dev/blockchain/visitor-web/frontend/src/components/Header/page.tsx\",\n        lineNumber: 75,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Header, \"znZwuGHv+5Kd3zbzc6PvgEdI/pc=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter,\n        _web3modal_ethers_react__WEBPACK_IMPORTED_MODULE_4__.useWeb3Modal\n    ];\n});\n_c = Header;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Header);\nvar _c;\n$RefreshReg$(_c, \"Header\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL0hlYWRlci9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQzJEO0FBQ2Y7QUFDRjtBQUNhO0FBRWY7QUFPeEMsTUFBTVEsU0FBZ0M7UUFBQyxFQUFFQyxXQUFXLEVBQUVDLGNBQWMsRUFBRTs7SUFDcEUsTUFBTSxDQUFDQyxXQUFXQyxhQUFhLEdBQUdYLCtDQUFRQSxDQUFVO0lBQ3BELE1BQU0sQ0FBQ1ksVUFBVUMsWUFBWSxHQUFHYiwrQ0FBUUEsQ0FBVTtJQUNsRCxNQUFNLENBQUNjLFNBQVNDLFdBQVcsR0FBR2YsK0NBQVFBLENBQWdCO0lBQ3RELE1BQU0sQ0FBQ2dCLFNBQVNDLFdBQVcsR0FBR2pCLCtDQUFRQSxDQUFnQjtJQUN0RCxNQUFNa0IsU0FBU2YsMERBQVNBO0lBQ3hCLE1BQU0sRUFBRWdCLElBQUksRUFBRSxHQUFHZCxxRUFBWUE7SUFFN0IsTUFBTWUsVUFBVWxCLDZDQUFNQSxDQUFvQjtJQUUxQ0QsZ0RBQVNBLENBQUM7UUFDUixNQUFNb0Isa0JBQWtCO1lBQ3RCLElBQUk7Z0JBQ0YsTUFBTUMsV0FBWSxNQUFNSDtnQkFDeEIsSUFBSUcsVUFBVTtvQkFDWixNQUFNQyxTQUFTRCxTQUFTRSxTQUFTO29CQUNqQyxNQUFNVixVQUFVLE1BQU1TLE9BQU9FLFVBQVU7b0JBQ3ZDLE1BQU1ULFVBQVUsTUFBTU0sU0FBU0ksVUFBVTtvQkFDekNmLGFBQWE7b0JBQ2JJLFdBQVdEO29CQUNYRyxXQUFXRCxRQUFRVyxJQUFJO2dCQUN6QjtZQUNGLEVBQUUsT0FBT0MsT0FBTztnQkFDZEMsUUFBUUQsS0FBSyxDQUFDLDhCQUE4QkE7WUFDOUM7UUFDRjtRQUVBUDtJQUNGLEdBQUc7UUFBQ0Y7S0FBSztJQUVULE1BQU1XLGtCQUFrQjtRQUN0QixJQUFJO1lBQ0YsTUFBTVIsV0FBWSxNQUFNSDtZQUN4QixJQUFJRyxVQUFVO2dCQUNaLE1BQU1DLFNBQVNELFNBQVNFLFNBQVM7Z0JBQ2pDLE1BQU1WLFVBQVUsTUFBTVMsT0FBT0UsVUFBVTtnQkFDdkMsTUFBTVQsVUFBVSxNQUFNTSxTQUFTSSxVQUFVO2dCQUN6Q2YsYUFBYTtnQkFDYkksV0FBV0Q7Z0JBQ1hHLFdBQVdELFFBQVFXLElBQUk7Z0JBQ3ZCZCxZQUFZO2dCQUNaSyxPQUFPYSxJQUFJLENBQUM7WUFDZDtRQUNGLEVBQUUsT0FBT0gsT0FBTztZQUNkQyxRQUFRRCxLQUFLLENBQUMscUJBQXFCQTtRQUNyQztJQUNGO0lBRUEsTUFBTUksZUFBZTtRQUNuQm5CLFlBQVk7SUFDZDtJQUVBLE1BQU1vQixnQkFBZ0I7UUFDcEIsSUFBSSxDQUFDckIsVUFBVTtZQUNib0I7UUFDRixPQUFPO1lBQ0xGO1FBQ0Y7SUFDRjtJQUVBLHFCQUNFLDhEQUFDSTtRQUFJQyxXQUFVO2tCQUNiLDRFQUFDQztZQUFJRCxXQUFVO3NCQUNiLDRFQUFDQztnQkFBSUQsV0FBVTs7a0NBQ2IsOERBQUNFO3dCQUNDQyxLQUFLbEI7d0JBQ0xtQixTQUFTLElBQU05QixlQUFlLENBQUNEO3dCQUMvQmdDLGlCQUFjO3dCQUNkQyxpQkFBZSxDQUFDLENBQUNqQzt3QkFDakIyQixXQUFVO2tDQUVWLDRFQUFDN0IsZ0ZBQU1BOzRCQUFDNkIsV0FBVTs7Ozs7Ozs7Ozs7a0NBR3BCLDhEQUFDQzt3QkFBSUQsV0FBVTtrQ0FDWnpCLGFBQWFJLFdBQVdFLHlCQUN2Qiw4REFBQ29COzRCQUFJRCxXQUFVOzs4Q0FDYiw4REFBQ087O3dDQUFFO3dDQUFVNUI7Ozs7Ozs7OENBQ2IsOERBQUM0Qjs7d0NBQUU7d0NBQVUxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQUtuQiw4REFBQ29CO3dCQUFJRCxXQUFVOzswQ0FDYiw4REFBQ0M7O2tEQUNDLDhEQUFDQzt3Q0FDQ0YsV0FBVTt3Q0FDVkksU0FBU047a0RBRVQsNEVBQUNVOzs7Ozs7Ozs7O2tEQUVILDhEQUFDTjt3Q0FDQ0YsV0FBVTt3Q0FDVkksU0FBU047a0RBRVQsNEVBQUNXOzs7Ozs7Ozs7Ozs7Ozs7OzBDQUdMLDhEQUFDeEMscURBQVlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNekI7R0F4R01HOztRQUtXSixzREFBU0E7UUFDUEUsaUVBQVlBOzs7S0FOekJFO0FBMEdOLCtEQUFlQSxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL0hlYWRlci9wYWdlLnRzeD8xNzVlIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvbmF2aWdhdGlvblwiO1xuaW1wb3J0IERyb3Bkb3duVXNlciBmcm9tIFwiLi9Ecm9wZG93blVzZXJcIjtcbmltcG9ydCB7IHVzZVdlYjNNb2RhbCB9IGZyb20gXCJAd2ViM21vZGFsL2V0aGVycy9yZWFjdFwiO1xuaW1wb3J0IHsgV2ViM1Byb3ZpZGVyIH0gZnJvbSBcIkBldGhlcnNwcm9qZWN0L3Byb3ZpZGVyc1wiO1xuaW1wb3J0IHsgRmlNZW51IH0gZnJvbSBcInJlYWN0LWljb25zL2ZpXCI7XG5cbmludGVyZmFjZSBIZWFkZXJQcm9wcyB7XG4gIHNpZGViYXJPcGVuOiBzdHJpbmcgfCBib29sZWFuIHwgdW5kZWZpbmVkO1xuICBzZXRTaWRlYmFyT3BlbjogKGFyZzA6IGJvb2xlYW4pID0+IHZvaWQ7XG59XG5cbmNvbnN0IEhlYWRlcjogUmVhY3QuRkM8SGVhZGVyUHJvcHM+ID0gKHsgc2lkZWJhck9wZW4sIHNldFNpZGViYXJPcGVuIH0pID0+IHtcbiAgY29uc3QgW2Nvbm5lY3RlZCwgc2V0Q29ubmVjdGVkXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW3NpZ25lZEluLCBzZXRTaWduZWRJbl0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFthY2NvdW50LCBzZXRBY2NvdW50XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbmV0d29yaywgc2V0TmV0d29ya10gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IHsgb3BlbiB9ID0gdXNlV2ViM01vZGFsKCk7XG5cbiAgY29uc3QgdHJpZ2dlciA9IHVzZVJlZjxIVE1MQnV0dG9uRWxlbWVudD4obnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjaGVja0Nvbm5lY3Rpb24gPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwcm92aWRlciA9IChhd2FpdCBvcGVuKCkpIGFzIHVua25vd24gYXMgV2ViM1Byb3ZpZGVyO1xuICAgICAgICBpZiAocHJvdmlkZXIpIHtcbiAgICAgICAgICBjb25zdCBzaWduZXIgPSBwcm92aWRlci5nZXRTaWduZXIoKTtcbiAgICAgICAgICBjb25zdCBhY2NvdW50ID0gYXdhaXQgc2lnbmVyLmdldEFkZHJlc3MoKTtcbiAgICAgICAgICBjb25zdCBuZXR3b3JrID0gYXdhaXQgcHJvdmlkZXIuZ2V0TmV0d29yaygpO1xuICAgICAgICAgIHNldENvbm5lY3RlZCh0cnVlKTtcbiAgICAgICAgICBzZXRBY2NvdW50KGFjY291bnQpO1xuICAgICAgICAgIHNldE5ldHdvcmsobmV0d29yay5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGNoZWNraW5nIGNvbm5lY3Rpb246XCIsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY2hlY2tDb25uZWN0aW9uKCk7XG4gIH0sIFtvcGVuXSk7XG5cbiAgY29uc3QgY29ubmVjdE1ldGFNYXNrID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwcm92aWRlciA9IChhd2FpdCBvcGVuKCkpIGFzIHVua25vd24gYXMgV2ViM1Byb3ZpZGVyO1xuICAgICAgaWYgKHByb3ZpZGVyKSB7XG4gICAgICAgIGNvbnN0IHNpZ25lciA9IHByb3ZpZGVyLmdldFNpZ25lcigpO1xuICAgICAgICBjb25zdCBhY2NvdW50ID0gYXdhaXQgc2lnbmVyLmdldEFkZHJlc3MoKTtcbiAgICAgICAgY29uc3QgbmV0d29yayA9IGF3YWl0IHByb3ZpZGVyLmdldE5ldHdvcmsoKTtcbiAgICAgICAgc2V0Q29ubmVjdGVkKHRydWUpO1xuICAgICAgICBzZXRBY2NvdW50KGFjY291bnQpO1xuICAgICAgICBzZXROZXR3b3JrKG5ldHdvcmsubmFtZSk7XG4gICAgICAgIHNldFNpZ25lZEluKHRydWUpO1xuICAgICAgICByb3V0ZXIucHVzaChcIi9kYXNoYm9hcmRcIik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjb25uZWN0aW5nOlwiLCBlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNpZ25JbiA9ICgpID0+IHtcbiAgICBzZXRTaWduZWRJbih0cnVlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDb25uZWN0ID0gKCkgPT4ge1xuICAgIGlmICghc2lnbmVkSW4pIHtcbiAgICAgIGhhbmRsZVNpZ25JbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25uZWN0TWV0YU1hc2soKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8bmF2IGNsYXNzTmFtZT1cImJnLWdyYXktODAwXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGgtMTZcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICByZWY9e3RyaWdnZXJ9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaWRlYmFyT3Blbighc2lkZWJhck9wZW4pfVxuICAgICAgICAgICAgYXJpYS1jb250cm9scz1cInNpZGViYXJcIlxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17ISFzaWRlYmFyT3Blbn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJsb2NrIGJnLXJlZC05MDBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxGaU1lbnUgY2xhc3NOYW1lPVwidy02IGgtNlwiIC8+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICB7Y29ubmVjdGVkICYmIGFjY291bnQgJiYgbmV0d29yayAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgIDxwPkFjY291bnQ6IHthY2NvdW50fTwvcD5cbiAgICAgICAgICAgICAgICA8cD5OZXR3b3JrOiB7bmV0d29ya308L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlkZGVuIGxnOmZsZXggZ2FwLTMgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctYmx1ZS05NTAgdGV4dC13aGl0ZSByb3VuZGVkLWZ1bGwgaG92ZXI6YmctYmx1ZS01MDAgdHJhbnNpdGlvbiBkdXJhdGlvbi0zMDBcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNvbm5lY3R9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8dzNtLWJ1dHRvbiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWJsdWUtOTUwIHRleHQtd2hpdGUgcm91bmRlZC1mdWxsIGhvdmVyOmJnLWJsdWUtNTAwIHRyYW5zaXRpb24gZHVyYXRpb24tMzAwXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDb25uZWN0fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHczbS1uZXR3b3JrLWJ1dHRvbiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPERyb3Bkb3duVXNlciAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmF2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJ1c2VSb3V0ZXIiLCJEcm9wZG93blVzZXIiLCJ1c2VXZWIzTW9kYWwiLCJGaU1lbnUiLCJIZWFkZXIiLCJzaWRlYmFyT3BlbiIsInNldFNpZGViYXJPcGVuIiwiY29ubmVjdGVkIiwic2V0Q29ubmVjdGVkIiwic2lnbmVkSW4iLCJzZXRTaWduZWRJbiIsImFjY291bnQiLCJzZXRBY2NvdW50IiwibmV0d29yayIsInNldE5ldHdvcmsiLCJyb3V0ZXIiLCJvcGVuIiwidHJpZ2dlciIsImNoZWNrQ29ubmVjdGlvbiIsInByb3ZpZGVyIiwic2lnbmVyIiwiZ2V0U2lnbmVyIiwiZ2V0QWRkcmVzcyIsImdldE5ldHdvcmsiLCJuYW1lIiwiZXJyb3IiLCJjb25zb2xlIiwiY29ubmVjdE1ldGFNYXNrIiwicHVzaCIsImhhbmRsZVNpZ25JbiIsImhhbmRsZUNvbm5lY3QiLCJuYXYiLCJjbGFzc05hbWUiLCJkaXYiLCJidXR0b24iLCJyZWYiLCJvbkNsaWNrIiwiYXJpYS1jb250cm9scyIsImFyaWEtZXhwYW5kZWQiLCJwIiwidzNtLWJ1dHRvbiIsInczbS1uZXR3b3JrLWJ1dHRvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/Header/page.tsx\n"));

/***/ })

});