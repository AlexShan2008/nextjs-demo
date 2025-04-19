import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Icon from '@mui/material/Icon';

import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';

import styles from '@/styles/jss/material-kit-react/components/customTabsStyle.js';

const StyledTabs = styled(Tabs)(({ _theme }) => ({
  ...styles.tabs,
  '& .MuiTabs-indicator': styles.displayNone,
}));

const StyledTab = styled(Tab)(({ _theme }) => ({
  ...styles.tab,
  '&.selected': styles.selected,
}));

const StyledTabPanel = styled('div')(({ _theme }) => ({
  ...styles.tabContent,
}));

export default function CustomTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, value) => {
    setValue(value);
  };

  const { headerColor, plainTabs, tabs, title, rtlActive } = props;

  return (
    <Card plain={plainTabs}>
      <CardHeader color={headerColor} plain={plainTabs}>
        {title !== undefined ? (
          <div
            className={classNames({
              [styles.cardTitle]: true,
              [styles.cardTitleRTL]: rtlActive,
            })}
          >
            {title}
          </div>
        ) : null}
        <StyledTabs
          value={value}
          onChange={handleChange}
          centered={plainTabs}
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {tabs.map((prop, key) => {
            let icon = {};
            if (prop.tabIcon) {
              icon = {
                icon:
                  typeof prop.tabIcon === 'string' ? <Icon>{prop.tabIcon}</Icon> : <prop.tabIcon />,
              };
            }
            return (
              <StyledTab
                key={key}
                label={prop.tabName}
                {...icon}
                className={classNames({
                  selected: value === key,
                })}
              />
            );
          })}
        </StyledTabs>
      </CardHeader>
      <CardBody>
        {tabs.map((prop, key) => {
          if (value === key) {
            return <StyledTabPanel key={key}>{prop.tabContent}</StyledTabPanel>;
          }
          return null;
        })}
      </CardBody>
    </Card>
  );
}

CustomTabs.propTypes = {
  headerColor: PropTypes.oneOf(['warning', 'success', 'danger', 'info', 'primary', 'rose']),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      tabContent: PropTypes.node.isRequired,
    }),
  ),
  rtlActive: PropTypes.bool,
  plainTabs: PropTypes.bool,
};
