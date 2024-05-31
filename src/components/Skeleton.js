import classNames from "classnames";

const Skeleton = ({ numBoxes, outerClassName }) => {
  const outerClasses = classNames(
    "relative overflow-hidden bg-gray-200",
    "rounded mb-3",
    outerClassName
  );
  const innerClasses = classNames(
    "animate-shimmer",
    "absolute inset-0",
    "-translate-x-full",
    "bg-gradient-to-r from-gray-200 via-white to-gray-200"
  );

  const boxes = Array(numBoxes)
    .fill(0)
    .map((_i, i) => {
      return (
        <div className={outerClasses} key={i}>
          <div className={innerClasses}></div>
        </div>
      );
    });

  return boxes;
};

export default Skeleton;
