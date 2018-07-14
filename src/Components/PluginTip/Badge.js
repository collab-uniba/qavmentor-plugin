import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const RADIUS = 12;

export const styles = theme => ({
  root: {
    position: 'relative',
    display: 'inline-flex',
    // For correct alignment with the text.
    verticalAlign: 'middle',
  },
  badge: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -RADIUS,
    right: -RADIUS,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeight,
    fontSize: theme.typography.pxToRem(RADIUS),
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: '50%',
    backgroundColor: theme.palette.color,
    color: theme.palette.textColor,
    zIndex: 1, // Render the badge on top of potential ripples.
  },
  colorsuccess: {
    backgroundColor: '#00A047',
    color: '#FFFFFF',
  },
  colorwarning: {
    backgroundColor: '#FF9A00',
    color: '#FFFFFF',
  },
  colorerror: {
    backgroundColor: '#E41F2F',
    color: '#FFFFFF',
  },
});

function Badge(props) {
  const {
    badgeContent,
    children,
    classes,
    className: classNameProp,
    color,
    component: ComponentProp,
    ...other
  } = props;

  const badgeClassName = classNames(classes.badge, {
    [classes[`color${color}`]]: color !== 'default',
  });

  return (
    <ComponentProp className={classNames(classes.root, classNameProp)} {...other}>
      {children}
      <span className={badgeClassName}>{badgeContent}</span>
    </ComponentProp>
  );
}

Badge.propTypes = {
  /**
   * The content rendered within the badge.
   */
  badgeContent: PropTypes.node.isRequired,
  /**
   * The badge will be added relative to this node.
   */
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['success', 'warning', 'error']),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
};

Badge.defaultProps = {
  color: 'default',
  component: 'span',
};

export default withStyles(styles, { name: 'MuiBadge' })(Badge);
