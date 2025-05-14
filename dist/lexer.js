"use strict";
//  Core-lang Lexer
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenType = void 0;
exports.tokenize = tokenize;
var TokenType;
(function (TokenType) {
    TokenType["Number"] = "Number";
    //FloatNumber = 'FloatNumber',
    TokenType["String"] = "String";
    TokenType["Identifier"] = "Identifier";
    TokenType["Keyword"] = "Keyword";
    TokenType["Operator"] = "Operator";
    //Punctuation = 'Punctuation',
    TokenType["OpenParen"] = "OpenParen";
    TokenType["CloseParen"] = "CloseParen";
    TokenType["OpenBrace"] = "OpenBrace";
    TokenType["CloseBrace"] = "CloseBrace";
    TokenType["OpenBracket"] = "OpenBracket";
    TokenType["CloseBracket"] = "CloseBracket";
    TokenType["Comma"] = "Comma";
    TokenType["Semicolon"] = "Semicolon";
    TokenType["Colon"] = "Colon";
    TokenType["Assignment"] = "Assignment";
    TokenType["Plus"] = "Plus";
    TokenType["Minus"] = "Minus";
    TokenType["Multiply"] = "Multiply";
    TokenType["Divide"] = "Divide";
    TokenType["Modulus"] = "Modulus";
    TokenType["Comment"] = "Comment";
    TokenType["Whitespace"] = "Whitespace";
})(TokenType || (exports.TokenType = TokenType = {}));
function isNumber(value) {
    return /^\d+$/.test(value);
}
function isAlpha(value) {
    return /^[a-zA-Z]+$/.test(value);
}
function tokenize(sourceCode) {
    const tokens = new Array();
    const src = sourceCode.split("");
    while (src.length > 0) {
        if (src[0] === "(") {
            tokens.push(token(src.shift(), TokenType.OpenParen));
        }
        else if (src[0] === ")") {
            tokens.push(token(src.shift(), TokenType.CloseParen));
        }
        else if (src[0] === "{") {
            tokens.push(token(src.shift(), TokenType.OpenBrace));
        }
        else if (src[0] === "}") {
            tokens.push(token(src.shift(), TokenType.CloseBrace));
        }
        else if (src[0] === "[") {
            tokens.push(token(src.shift(), TokenType.OpenBracket));
        }
        else if (src[0] === "]") {
            tokens.push(token(src.shift(), TokenType.CloseBracket));
        }
        else if (src[0] === ",") {
            tokens.push(token(src.shift(), TokenType.Comma));
        }
        else if (src[0] === ";") {
            tokens.push(token(src.shift(), TokenType.Semicolon));
        }
        else if (src[0] === ":") {
            tokens.push(token(src.shift(), TokenType.Colon));
        }
        else if (src[0] === "=") {
            tokens.push(token(src.shift(), TokenType.Assignment));
        }
        else if (src[0] === "+") {
            tokens.push(token(src.shift(), TokenType.Plus));
        }
        else if (src[0] === "-") {
            tokens.push(token(src.shift(), TokenType.Minus));
        }
        else if (src[0] === "*") {
            tokens.push(token(src.shift(), TokenType.Multiply));
        }
        else if (src[0] === "/") {
            tokens.push(token(src.shift(), TokenType.Divide));
        }
        else if (src[0] === "%") {
            tokens.push(token(src.shift(), TokenType.Modulus));
        }
        else if (src[0] === " ") {
            src.shift();
        }
        else if (src[0] === "\n") {
            src.shift();
        }
        else if (src[0] === "\t") {
            src.shift();
        }
        else if (isAlpha(src[0])) {
            let identifier = "";
            while (src.length > 0 && (isAlpha(src[0]) || isNumber(src[0]))) {
                identifier += src.shift();
            }
            tokens.push(token(identifier, TokenType.Identifier));
        }
        else if (isNumber(src[0])) {
            let number = "";
            while (src.length > 0 && isNumber(src[0])) {
                number += src.shift();
            }
            tokens.push(token(number, TokenType.Number));
        }
        else if (src[0] === "\"") {
            src.shift();
            let string = "";
            while (src.length > 0 && src[0] !== "\"") {
                string += src.shift();
            }
            src.shift(); // remove closing "
            tokens.push(token(string, TokenType.String));
        }
        else if (src[0] === "'") {
            src.shift();
            let string = "";
            while (src.length > 0 && src[0] !== "'") {
                string += src.shift();
            }
            src.shift(); // remove closing '
            tokens.push(token(string, TokenType.String));
        }
    }
    return tokens;
}
function token(value, type) {
    return { value, type };
}
console.log(tokenize("function test() { return 1 + 2, \"Hello World!\"; }"));
