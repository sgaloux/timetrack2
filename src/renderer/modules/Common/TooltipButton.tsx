import * as React from "react";
import { Button, Tooltip, IButtonProps, Position } from "@blueprintjs/core";

interface IToolTipButtonProps extends IButtonProps {
  tooltipContent: string;
  tooltipPosition?: Position;
}

export default class TooltipButton extends React.Component<IToolTipButtonProps> {
  public static defaultProps: Partial<IToolTipButtonProps> = {
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
