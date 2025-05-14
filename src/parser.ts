// Core-lang Parser

export interface Node {
    type: string;
    value: string;
    children?: Node[];
}

/**
 * Core-lang Number Class
 */
export class Number {
    type: string;
    value: string;
    constructor(value: string) {
        this.type = 'Number';
        this.value = value;
    }

    stringer(this: any) {
        return this.value.toString();
    }

    hexer(this: any) {
        return this.value.toString(16);
    }

    base64(this: any) {
        return Buffer.from(this.value.toString()).toString('base64');
    }
}


/**
 * TODO FOR FLOATNUMBERS: Add (and fix) toFixed() |
 * Core-lang FloatNumber Class
 */
export class FloatNumber {
    type: string;
    value: string;
    constructor(value: string) {
        this.type = 'FloatNumber';
        this.value = value;
    }

    stringer(this: any) {
        return this.value.toString();
    }

    hexer(this: any) {
        return this.value.toString(16);
    }

    base64(this: any) {
        return Buffer.from(this.value.toString()).toString('base64');
    }
}

// Number test
//let num1 = new Number('123');
//console.log(num1.base64());

/**
 * Core-lang Operation Class
 */
export class Operation {
    rightHand: Node;
    leftHand: Node;
    operator: string;
    constructor(leftHand: Node, operator: string, rightHand: Node) {
        this.leftHand = leftHand;
        this.operator = operator;
        this.rightHand = rightHand;
    }

    result() {
        switch (this.operator) {
            case '+':
                return parseFloat(this.leftHand.value as string) + parseFloat(this.rightHand.value as string);
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

// Operation test
//let lhs: Node = new Number('10');
//let rhs: Node = new Number('20');
//let op = new Operation(lhs, '+', rhs);
//console.log(op.result()); // 30

/**
 * Core-lang String Class
 */
export class String {
    type: string;
    value: string;
    constructor(value: string) {
        this.type = 'String';
        this.value = value;
    }

    inter(this: any) {
        return this.value.parseInt();
    }

    floater(this: any) {
        return this.value.parseFloat();
    }

    hexer(this: any) {
        return this.value.toString(16);
    }

    base64(this: any) {
        return Buffer.from(this.value.toString()).toString('base64');
    }
}

// String test
//let str = new String('Hello, World!');
//console.log(str.base64()); // SGVsbG8sIFdvcmxkIQ==

/**
 * Core-lang Boolean Class
 */
export class Boolean {
    type: string;
    value: boolean;
    constructor(value: boolean) {
        this.type = 'Boolean';
        this.value = value;
    }

    base64(this: any) {
        return Buffer.from(this.value.toString()).toString('base64');
    }
}

// Boolean test
//let bool = new Boolean(true);
//console.log(bool.base64()); // dHJ1ZQ==

/**
 * Core-lang Null Class
 */
export class Null {
    type: string;
    value: null;

    constructor() {
        this.type = 'Null';
        this.value = null;
    }
}

// Null test
//let nullValue = new Null();
//console.log(nullValue.value); // null

/**
 * Core-lang Array Class
 */
export class Array {
    type: string;
    value: any[];
    constructor(value: any[]) {
        this.type = 'Array';
        this.value = value;
    }

    base64buffer(this: any) {
        return Buffer.from(this.value.toString()).toString('base64');
    }

    stringer(this: any) {
        return this.value.join(',');
    }
}

// Array test
//let arr = new Array([1, 2, 3]);
//console.log(arr.value); // [1, 2, 3]
//console.log(arr.stringer()); // 1,2,3
//console.log(arr.base64buffer()); // MSwyLDM=

/**
 * Core-lang Object Class
 */
export class CoreObject {
    type: string;
    value: { [key: string]: any };
    constructor(value: { [key: string]: any }) {
        this.type = 'Object';
        this.value = value;
    }

    base64buffer(this: any) {
        return Buffer.from(JSON.stringify(this.value)).toString('base64');
    }

    stringer(this: any) {
        return JSON.stringify(this.value);
    }
}

// CoreObject test
//let obj = new CoreObject({ name: 'John', age: 30 });
//console.log(obj.value); // { name: 'John', age: 30 }
//console.log(obj.stringer()); // {"name":"John","age":30}
//console.log(obj.base64buffer()); // eyJuYW1lIjoiSm9obiIsImFnZSI6MzB9

/** 
 * Core-lang Buffer Class
 * This class is used to represent binary data in the form of a Buffer.
 */
export class CoreBuffer {
    

    type: string;
    value: Buffer;
    constructor(value: Buffer) {
        this.type = 'Buffer';
        this.value = value;
    }

    base64buffer(this: any) {
        return this.value.toString('base64');
    }

    hexer(this: any) {
        return this.value.toString('hex');
    }
}

/**
 * Core-lang Parser Class
 */
export class Parser {
    tokens: any[];
    current: number;

    constructor(tokens: any[]) {
        this.tokens = tokens;
        this.current = 0;
    }

    parse() {
        const nodes: Node[] = [];
        while (this.current < this.tokens.length) {
            nodes.push(this.parseStatement());
        }
        return nodes;
    }

    parseStatement(): Node {
        const token = this.tokens[this.current];
        if (token.type === 'Number') {
            this.current++;
            return new Number(token.value);
        } else if (token.type === 'String') {
            this.current++;
            return new String(token.value);
        } else if (token.type === 'Boolean') {
            this.current++;
            return {
                type: 'Boolean',
                value: token.value.toString()
            };
        } else if (token.type === 'Null') {
            this.current++;
            return {
                type: 'Null',
                value: 'null'
            };
        } else if (token.type === 'Array') {
            this.current++;
            return {
                type: 'Array',
                value: JSON.stringify(token.value)
            };
        } else if (token.type === 'Object') {
            this.current++;
            return {
                type: 'Object',
                value: JSON.stringify(token.value),
                children: []
            };
        } else if (token.type === 'Buffer') {
            this.current++;
            return {
                type: 'Buffer',
                value: Buffer.from(token.value).toString('base64')
            };
        } else if (token.type === 'Identifier') {
            this.current++;
            return {
                type: 'Identifier',
                value: token.value
            };
        } else if (token.type === 'Operation') {
            const leftHand = this.parseStatement();
            const operator = token.value;
            const rightHand = this.parseStatement();
            return {
                type: 'Operation',
                value: operator,
                children: [leftHand, rightHand]
            };
        } else if (token.type === "OpenParen") {
            this.current++;
            return {
                type: "OpenParen",
                value: "(",
                children: []
            };
        } else if (token.type === "CloseParen") {
            this.current++;
            return {
                type: "CloseParen",
                value: ")",
                children: []
            };
        } else if (token.type === "OpenBrace") {
            this.current++;
            return {
                type: "OpenBrace",
                value: "{",
                children: []
            };
        } else if (token.type === "CloseBrace") {
            this.current++;
            return {
                type: "CloseBrace",
                value: "}",
                children: []
            };
        } else if (token.type === "OpenBracket") {
            this.current++;
            return {
                type: "OpenBracket",
                value: "[",
                children: []
            };
        } else if (token.type === "CloseBracket") {
            this.current++;
            return {
                type: "CloseBracket",
                value: "]",
                children: []
            };
        } else if (token.type === "Comma") {
            this.current++;
            return {
                type: "Comma",
                value: ",",
                children: []
            };
        } else if (token.type === "Semicolon") {
            this.current++;
            return {
                type: "Semicolon",
                value: ";",
                children: []
            };
        } else if (token.type === "Colon") {
            this.current++;
            return {
                type: "Colon",
                value: ":",
                children: []
            };
        } else if (token.type === "Assignment") {
            this.current++;
            return {
                type: "Assignment",
                value: "=",
                children: []
            };
        } else if (token.type === "Plus") {
            this.current++;
            return {
                type: "Plus",
                value: "+",
                children: []
            };
        } else if (token.type === "Minus") {
            this.current++;
            return {
                type: "Minus",
                value: "-",
                children: []
            };
        } else if (token.type === "Multiply") {
            this.current++;
            return {
                type: "Multiply",
                value: "*",
                children: []
            };
        } else if (token.type === "Divide") {
            this.current++;
            return {
                type: "Divide",
                value: "/",
                children: []
            };
        } else if (token.type === "Modulus") {
            this.current++;
            return {
                type: "Modulus",
                value: "%",
                children: []
            };
        } else if (token.type === "Whitespace") {
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

// Parser test
let lexer = require('./lexer');
let tokens = lexer.tokenize("function test() { return 1 + 2, \"Hello World!\"; }");
let parser = new Parser(tokens);
let ast = parser.parse();
console.log(JSON.stringify(ast, null, 2));