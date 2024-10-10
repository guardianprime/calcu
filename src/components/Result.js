
function Result({ result }) {
    const formatNumber = (number) => {
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const formatBeforeDecimal = (inputString) => {
        const [integerPart, decimalPart] = inputString.split('.');
        const formattedInteger = formatNumber(integerPart);
        return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    };

    const inputString = String(result);
    const formattedString = formatBeforeDecimal(inputString);

    console.log(formattedString);
    return (
        <div className="result">{formattedString}</div>
    );
}

export default Result;

