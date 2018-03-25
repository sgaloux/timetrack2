import * as React from 'react';
import { Button, Tooltip, IButtonProps, Position } from '@blueprintjs/core';

interface ToolTipButtonProps extends IButtonProps {
  tooltipContent: string;
  tooltipPosition?: Position;
}

export default class TooltipButton extends React.Component<ToolTipButtonProps> {
  public static defaultProps: Partial<ToolTipButtonProps> = {
    tooltipPosition: Position.TOP_RIGHT,
  };
  public render() {
    const { tooltipContent, tooltipPosition, ...buttonProps } = this.props;
    return (
      <Tooltip content={tooltipContent} position={tooltipPosition}>
        <Button {...buttonProps} />
      </Tooltip>
    );
  }
}
