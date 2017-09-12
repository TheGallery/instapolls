function hasUniqueOptions (options) {
  const lowerCaseOpts = options.map(opt => opt.toLowerCase());

  return (new Set(lowerCaseOpts)).size === lowerCaseOpts.length;
}

export function validateName (name, submit = false) {
  const nameRegex = new RegExp(/^[A-Za-z0-9\s'?]*$/);
  let status = {
    valid: false,
    error: ''
  };

  // Just check for a non-empty field when submitting
  // the rest of the checks are performed on fly
  if (submit) {
    if (name.length) {
      status.valid = true;
    } else {
      status.error = 'Poll name can not be empty';
    }

    return status;
  }

  if (nameRegex.test(name)) {
    status.valid = true;
  } else {
    status.error = `Names can only contain alphanumeric characters, spaces, single quotes (') and questionmarks.`;
  }

  return status;
}

export function validateOptions (options, submit = false) {
  const optionsRegex = new RegExp(/^[A-Za-z0-9\n]*$/);
  let status = {
    valid: false,
    error: ''
  };

  if (typeof options === 'string') {
    options = options.split('\n');
  }

  // Just check if there are at least two poll options and that they are unique
  // when submitting, the rest of the checks are performed on fly
  if (submit) {
    if (options.length >= 2 && options.every(opt => opt.length)) {
      if (hasUniqueOptions(options)) {
        status.valid = true;
      } else {
        status.error = 'Each option must be unique.';
      }
    } else {
      status.error = 'You need to provide at least two poll options.';
    }

    return status;
  }

  if (options.every(opt => optionsRegex.test(opt))) {
    status.valid = true;
  } else {
    status.error = 'Poll options can only contain alphanumeric characters.';
  }

  return status;
}

export function validatePoll (name, options) {
  const nameStatus = validateName(name, true);
  const optionsStatus = validateOptions(options, true);
  let status = {
    valid: false,
    error: []
  };

  if (nameStatus.valid && optionsStatus.valid) {
    status.valid = true;
  } else {
    if (!nameStatus.valid) {
      status.error = [nameStatus.error];
    }
    if (!optionsStatus.valid) {
      status.error = [...status.error, optionsStatus.error];
    }
  }

  return status;
}
