const submitButton = document.querySelector('button');
const inputList = document.querySelectorAll('input, textarea')
const form = document.querySelector('form')
submitButton.onclick = (event) => validateForm(event)
window.onbeforeunload = () => form.reset()
inputList.forEach(input =>
    input.oninput = () => clearError(input, input.validity))
function validateForm(event) {
    event.preventDefault()
    const validInputs = new Set()
    checkError('valueMissing', 'is required', ...inputList)
    checkError('typeMismatch', 'is invalid', ...inputList)
    inputList.forEach(input => validInputs.add(input.validity.valid))
    if (validInputs.has(true) && Array.from(validInputs).length === 1) {
        document.querySelector('form').submit()
    }
}
function checkError(errCheck, errMsg, ...inputs) {
    inputs.forEach(input => {
        if (input.validity[errCheck]) {
            input.previousElementSibling.innerHTML = `${input.name} ${errMsg}`
        }
    })
}
function clearError(input) {
    if (input.validity.valid) input.previousElementSibling.innerHTML = ''
}
