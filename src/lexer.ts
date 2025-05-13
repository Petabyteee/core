import e from "cors";

export enum TokenType {
    Number = 'Number',
    FloatNumber = 'FloatNumber',
    String = 'String',
    Identifier = 'Identifier',
    Keyword = 'Keyword',
    Operator = 'Operator',
    //Punctuation = 'Punctuation',
    OpenParen = 'OpenParen',
    CloseParen = 'CloseParen',
    OpenBrace = 'OpenBrace',
    CloseBrace = 'CloseBrace',
    OpenBracket = 'OpenBracket',
    CloseBracket = 'CloseBracket',
    Comma = 'Comma',
    Semicolon = 'Semicolon',
    Colon = 'Colon',
    Assignment = 'Assignment',
    Plus = 'Plus',
    Minus = 'Minus',
    Multiply = 'Multiply',
    Divide = 'Divide',
    Modulus = 'Modulus',    
    Comment = 'Comment',
    Whitespace = 'Whitespace',

}

export interface Token {
    type: string;
    value: string;
}

function isNumber(value: string): boolean {
    return /^\d+$/.test(value);
}

function isAlpha(value: string): boolean {
    return /^[a-zA-Z]+$/.test(value);
}

export function tokenize(sourceCode: string) {
    const tokens = new Array<Token>();
    const src = sourceCode.split("");

    while (src.length > 0) {

        if (src[0] === "(") {
            tokens.push(token(src.shift()!, TokenType.OpenParen));
        } else if (src[0] === ")") {
            tokens.push(token(src.shift()!, TokenType.CloseParen));
        } else if (src[0] === "{") {
            tokens.push(token(src.shift()!, TokenType.OpenBrace));
        } else if (src[0] === "}") {
            tokens.push(token(src.shift()!, TokenType.CloseBrace));
        } else if (src[0] === "[") {
            tokens.push(token(src.shift()!, TokenType.OpenBracket));
        } else if (src[0] === "]") {
            tokens.push(token(src.shift()!, TokenType.CloseBracket));
        } else if (src[0] === ",") {
            tokens.push(token(src.shift()!, TokenType.Comma));
        } else if (src[0] === ";") {
            tokens.push(token(src.shift()!, TokenType.Semicolon));
        } else if (src[0] === ":") {
            tokens.push(token(src.shift()!, TokenType.Colon));
        } else if (src[0] === "=") {
            tokens.push(token(src.shift()!, TokenType.Assignment));
        } else if (src[0] === "+") {
            tokens.push(token(src.shift()!, TokenType.Plus));
        } else if (src[0] === "-") {
            tokens.push(token(src.shift()!, TokenType.Minus));
        } else if (src[0] === "*") {
            tokens.push(token(src.shift()!, TokenType.Multiply));
        } else if (src[0] === "/") {    
            tokens.push(token(src.shift()!, TokenType.Divide));
        } else if (src[0] === "%") {
            tokens.push(token(src.shift()!, TokenType.Modulus));
        } else if (src[0] === " ") {
            src.shift();
        } else if (src[0] === "\n") {
            src.shift();
        } else if (src[0] === "\t") {
            src.shift();
        } else if (isAlpha(src[0])) {
            let identifier = "";
            while (src.length > 0 && (isAlpha(src[0]) || isNumber(src[0]))) {
                identifier += src.shift();
            }
            tokens.push(token(identifier, TokenType.Identifier));
        } else if (isNumber(src[0])) {
            let number = "";
            while (src.length > 0 && isNumber(src[0])) {
                number += src.shift();
            }
            tokens.push(token(number, TokenType.Number));
        }

    }

    return tokens;
}

function token (value: string, type: TokenType): Token {
    return { value, type };
}

console.log(tokenize("let a = 5; let b = 10; let c = a + b;"));