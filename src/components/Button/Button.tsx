"use client";
import {
  ButtonPropsType,
  ButtonVariants,
  ColorType,
} from "./../../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useColor } from "./../../hooks/useColor";

const Button = ({
  // default values
  variant = ButtonVariants.Solid,
  isDisabled = false,
  ...props
}: ButtonPropsType) => {
  const theme = useColor({}) as ColorType;

  const defaultClassNames = `text-[16px] font-medium flex justify-center items-center gap-1
      active:opacity-60 hover:opacity-70 disabled:opacity-50 cursor-pointer px-[18px] py-3 border-[none] w-${
        props.width ? `${props.width} min-w-[120px] ` : "auto"
      }`;

  // for javacript based styling
  let buttonStyle: Partial<React.CSSProperties> = {
    backgroundColor: `${props.backgroundColor}`,
    color: `${props.textColor}`,
  };

  if (isDisabled) buttonStyle.color = `${theme.White}`;

  if (!props.backgroundColor || !props.textColor || !props.title) return <></>;
  if (variant !== ButtonVariants.Link && !props.onPress) return <></>;

  // handling onClick event of button
  const handlePress = (e: React.SyntheticEvent) => {
    // if state is loading or disabled don't call handler function
    if (props.isLoading || isDisabled) {
      return false;
    }
    if (props.onPress) {
      return props.onPress(e as React.SyntheticEvent<HTMLButtonElement, Event>);
    }
    if (props.href) {
      return true;
    }
    return false;
  };

  const renderChilds = () => {
    // if said icon exists then load that icon else null
    return (
      <>
        {props.leftIcon ? (
          <FontAwesomeIcon
            className="text-[18px]"
            icon={props.leftIcon}
            data-testid="left-arrow-icon"
          />
        ) : (
          <></>
        )}
        <span className="overflow-hidden whitespace-nowrap text-ellipsis">
          {props.title}
        </span>

        {props.rightIcon ? (
          <FontAwesomeIcon
            className="text-[18px]"
            icon={props.rightIcon}
            data-testid="right-arrow-icon"
          />
        ) : (
          <></>
        )}

        {props.isLoading ? (
          <FontAwesomeIcon
            className="text-[18px]"
            icon={faCircleNotch}
            spin
            data-testid="loading-icon"
          />
        ) : (
          <></>
        )}
      </>
    );
  };

  // for variant styling
  switch (variant) {
    case ButtonVariants.Outlined:
      if (isDisabled) {
        buttonStyle.backgroundColor = "transparent";
        buttonStyle.color = `${theme.Gray}`;
        buttonStyle.border = `1px solid ${theme.Gray}`;
      } else {
        buttonStyle.color = `${props.textColor}`;
        buttonStyle.backgroundColor = "transparent";
        buttonStyle.border = `1px solid ${props.textColor}`;
      }
      break;
    case ButtonVariants.Link:
      buttonStyle.backgroundColor = "transparent";
      if (isDisabled) {
        buttonStyle.color = `${theme.Gray}`;
      } else {
        buttonStyle.color = `${props.textColor}`;
      }
      if (props.href) {
        return (
          <>
            <a
              data-testid="button-link"
              className={`${defaultClassNames} ${props.className} ${
                isDisabled ? "pointer-events-none opacity-30" : ""
              }`}
              style={buttonStyle}
              href={props.href}
            >
              {renderChilds()}
            </a>
          </>
        );
      }
      break;
    case ButtonVariants.Solid:
      if (isDisabled) {
        buttonStyle.color = `${theme.White}`;
        buttonStyle.backgroundColor = `${theme.Gray}`;
      } else {
        buttonStyle.color = `${props.textColor}`;
        buttonStyle.backgroundColor = `${props.backgroundColor}`;
      }
      break;
  }

  if (props.style) buttonStyle = { ...buttonStyle, ...props.style };


  return (
    <>
      <button
        name={props.name}
        data-testid="generic-button"
        className={`${defaultClassNames} ${props.className}`}
        type="button"
        title={props.title}
        style={buttonStyle}
        disabled={isDisabled}
        onClick={handlePress}
      >
        {/* if said icon exists then load that icon else null */}
        {renderChilds()}
      </button>
    </>
  );
};

export default Button;
