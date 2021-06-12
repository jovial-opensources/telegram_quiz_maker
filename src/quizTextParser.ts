const VALID_OPERATORS = [
    "Q", "q",   // Question text
    "W", "w",   // Wrong option
    "C", "c"    // Correct option
]
const parseLineOperator = (line: string) => {
    const words = line.split(' ')
    const operator = words.shift() as string
    const operatorIsValid = VALID_OPERATORS.includes(operator) ? true : false
    const text = operatorIsValid
        ? words.join(' ')
        : [operator].concat(words).join(' ')
    return {
        operator: operatorIsValid ? operator : undefined,
        text
    }
}

export default (text: string) => {
    /**
     * - remove extra \n's
     * - split text and get line
     */
    const lines: string[] = text
        .replace(/\n\n*/g, '\n')
        .split('\n')
        .map(line => line.replace(/^\s*/, ''))

    // parse line operator
    const parsedLines = lines.map(line => parseLineOperator(line))

    // filter out question text from Parsed Lines
    const questionLines = parsedLines.filter(
        ({ operator }) => (
            ['Q', 'q'].includes(operator as string)
        )
    )
    if (questionLines.length < 1) throw Error("Question not found")
    const questionText = questionLines[0].text

    // filter out all options from Parsed Lines
    var correctOptionIndex = -1
    const parsedOptions = parsedLines.filter(
        ({ operator }) => (
            ['W', 'w', 'C', 'c'].includes(operator as string)
        )
    )
    parsedOptions.forEach(
        ({ operator }, i) => {
            if(['C', 'c'].includes(operator as string))
            correctOptionIndex = i
        }
    )
    if ((correctOptionIndex < 0) || (correctOptionIndex > parsedOptions.length))
        throw Error("Correct option absent")

    const optionTexts = parsedOptions.map(({ text }) => text)
    return {
        questionText,
        optionTexts,
        correctOptionIndex
    }
}