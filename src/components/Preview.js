import { React } from "react";

const formatNumber = (number) => {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const replaceSymbols = (inputString) => {
    const replacements = {
        '*': <span className="styled-symbols" key={Date.now()}>x</span>,
        '/': <span className="styled-symbols" key={Date.now()}>÷</span>,
        '+': <span className="styled-symbols" key={Date.now()}>+</span>,
        '-': <span className="styled-symbols" key={Date.now()}>-</span>
    };

    return inputString.split('').map((char, index) =>
        replacements[char] ? replacements[char] : <span key={index}>{char}</span>
    );
};

const formatContent = (inputString) => {
    return inputString.replace(/\d+(\.\d+)?/g, (match) => {
        if (match.length > 15) {
            alert(`Number exceeds 15 digits: ${match}`);
        }
        if (match.includes('.')) {
            const [integerPart, decimalPart] = match.split('.');
            return `${formatNumber(integerPart)}.${decimalPart}`;
        }
        return formatNumber(match);
    });
};

const Preview = ({ preview }) => {
    // Format numbers first
    const formattedString = formatContent(preview);

    // Then, replace symbols
    const contentWithSymbols = replaceSymbols(formattedString);

    return (
        <div className="preview">
            {contentWithSymbols}
        </div>
    );
};


export default Preview;