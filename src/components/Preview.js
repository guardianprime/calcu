import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const generateUniqueKey = () => {
    return uuidv4();
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

    return inputString.split('').map((char, index) =>
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
    const contentWithSymbols = replaceSymbols(formattedString).map((element, index) => {
        // Assign a unique key to each element
        const key = generateUniqueKey();
        return React.cloneElement(element, { key });
    });

    return (
        <div className="preview">
            {contentWithSymbols}
        </div>
    );
};

export default Preview;

/* 

// ... (rest of your code)

const Preview = ({ preview }) => {
  // Format numbers first
  const formattedString = formatContent(preview);

  // Then, replace symbols
  const contentWithSymbols = replaceSymbols(formattedString).map((element, index) => {
    // Assign a unique key to each element
    const key = generateUniqueKey();
    return React.cloneElement(element, { key });
  });

  return (
    <div className="preview">
      {contentWithSymbols}
    </div>
  );
}; */