"use strict";
// Core-lang Parser
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = exports.CoreBuffer = exports.CoreObject = exports.Array = exports.Null = exports.Boolean = exports.String = exports.Operation = exports.FloatNumber = exports.Number = void 0;
/**
 * Core-lang Number Class
 */
class Number {
    constructor(value) {
        this.type = 'Number';
        this.value = value;
    }
    stringer() {
        return this.value.toString();
    }
    hexer() {
        return this.value.toString(16);
    }
    base64() {
        return Buffer.from(this.value.toString()).toString('base64');
    }
}
exports.Number = Number;
/**
 * TODO FOR FLOATNUMBERS: Add (and fix) toFixed() |
 * Core-lang FloatNumber Class
 */
class FloatNumber {
    constructor(value) {
        this.type = 'FloatNumber';
        this.value = value;
    }
    stringer() {
        return this.value.toString();
    }
    hexer() {
        return this.value.toString(16);
    }
    base64() {
        return Buffer.from(this.value.toString()).toString('base64');
    }
}
exports.FloatNumber = FloatNumber;
// Number test
//let num1 = new Number('123');
//console.log(num1.base64());
/**
 * Core-lang Operation Class
 */
class Operation {
    constructor(leftHand, operator, rightHand) {
        this.leftHand = leftHand;
        this.operator = operator;
        this.rightHand = rightHand;
    }
    result() {
        switch (this.operator) {
            case '+':
                return parseFloat(this.leftHand.value) + parseFloat(this.rightHand.value);
            case '-':
                return parseFloat(this.leftHand.value) - parseFloat(this.rightHand.value);
            case '*':
                return parseFloat(this.leftHand.value) * parseFloat(this.rightHand.value);
            case '/':
                return parseFloat(this.leftHand.value) / parseFloat(this.rightHand.value);
            case '%':
                return parseFloat(this.leftHand.value) % parseFloat(this.rightHand.value);
            default:
                throw new Error(`Unknown operator: ${this.operator}`);
        }
    }
}
exports.Operation = Operation;
// Operation test
//let lhs: Node = new Number('10');
//let rhs: Node = new Number('20');
//let op = new Operation(lhs, '+', rhs);
//console.log(op.result()); // 30
/**
 * Core-lang String Class
 */
class String {
    constructor(value) {
        this.type = 'String';
        this.value = value;
    }
    inter() {
        return this.value.parseInt();
    }
    floater() {
        return this.value.parseFloat();
    }
    hexer() {
        return this.value.toString(16);
    }
    base64() {
        return Buffer.from(this.value.toString()).toString('base64');
    }
}
exports.String = String;
// String test
//let str = new String('Hello, World!');
//console.log(str.base64()); // SGVsbG8sIFdvcmxkIQ==
/**
 * Core-lang Boolean Class
 */
class Boolean {
    constructor(value) {
        this.type = 'Boolean';
        this.value = value;
    }
    base64() {
        return Buffer.from(this.value.toString()).toString('base64');
    }
}
exports.Boolean = Boolean;
// Boolean test
//let bool = new Boolean(true);
//console.log(bool.base64()); // dHJ1ZQ==
/**
 * Core-lang Null Class
 */
class Null {
    constructor() {
        this.type = 'Null';
        this.value = null;
    }
}
exports.Null = Null;
// Null test
//let nullValue = new Null();
//console.log(nullValue.value); // null
/**
 * Core-lang Array Class
 */
class Array {
    constructor(value) {
        this.type = 'Array';
        this.value = value;
    }
    base64buffer() {
        return Buffer.from(this.value.toString()).toString('base64');
    }
    stringer() {
        return this.value.join(',');
    }
}
exports.Array = Array;
// Array test
//let arr = new Array([1, 2, 3]);
//console.log(arr.value); // [1, 2, 3]
//console.log(arr.stringer()); // 1,2,3
//console.log(arr.base64buffer()); // MSwyLDM=
/**
 * Core-lang Object Class
 */
class CoreObject {
    constructor(value) {
        this.type = 'Object';
        this.value = value;
    }
    base64buffer() {
        return Buffer.from(JSON.stringify(this.value)).toString('base64');
    }
    stringer() {
        return JSON.stringify(this.value);
    }
}
exports.CoreObject = CoreObject;
// CoreObject test
//let obj = new CoreObject({ name: 'John', age: 30 });
//console.log(obj.value); // { name: 'John', age: 30 }
//console.log(obj.stringer()); // {"name":"John","age":30}
//console.log(obj.base64buffer()); // eyJuYW1lIjoiSm9obiIsImFnZSI6MzB9
/**
 * Core-lang Buffer Class
 * This class is used to represent binary data in the form of a Buffer.
 */
class CoreBuffer {
    constructor(value) {
        this.type = 'Buffer';
        this.value = value;
    }
    base64buffer() {
        return this.value.toString('base64');
    }
    hexer() {
        return this.value.toString('hex');
    }
}
exports.CoreBuffer = CoreBuffer;
/**
 * Core-lang Parser Class
 */
class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.current = 0;
    }
    parse() {
        const nodes = [];
        while (this.current < this.tokens.length) {
            nodes.push(this.parseStatement());
        }
        return nodes;
    }
    parseStatement() {
        const token = this.tokens[this.current];
        if (token.type === 'Number') {
            this.current++;
            return new Number(token.value);
        }
        else if (token.type === 'String') {
            this.current++;
            return new String(token.value);
        }
        else if (token.type === 'Boolean') {
            this.current++;
            return {
                type: 'Boolean',
                value: token.value.toString()
            };
        }
        else if (token.type === 'Null') {
            this.current++;
            return {
                type: 'Null',
                value: 'null'
            };
        }
        else if (token.type === 'Array') {
            this.current++;
            return {
                type: 'Array',
                value: JSON.stringify(token.value)
            };
        }
        else if (token.type === 'Object') {
            this.current++;
            return {
                type: 'Object',
                value: JSON.stringify(token.value),
                children: []
            };
        }
        else if (token.type === 'Buffer') {
            this.current++;
            return {
                type: 'Buffer',
                value: Buffer.from(token.value).toString('base64')
            };
        }
        else if (token.type === 'Identifier') {
            this.current++;
            return {
                type: 'Identifier',
                value: token.value
            };
        }
        else if (token.type === 'Operation') {
            const leftHand = this.parseStatement();
            const operator = token.value;
            const rightHand = this.parseStatement();
            return {
                type: 'Operation',
                value: operator,
                children: [leftHand, rightHand]
            };
        }
        else if (token.type === "OpenParen") {
            this.current++;
            return {
                type: "OpenParen",
                value: "(",
                children: []
            };
        }
        else if (token.type === "CloseParen") {
            this.current++;
            return {
                type: "CloseParen",
                value: ")",
                children: []
            };
        }
        else if (token.type === "OpenBrace") {
            this.current++;
            return {
                type: "OpenBrace",
                value: "{",
                children: []
            };
        }
        else if (token.type === "CloseBrace") {
            this.current++;
            return {
                type: "CloseBrace",
                value: "}",
                children: []
            };
        }
        else if (token.type === "OpenBracket") {
            this.current++;
            return {
                type: "OpenBracket",
                value: "[",
                children: []
            };
        }
        else if (token.type === "CloseBracket") {
            this.current++;
            return {
                type: "CloseBracket",
                value: "]",
                children: []
            };
        }
        else if (token.type === "Comma") {
            this.current++;
            return {
                type: "Comma",
                value: ",",
                children: []
            };
        }
        else if (token.type === "Semicolon") {
            this.current++;
            return {
                type: "Semicolon",
                value: ";",
                children: []
            };
        }
        else if (token.type === "Colon") {
            this.current++;
            return {
                type: "Colon",
                value: ":",
                children: []
            };
        }
        else if (token.type === "Assignment") {
            this.current++;
            return {
                type: "Assignment",
                value: "=",
                children: []
            };
        }
        else if (token.type === "Plus") {
            this.current++;
            return {
                type: "Plus",
                value: "+",
                children: []
            };
        }
        else if (token.type === "Minus") {
            this.current++;
            return {
                type: "Minus",
                value: "-",
                children: []
            };
        }
        else if (token.type === "Multiply") {
            this.current++;
            return {
                type: "Multiply",
                value: "*",
                children: []
            };
        }
        else if (token.type === "Divide") {
            this.current++;
            return {
                type: "Divide",
                value: "/",
                children: []
            };
        }
        else if (token.type === "Modulus") {
            this.current++;
            return {
                type: "Modulus",
                value: "%",
                children: []
            };
        }
        else if (token.type === "Whitespace") {
            this.current++;
            return {
                type: "Whitespace",
                value: token.value,
                children: []
            };
        }
        throw new Error(`Unknown token type: ${token.type}`);
    }
}
exports.Parser = Parser;
// Parser test
let lexer = require('./lexer');
let tokens = lexer.tokenize("function test() { return 1 + 2, \"Hello World!\"; }");
let parser = new Parser(tokens);
let ast = parser.parse();
console.log(JSON.stringify(ast, null, 2));
