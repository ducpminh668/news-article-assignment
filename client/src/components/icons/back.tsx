import cx from 'classnames';
export default function Back({
  color = '#292D32',
  classes,
  onClick
}: {
  color?: string;
  classes?: string;
  onClick: () => void;
}) {
  return (
    <div className={cx('min-h-6 min-w-6', classes)} onClick={onClick}>
      <svg
        width='32'
        height='32'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
          stroke={color}
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M13.26 15.53L9.73999 12L13.26 8.46997'
          stroke={color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  );
}
