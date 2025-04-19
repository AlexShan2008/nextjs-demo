import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import styles from '@/styles/jss/material-kit-react/components/navPillsStyle.js';

const StyledTabs = styled(Tabs)(({ _theme }) => ({
  ...styles.root,
  '&.horizontal': styles.horizontalDisplay,
  '&.vertical': styles.verticalDisplay,
}));

const StyledTab = styled(Tab)(({ _theme }) => ({
  ...styles.root,
  '&.horizontal': styles.horizontalPills,
  '&.vertical': styles.verticalPills,
  '&.active': styles.active,
}));

const StyledContent = styled('div')(({ _theme }) => ({
  ...styles.contentWrapper,
  '&.horizontal': styles.horizontalContentWrapper,
  '&.vertical': styles.verticalContentWrapper,
}));

export default function NavPills(props) {
  const [active, setActive] = React.useState(props.active);
  const handleChange = (event, active) => {
    setActive(active);
  };
  const { tabs, horizontal, alignCenter } = props;

  const flexContainerClasses = classNames({
    horizontal: horizontal,
    vertical: !horizontal,
  });

  const tabsClasses = classNames({
    horizontal: horizontal,
    vertical: !horizontal,
  });

  const contentClasses = classNames({
    horizontal: horizontal,
    vertical: !horizontal,
  });

  return (
    <div>
      <StyledTabs
        value={active}
        onChange={handleChange}
        orientation={horizontal ? 'horizontal' : 'vertical'}
        className={flexContainerClasses}
        centered={alignCenter}
      >
        {tabs.map((prop, key) => {
          return (
            <StyledTab
              key={key}
              label={prop.tabButton}
              icon={prop.tabIcon}
              className={tabsClasses}
            />
          );
        })}
      </StyledTabs>
      {tabs.map((prop, key) => {
        if (key === active) {
          return (
            <StyledContent key={key} className={contentClasses}>
              {prop.tabContent}
            </StyledContent>
          );
        }
        return null;
      })}
    </div>
  );
}

NavPills.defaultProps = {
  active: 0,
  color: 'primary',
  horizontal: false,
};

NavPills.propTypes = {
  // index of the default active pill
  active: PropTypes.number,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabButton: PropTypes.string,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node,
    }),
  ).isRequired,
  color: PropTypes.oneOf(['primary', 'warning', 'danger', 'success', 'info', 'rose']),
  direction: PropTypes.string,
  horizontal: PropTypes.bool,
  alignCenter: PropTypes.bool,
};
