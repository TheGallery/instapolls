/*
*  These are stripped down validation functions. They don't care
*  about what the error is, they only check if the data is valid
*  and we return a general error in the client.
*/

function validateName (name) {
  const nameRegex = new RegExp(/^[A-Za-z0-9\s'?]+$/);

  if (nameRegex.test(name)) {
    return true;
  }

  return false;
}

function validateOptions (options) {
  const optionsRegex = new RegExp(/^[A-Za-z0-9\n]+$/);

  return options.every(opt => optionsRegex.test(opt));
}

exports.validatePoll = function (data) {
  const nameValid = validateName(data.name);
  const optionsValid = validateOptions(data.options);

  if (nameValid && optionsValid) {
    return true;
  }

  return false;
};
