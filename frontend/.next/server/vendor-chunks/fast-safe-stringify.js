/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/fast-safe-stringify";
exports.ids = ["vendor-chunks/fast-safe-stringify"];
exports.modules = {

/***/ "(ssr)/./node_modules/fast-safe-stringify/index.js":
/*!***************************************************!*\
  !*** ./node_modules/fast-safe-stringify/index.js ***!
  \***************************************************/
/***/ ((module) => {

eval("module.exports = stringify\nstringify.default = stringify\nstringify.stable = deterministicStringify\nstringify.stableStringify = deterministicStringify\n\nvar LIMIT_REPLACE_NODE = '[...]'\nvar CIRCULAR_REPLACE_NODE = '[Circular]'\n\nvar arr = []\nvar replacerStack = []\n\nfunction defaultOptions () {\n  return {\n    depthLimit: Number.MAX_SAFE_INTEGER,\n    edgesLimit: Number.MAX_SAFE_INTEGER\n  }\n}\n\n// Regular stringify\nfunction stringify (obj, replacer, spacer, options) {\n  if (typeof options === 'undefined') {\n    options = defaultOptions()\n  }\n\n  decirc(obj, '', 0, [], undefined, 0, options)\n  var res\n  try {\n    if (replacerStack.length === 0) {\n      res = JSON.stringify(obj, replacer, spacer)\n    } else {\n      res = JSON.stringify(obj, replaceGetterValues(replacer), spacer)\n    }\n  } catch (_) {\n    return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]')\n  } finally {\n    while (arr.length !== 0) {\n      var part = arr.pop()\n      if (part.length === 4) {\n        Object.defineProperty(part[0], part[1], part[3])\n      } else {\n        part[0][part[1]] = part[2]\n      }\n    }\n  }\n  return res\n}\n\nfunction setReplace (replace, val, k, parent) {\n  var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k)\n  if (propertyDescriptor.get !== undefined) {\n    if (propertyDescriptor.configurable) {\n      Object.defineProperty(parent, k, { value: replace })\n      arr.push([parent, k, val, propertyDescriptor])\n    } else {\n      replacerStack.push([val, k, replace])\n    }\n  } else {\n    parent[k] = replace\n    arr.push([parent, k, val])\n  }\n}\n\nfunction decirc (val, k, edgeIndex, stack, parent, depth, options) {\n  depth += 1\n  var i\n  if (typeof val === 'object' && val !== null) {\n    for (i = 0; i < stack.length; i++) {\n      if (stack[i] === val) {\n        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent)\n        return\n      }\n    }\n\n    if (\n      typeof options.depthLimit !== 'undefined' &&\n      depth > options.depthLimit\n    ) {\n      setReplace(LIMIT_REPLACE_NODE, val, k, parent)\n      return\n    }\n\n    if (\n      typeof options.edgesLimit !== 'undefined' &&\n      edgeIndex + 1 > options.edgesLimit\n    ) {\n      setReplace(LIMIT_REPLACE_NODE, val, k, parent)\n      return\n    }\n\n    stack.push(val)\n    // Optimize for Arrays. Big arrays could kill the performance otherwise!\n    if (Array.isArray(val)) {\n      for (i = 0; i < val.length; i++) {\n        decirc(val[i], i, i, stack, val, depth, options)\n      }\n    } else {\n      var keys = Object.keys(val)\n      for (i = 0; i < keys.length; i++) {\n        var key = keys[i]\n        decirc(val[key], key, i, stack, val, depth, options)\n      }\n    }\n    stack.pop()\n  }\n}\n\n// Stable-stringify\nfunction compareFunction (a, b) {\n  if (a < b) {\n    return -1\n  }\n  if (a > b) {\n    return 1\n  }\n  return 0\n}\n\nfunction deterministicStringify (obj, replacer, spacer, options) {\n  if (typeof options === 'undefined') {\n    options = defaultOptions()\n  }\n\n  var tmp = deterministicDecirc(obj, '', 0, [], undefined, 0, options) || obj\n  var res\n  try {\n    if (replacerStack.length === 0) {\n      res = JSON.stringify(tmp, replacer, spacer)\n    } else {\n      res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer)\n    }\n  } catch (_) {\n    return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]')\n  } finally {\n    // Ensure that we restore the object as it was.\n    while (arr.length !== 0) {\n      var part = arr.pop()\n      if (part.length === 4) {\n        Object.defineProperty(part[0], part[1], part[3])\n      } else {\n        part[0][part[1]] = part[2]\n      }\n    }\n  }\n  return res\n}\n\nfunction deterministicDecirc (val, k, edgeIndex, stack, parent, depth, options) {\n  depth += 1\n  var i\n  if (typeof val === 'object' && val !== null) {\n    for (i = 0; i < stack.length; i++) {\n      if (stack[i] === val) {\n        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent)\n        return\n      }\n    }\n    try {\n      if (typeof val.toJSON === 'function') {\n        return\n      }\n    } catch (_) {\n      return\n    }\n\n    if (\n      typeof options.depthLimit !== 'undefined' &&\n      depth > options.depthLimit\n    ) {\n      setReplace(LIMIT_REPLACE_NODE, val, k, parent)\n      return\n    }\n\n    if (\n      typeof options.edgesLimit !== 'undefined' &&\n      edgeIndex + 1 > options.edgesLimit\n    ) {\n      setReplace(LIMIT_REPLACE_NODE, val, k, parent)\n      return\n    }\n\n    stack.push(val)\n    // Optimize for Arrays. Big arrays could kill the performance otherwise!\n    if (Array.isArray(val)) {\n      for (i = 0; i < val.length; i++) {\n        deterministicDecirc(val[i], i, i, stack, val, depth, options)\n      }\n    } else {\n      // Create a temporary object in the required way\n      var tmp = {}\n      var keys = Object.keys(val).sort(compareFunction)\n      for (i = 0; i < keys.length; i++) {\n        var key = keys[i]\n        deterministicDecirc(val[key], key, i, stack, val, depth, options)\n        tmp[key] = val[key]\n      }\n      if (typeof parent !== 'undefined') {\n        arr.push([parent, k, val])\n        parent[k] = tmp\n      } else {\n        return tmp\n      }\n    }\n    stack.pop()\n  }\n}\n\n// wraps replacer function to handle values we couldn't replace\n// and mark them as replaced value\nfunction replaceGetterValues (replacer) {\n  replacer =\n    typeof replacer !== 'undefined'\n      ? replacer\n      : function (k, v) {\n        return v\n      }\n  return function (key, val) {\n    if (replacerStack.length > 0) {\n      for (var i = 0; i < replacerStack.length; i++) {\n        var part = replacerStack[i]\n        if (part[1] === key && part[0] === val) {\n          val = part[2]\n          replacerStack.splice(i, 1)\n          break\n        }\n      }\n    }\n    return replacer.call(this, key, val)\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZmFzdC1zYWZlLXN0cmluZ2lmeS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxnQkFBZ0I7QUFDekQ7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixrQkFBa0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsZ0JBQWdCO0FBQ2xDO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixrQkFBa0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsMEJBQTBCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92aXNpdG9yLXdlYi8uL25vZGVfbW9kdWxlcy9mYXN0LXNhZmUtc3RyaW5naWZ5L2luZGV4LmpzPzg0NjMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBzdHJpbmdpZnlcbnN0cmluZ2lmeS5kZWZhdWx0ID0gc3RyaW5naWZ5XG5zdHJpbmdpZnkuc3RhYmxlID0gZGV0ZXJtaW5pc3RpY1N0cmluZ2lmeVxuc3RyaW5naWZ5LnN0YWJsZVN0cmluZ2lmeSA9IGRldGVybWluaXN0aWNTdHJpbmdpZnlcblxudmFyIExJTUlUX1JFUExBQ0VfTk9ERSA9ICdbLi4uXSdcbnZhciBDSVJDVUxBUl9SRVBMQUNFX05PREUgPSAnW0NpcmN1bGFyXSdcblxudmFyIGFyciA9IFtdXG52YXIgcmVwbGFjZXJTdGFjayA9IFtdXG5cbmZ1bmN0aW9uIGRlZmF1bHRPcHRpb25zICgpIHtcbiAgcmV0dXJuIHtcbiAgICBkZXB0aExpbWl0OiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUixcbiAgICBlZGdlc0xpbWl0OiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxuICB9XG59XG5cbi8vIFJlZ3VsYXIgc3RyaW5naWZ5XG5mdW5jdGlvbiBzdHJpbmdpZnkgKG9iaiwgcmVwbGFjZXIsIHNwYWNlciwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgb3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zKClcbiAgfVxuXG4gIGRlY2lyYyhvYmosICcnLCAwLCBbXSwgdW5kZWZpbmVkLCAwLCBvcHRpb25zKVxuICB2YXIgcmVzXG4gIHRyeSB7XG4gICAgaWYgKHJlcGxhY2VyU3RhY2subGVuZ3RoID09PSAwKSB7XG4gICAgICByZXMgPSBKU09OLnN0cmluZ2lmeShvYmosIHJlcGxhY2VyLCBzcGFjZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcyA9IEpTT04uc3RyaW5naWZ5KG9iaiwgcmVwbGFjZUdldHRlclZhbHVlcyhyZXBsYWNlciksIHNwYWNlcilcbiAgICB9XG4gIH0gY2F0Y2ggKF8pIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoJ1t1bmFibGUgdG8gc2VyaWFsaXplLCBjaXJjdWxhciByZWZlcmVuY2UgaXMgdG9vIGNvbXBsZXggdG8gYW5hbHl6ZV0nKVxuICB9IGZpbmFsbHkge1xuICAgIHdoaWxlIChhcnIubGVuZ3RoICE9PSAwKSB7XG4gICAgICB2YXIgcGFydCA9IGFyci5wb3AoKVxuICAgICAgaWYgKHBhcnQubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwYXJ0WzBdLCBwYXJ0WzFdLCBwYXJ0WzNdKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFydFswXVtwYXJ0WzFdXSA9IHBhcnRbMl1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBzZXRSZXBsYWNlIChyZXBsYWNlLCB2YWwsIGssIHBhcmVudCkge1xuICB2YXIgcHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwYXJlbnQsIGspXG4gIGlmIChwcm9wZXJ0eURlc2NyaXB0b3IuZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAocHJvcGVydHlEZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHBhcmVudCwgaywgeyB2YWx1ZTogcmVwbGFjZSB9KVxuICAgICAgYXJyLnB1c2goW3BhcmVudCwgaywgdmFsLCBwcm9wZXJ0eURlc2NyaXB0b3JdKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXBsYWNlclN0YWNrLnB1c2goW3ZhbCwgaywgcmVwbGFjZV0pXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHBhcmVudFtrXSA9IHJlcGxhY2VcbiAgICBhcnIucHVzaChbcGFyZW50LCBrLCB2YWxdKVxuICB9XG59XG5cbmZ1bmN0aW9uIGRlY2lyYyAodmFsLCBrLCBlZGdlSW5kZXgsIHN0YWNrLCBwYXJlbnQsIGRlcHRoLCBvcHRpb25zKSB7XG4gIGRlcHRoICs9IDFcbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbCkge1xuICAgIGZvciAoaSA9IDA7IGkgPCBzdGFjay5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHN0YWNrW2ldID09PSB2YWwpIHtcbiAgICAgICAgc2V0UmVwbGFjZShDSVJDVUxBUl9SRVBMQUNFX05PREUsIHZhbCwgaywgcGFyZW50KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0eXBlb2Ygb3B0aW9ucy5kZXB0aExpbWl0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgZGVwdGggPiBvcHRpb25zLmRlcHRoTGltaXRcbiAgICApIHtcbiAgICAgIHNldFJlcGxhY2UoTElNSVRfUkVQTEFDRV9OT0RFLCB2YWwsIGssIHBhcmVudClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBvcHRpb25zLmVkZ2VzTGltaXQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICBlZGdlSW5kZXggKyAxID4gb3B0aW9ucy5lZGdlc0xpbWl0XG4gICAgKSB7XG4gICAgICBzZXRSZXBsYWNlKExJTUlUX1JFUExBQ0VfTk9ERSwgdmFsLCBrLCBwYXJlbnQpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzdGFjay5wdXNoKHZhbClcbiAgICAvLyBPcHRpbWl6ZSBmb3IgQXJyYXlzLiBCaWcgYXJyYXlzIGNvdWxkIGtpbGwgdGhlIHBlcmZvcm1hbmNlIG90aGVyd2lzZSFcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRlY2lyYyh2YWxbaV0sIGksIGksIHN0YWNrLCB2YWwsIGRlcHRoLCBvcHRpb25zKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbClcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldXG4gICAgICAgIGRlY2lyYyh2YWxba2V5XSwga2V5LCBpLCBzdGFjaywgdmFsLCBkZXB0aCwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG4gICAgc3RhY2sucG9wKClcbiAgfVxufVxuXG4vLyBTdGFibGUtc3RyaW5naWZ5XG5mdW5jdGlvbiBjb21wYXJlRnVuY3Rpb24gKGEsIGIpIHtcbiAgaWYgKGEgPCBiKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKGEgPiBiKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuICByZXR1cm4gMFxufVxuXG5mdW5jdGlvbiBkZXRlcm1pbmlzdGljU3RyaW5naWZ5IChvYmosIHJlcGxhY2VyLCBzcGFjZXIsIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAndW5kZWZpbmVkJykge1xuICAgIG9wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucygpXG4gIH1cblxuICB2YXIgdG1wID0gZGV0ZXJtaW5pc3RpY0RlY2lyYyhvYmosICcnLCAwLCBbXSwgdW5kZWZpbmVkLCAwLCBvcHRpb25zKSB8fCBvYmpcbiAgdmFyIHJlc1xuICB0cnkge1xuICAgIGlmIChyZXBsYWNlclN0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmVzID0gSlNPTi5zdHJpbmdpZnkodG1wLCByZXBsYWNlciwgc3BhY2VyKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXMgPSBKU09OLnN0cmluZ2lmeSh0bXAsIHJlcGxhY2VHZXR0ZXJWYWx1ZXMocmVwbGFjZXIpLCBzcGFjZXIpXG4gICAgfVxuICB9IGNhdGNoIChfKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KCdbdW5hYmxlIHRvIHNlcmlhbGl6ZSwgY2lyY3VsYXIgcmVmZXJlbmNlIGlzIHRvbyBjb21wbGV4IHRvIGFuYWx5emVdJylcbiAgfSBmaW5hbGx5IHtcbiAgICAvLyBFbnN1cmUgdGhhdCB3ZSByZXN0b3JlIHRoZSBvYmplY3QgYXMgaXQgd2FzLlxuICAgIHdoaWxlIChhcnIubGVuZ3RoICE9PSAwKSB7XG4gICAgICB2YXIgcGFydCA9IGFyci5wb3AoKVxuICAgICAgaWYgKHBhcnQubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwYXJ0WzBdLCBwYXJ0WzFdLCBwYXJ0WzNdKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFydFswXVtwYXJ0WzFdXSA9IHBhcnRbMl1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBkZXRlcm1pbmlzdGljRGVjaXJjICh2YWwsIGssIGVkZ2VJbmRleCwgc3RhY2ssIHBhcmVudCwgZGVwdGgsIG9wdGlvbnMpIHtcbiAgZGVwdGggKz0gMVxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsICE9PSBudWxsKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IHN0YWNrLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoc3RhY2tbaV0gPT09IHZhbCkge1xuICAgICAgICBzZXRSZXBsYWNlKENJUkNVTEFSX1JFUExBQ0VfTk9ERSwgdmFsLCBrLCBwYXJlbnQpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgICB0cnkge1xuICAgICAgaWYgKHR5cGVvZiB2YWwudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBvcHRpb25zLmRlcHRoTGltaXQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICBkZXB0aCA+IG9wdGlvbnMuZGVwdGhMaW1pdFxuICAgICkge1xuICAgICAgc2V0UmVwbGFjZShMSU1JVF9SRVBMQUNFX05PREUsIHZhbCwgaywgcGFyZW50KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdHlwZW9mIG9wdGlvbnMuZWRnZXNMaW1pdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIGVkZ2VJbmRleCArIDEgPiBvcHRpb25zLmVkZ2VzTGltaXRcbiAgICApIHtcbiAgICAgIHNldFJlcGxhY2UoTElNSVRfUkVQTEFDRV9OT0RFLCB2YWwsIGssIHBhcmVudClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHN0YWNrLnB1c2godmFsKVxuICAgIC8vIE9wdGltaXplIGZvciBBcnJheXMuIEJpZyBhcnJheXMgY291bGQga2lsbCB0aGUgcGVyZm9ybWFuY2Ugb3RoZXJ3aXNlIVxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGV0ZXJtaW5pc3RpY0RlY2lyYyh2YWxbaV0sIGksIGksIHN0YWNrLCB2YWwsIGRlcHRoLCBvcHRpb25zKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDcmVhdGUgYSB0ZW1wb3Jhcnkgb2JqZWN0IGluIHRoZSByZXF1aXJlZCB3YXlcbiAgICAgIHZhciB0bXAgPSB7fVxuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWwpLnNvcnQoY29tcGFyZUZ1bmN0aW9uKVxuICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgZGV0ZXJtaW5pc3RpY0RlY2lyYyh2YWxba2V5XSwga2V5LCBpLCBzdGFjaywgdmFsLCBkZXB0aCwgb3B0aW9ucylcbiAgICAgICAgdG1wW2tleV0gPSB2YWxba2V5XVxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBwYXJlbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGFyci5wdXNoKFtwYXJlbnQsIGssIHZhbF0pXG4gICAgICAgIHBhcmVudFtrXSA9IHRtcFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRtcFxuICAgICAgfVxuICAgIH1cbiAgICBzdGFjay5wb3AoKVxuICB9XG59XG5cbi8vIHdyYXBzIHJlcGxhY2VyIGZ1bmN0aW9uIHRvIGhhbmRsZSB2YWx1ZXMgd2UgY291bGRuJ3QgcmVwbGFjZVxuLy8gYW5kIG1hcmsgdGhlbSBhcyByZXBsYWNlZCB2YWx1ZVxuZnVuY3Rpb24gcmVwbGFjZUdldHRlclZhbHVlcyAocmVwbGFjZXIpIHtcbiAgcmVwbGFjZXIgPVxuICAgIHR5cGVvZiByZXBsYWNlciAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gcmVwbGFjZXJcbiAgICAgIDogZnVuY3Rpb24gKGssIHYpIHtcbiAgICAgICAgcmV0dXJuIHZcbiAgICAgIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIChrZXksIHZhbCkge1xuICAgIGlmIChyZXBsYWNlclN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVwbGFjZXJTdGFjay5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcGFydCA9IHJlcGxhY2VyU3RhY2tbaV1cbiAgICAgICAgaWYgKHBhcnRbMV0gPT09IGtleSAmJiBwYXJ0WzBdID09PSB2YWwpIHtcbiAgICAgICAgICB2YWwgPSBwYXJ0WzJdXG4gICAgICAgICAgcmVwbGFjZXJTdGFjay5zcGxpY2UoaSwgMSlcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsKVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/fast-safe-stringify/index.js\n");

/***/ })

};
;