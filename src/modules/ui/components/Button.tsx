import type {ButtonHTMLAttributes, FunctionComponent} from "react";
import styles from './css/button.module.css';

export type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
    fullWidth?: boolean;
    error?: boolean
}

const Button: FunctionComponent<ButtonPropsType> = (props) => {
    const {children, fullWidth, error, ...buttonProps} = props;
    const buttonStyles = [styles.button];
    if(fullWidth) buttonStyles.push(styles.fullWidth);
    if(error) buttonStyles.push(styles.error);
    return <button className={buttonStyles.join(" ")} {...buttonProps}>
        {children}
    </button>
}

export default Button