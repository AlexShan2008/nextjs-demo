// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @mui/material components
import { styled } from '@mui/material/styles';

import styles from '@/styles/jss/material-kit-react/components/infoStyle.js';

const StyledDiv = styled('div')(({ theme }) => ({
  ...styles.infoArea,
  '& .iconWrapper': {
    ...styles.iconWrapper,
    '&.grayColor': {
      backgroundColor: theme.palette.grey[700],
    },
    '&.primaryColor': {
      backgroundColor: theme.palette.primary.main,
    },
    '&.infoColor': {
      backgroundColor: theme.palette.info.main,
    },
    '&.successColor': {
      backgroundColor: theme.palette.success.main,
    },
    '&.warningColor': {
      backgroundColor: theme.palette.warning.main,
    },
    '&.dangerColor': {
      backgroundColor: theme.palette.error.main,
    },
    '&.roseColor': {
      backgroundColor: theme.palette.rose.main,
    },
  },
  '& .descriptionWrapper': styles.descriptionWrapper,
  '& .title': styles.title,
  '& .description': styles.description,
  '& .icon': styles.icon,
}));

export default function InfoArea(props) {
  const { title, description, iconColor, vertical } = props;
  return (
    <StyledDiv className={vertical ? 'vertical' : ''}>
      <div className={`iconWrapper ${iconColor}`}>
        {typeof props.icon === 'string' ? <props.icon className="icon" /> : <props.icon />}
      </div>
      <div className="descriptionWrapper">
        <h4 className="title">{title}</h4>
        <p className="description">{description}</p>
      </div>
    </StyledDiv>
  );
}

InfoArea.defaultProps = {
  iconColor: 'gray',
};

InfoArea.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconColor: PropTypes.oneOf(['primary', 'warning', 'danger', 'success', 'info', 'rose', 'gray']),
  vertical: PropTypes.bool,
};
