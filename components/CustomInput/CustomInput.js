// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @mui/material components
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

import styles from '@/styles/jss/material-kit-react/components/customInputStyle.js';

const StyledFormControl = styled(FormControl)(({ _theme }) => ({
  ...styles.formControl,
}));

const StyledInputLabel = styled(InputLabel)(({ _theme }) => ({
  ...styles.labelRoot,
  '&.labelRootError': styles.labelRootError,
  '&.labelRootSuccess': styles.labelRootSuccess,
}));

const StyledInput = styled(Input)(({ _theme }) => ({
  ...styles.input,
  '&.error': styles.error,
  '&.success': styles.success,
  '&.white': {
    '&,&::placeholder': {
      color: '#FFFFFF',
      opacity: '1',
    },
  },
}));

export default function CustomInput(props) {
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
  } = props;

  const labelClasses = classNames({
    labelRootError: error,
    labelRootSuccess: success && !error,
  });

  const underlineClasses = classNames({
    error: error,
    success: success && !error,
    white: white,
  });

  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined,
  });

  return (
    <StyledFormControl {...formControlProps}>
      {labelText !== undefined ? (
        <StyledInputLabel className={labelClasses} htmlFor={id} {...labelProps}>
          {labelText}
        </StyledInputLabel>
      ) : null}
      <StyledInput
        id={id}
        className={underlineClasses}
        classes={{
          root: marginTop,
        }}
        {...inputProps}
      />
    </StyledFormControl>
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
};
