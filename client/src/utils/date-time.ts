import {
  isValid as isValidFns,
  format as formatFns,
  differenceInCalendarDays
} from 'date-fns';
import {
  DEFAULT_FORMAT_DATE,
  LABEL_DAYS,
  LABEL_TODAY,
  LABEL_Today,
  LABEL_YESTERDAY
} from '~/constants/time';

/**
 * Format date
 * @param value : date
 * @param format : the default format is MM/dd/yyyy. I suggest the best format is RFC3339
 * @returns
 */
export const formatFnsDate = (value: string, format?: string): string => {
  try {
    if (!isValidFns(value)) {
      return formatFns(new Date(), format || DEFAULT_FORMAT_DATE);
    }
    if (format) {
      return formatFns(new Date(value), format);
    }
    return formatFns(new Date(value), DEFAULT_FORMAT_DATE);
  } catch (err) {
    return formatFns(new Date(), DEFAULT_FORMAT_DATE);
  }
};

export const getOffsetDays = (targetDate: string | Date) => {
  const offset = differenceInCalendarDays(new Date(targetDate), new Date());
  if (offset === -1) {
    return LABEL_YESTERDAY;
  }

  if (offset === 0) {
    return LABEL_TODAY;
  }

  return `${Math.abs(offset)} ${LABEL_DAYS} ago`;
};
