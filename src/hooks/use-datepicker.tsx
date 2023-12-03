import { useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Instance } from 'flatpickr/dist/types/instance';

type useDatepickerProps = {
  dateRef: React.RefObject<HTMLInputElement>;
  condition: boolean;
  defaultDate: string | null;
  onClose: (newDate: string) => void;
};

export function useDatepicker({
  dateRef,
  condition,
  defaultDate,
  onClose,
}: useDatepickerProps) {
  useEffect(() => {
    let datepicker: Instance;
    if (dateRef.current && condition) {
      datepicker = flatpickr(dateRef.current, {
        defaultDate: defaultDate ?? new Date(),
        dateFormat: 'j F',
        onClose: ([newDate]) => {
          onClose(newDate.toISOString());
        },
        minDate: 'today',
        locale: {
          firstDayOfWeek: 1,
        },
      });
    }

    return () => {
      if (datepicker) {
        datepicker.destroy();
      }
    };
  }, [condition, dateRef, defaultDate, onClose]);
}
