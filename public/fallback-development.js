/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@ducanh2912/next-pwa/dist/fallback.js":
/*!************************************************************!*\
  !*** ./node_modules/@ducanh2912/next-pwa/dist/fallback.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\nself.fallback=async _=>{let{destination:e,url:A}=_,s={document:\"/~offline\",image:false,audio:false,video:false,font:false}[e];return s?caches.match(s,{ignoreSearch:!0}):\"\"===e&&false&&0?0:Response.error()};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGR1Y2FuaDI5MTIvbmV4dC1wd2EvZGlzdC9mYWxsYmFjay5qcyIsIm1hcHBpbmdzIjoiO0FBQUEsd0JBQXdCLElBQUksb0JBQW9CLE1BQU0sU0FBUyxXQUFxQyxPQUFPLEtBQWtDLE9BQU8sS0FBa0MsT0FBTyxLQUFrQyxNQUFNLEtBQWlDLENBQUMsSUFBSSx5QkFBeUIsZ0JBQWdCLFVBQVUsS0FBaUMsRUFBRSxDQUF3QyxDQUFDLENBQWlFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9AZHVjYW5oMjkxMi9uZXh0LXB3YS9kaXN0L2ZhbGxiYWNrLmpzP2QzNzYiXSwic291cmNlc0NvbnRlbnQiOlsic2VsZi5mYWxsYmFjaz1hc3luYyBfPT57bGV0e2Rlc3RpbmF0aW9uOmUsdXJsOkF9PV8scz17ZG9jdW1lbnQ6cHJvY2Vzcy5lbnYuX19QV0FfRkFMTEJBQ0tfRE9DVU1FTlRfXyxpbWFnZTpwcm9jZXNzLmVudi5fX1BXQV9GQUxMQkFDS19JTUFHRV9fLGF1ZGlvOnByb2Nlc3MuZW52Ll9fUFdBX0ZBTExCQUNLX0FVRElPX18sdmlkZW86cHJvY2Vzcy5lbnYuX19QV0FfRkFMTEJBQ0tfVklERU9fXyxmb250OnByb2Nlc3MuZW52Ll9fUFdBX0ZBTExCQUNLX0ZPTlRfX31bZV07cmV0dXJuIHM/Y2FjaGVzLm1hdGNoKHMse2lnbm9yZVNlYXJjaDohMH0pOlwiXCI9PT1lJiZwcm9jZXNzLmVudi5fX1BXQV9GQUxMQkFDS19EQVRBX18mJkEubWF0Y2goL1xcL19uZXh0XFwvZGF0YVxcLy4rXFwvLitcXC5qc29uJC9pKT9jYWNoZXMubWF0Y2gocHJvY2Vzcy5lbnYuX19QV0FfRkFMTEJBQ0tfREFUQV9fLHtpZ25vcmVTZWFyY2g6ITB9KTpSZXNwb25zZS5lcnJvcigpfTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/@ducanh2912/next-pwa/dist/fallback.js\n"));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/trusted types policy */
/******/ 	!function() {
/******/ 		var policy;
/******/ 		__webpack_require__.tt = function() {
/******/ 			// Create Trusted Type policy if Trusted Types are available and the policy doesn't exist yet.
/******/ 			if (policy === undefined) {
/******/ 				policy = {
/******/ 					createScript: function(script) { return script; }
/******/ 				};
/******/ 				if (typeof trustedTypes !== "undefined" && trustedTypes.createPolicy) {
/******/ 					policy = trustedTypes.createPolicy("nextjs#bundler", policy);
/******/ 				}
/******/ 			}
/******/ 			return policy;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/trusted types script */
/******/ 	!function() {
/******/ 		__webpack_require__.ts = function(script) { return __webpack_require__.tt().createScript(script); };
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/react refresh */
/******/ 	!function() {
/******/ 		if (__webpack_require__.i) {
/******/ 		__webpack_require__.i.push(function(options) {
/******/ 			var originalFactory = options.factory;
/******/ 			options.factory = function(moduleObject, moduleExports, webpackRequire) {
/******/ 				var hasRefresh = typeof self !== "undefined" && !!self.$RefreshInterceptModuleExecution$;
/******/ 				var cleanup = hasRefresh ? self.$RefreshInterceptModuleExecution$(moduleObject.id) : function() {};
/******/ 				try {
/******/ 					originalFactory.call(this, moduleObject, moduleExports, webpackRequire);
/******/ 				} finally {
/******/ 					cleanup();
/******/ 				}
/******/ 			}
/******/ 		})
/******/ 		}
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	
/******/ 	// noop fns to prevent runtime errors during initialization
/******/ 	if (typeof self !== "undefined") {
/******/ 		self.$RefreshReg$ = function () {};
/******/ 		self.$RefreshSig$ = function () {
/******/ 			return function (type) {
/******/ 				return type;
/******/ 			};
/******/ 		};
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./node_modules/@ducanh2912/next-pwa/dist/fallback.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;