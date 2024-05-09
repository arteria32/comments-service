import { DateRange } from '@models/date-range';
import dayjs from 'dayjs';

export const parseDateRangeFromQueryParams = (
  params: any,
): DateRange | null => {
  console.log('parseDateRangeFromQueryParamsparams', params);
  let { from, to } = params;
  console.log('from,To', from, to);
  if (!from && !to) return null;
  from = dayjs(from).isValid() ? from : null;
  to = dayjs(to).isValid() ? to : null;
  return { from, to };
};
