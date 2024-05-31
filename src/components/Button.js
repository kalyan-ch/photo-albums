import classNames from "classnames";
import { FaSync } from "react-icons/fa";

const Button = ({
  rounded,
  outline,
  primary,
  secondary,
  success,
  warning,
  danger,
  loading,
  children,
  ...rest
}) => {
  const finalClassName = classNames(
    "flex items-center px-3 py-1.5 border",
    rest.className,
    {
      "opacity-80": loading,
      "text-white": !outline && !secondary,
      "bg-blue-500 border-blue-600": primary,
      "bg-green-500 border-green-600": success,
      "bg-red-500 border-red-600": danger,
      "bg-orange-500 border-orange-600": warning,
      "bg-white": outline,
      rounded: rounded,
    }
  );

  return (
    <button {...rest} disabled={loading} className={finalClassName}>
      {loading ? <FaSync className="animate-spin" /> : children}
    </button>
  );
};

Button.propTypes = {
  checkUniqueVariation: ({ primary, secondary, success, warning, danger }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!warning) +
      Number(!!danger);

    if (count > 1) {
      return new Error("Use just one of variation apps");
    }
  },
};

export default Button;
