import React from 'react';

const generateUniqueKey = () => {
    return Math.random().toString(36).substr(2, 9);
};

const formatNumber = (number) => {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const replaceSymbols = (inputString) => {
    const replacements = {
        '*': <span className="styled-symbols" key={generateUniqueKey()}>x</span>,
        '/': <span className="styled-symbols" key={generateUniqueKey()}>÷</span>,
        '+': <span className="styled-symbols" key={generateUniqueKey()}>+</span>,
        '-': <span className="styled-symbols" key={generateUniqueKey()}>-</span>
    };

    return inputString.split('').map((char) =>
        replacements[char] ? replacements[char] : <span key={generateUniqueKey()}>{char}</span>
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
