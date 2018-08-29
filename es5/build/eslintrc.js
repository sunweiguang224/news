"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  "root": true,
  "extends": "eslint:all",
  // "extends": "eslint:recommended",
  // "extends": "Airbnb",
  // "parserOptions": {
  //   "ecmaVersion": 7,
  //   "sourceType": "module",
  //   "ecmaFeatures": {
  //     "jsx": true
  //   }
  // },
  // "parser": "babel-eslint",
  "rules": {
    // 缩进
    "indent": ["error", 2],
    // 不限制单行长度
    "max-len": ["error", {
      "code": 999
    }],
    // 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的，）
    "semi": ["error", "always"],
    // 数组和对象键值对最后一个逗号，
    // never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，always-multiline：多行模式必须带逗号，单行模式不能带逗号
    "comma-dangle": ["warn", "always-multiline"],
    // 禁止不必要的括号如(a * b) + c;
    "no-extra-parens": "warn",
    // 禁止不必要的分号
    "no-extra-semi": "warn",
    // 禁止在return、throw、continue 和 break语句之后出现不可达代码
    /*
     function foo() {
     return true;
     console.log("done");
     }//错误
     */
    "no-unreachable": "warn",
    // 禁止出现未使用过的变量
    "no-unused-vars": ["warn", {
      "vars": "all",
      "args": "none"
    }],
    // 指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
    "array-bracket-spacing": ["warn", "never"],
    // 强制使用一致的换行风格
    "linebreak-style": ["warn", "unix"],
    // 要求构造函数首字母大写  （要求调用 new 操作符时有首字母大小的函数，允许调用首字母大写的函数时没有 new 操作符。）
    "new-cap": ["warn", {
      "newIsCap": true,
      "capIsNew": false
    }],
    // 禁止使用 Array 构造函数
    "no-array-constructor": "warn",
    // 禁止 if 作为唯一的语句出现在 else 语句中
    "no-lonely-if": 0,
    // 不允许空格和 tab 混合缩进
    "no-mixed-spaces-and-tabs": 1
  }
};