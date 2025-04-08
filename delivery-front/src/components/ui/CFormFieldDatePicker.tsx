import * as React from 'react';
import { Dayjs } from 'dayjs';
import {
  DatePicker,
  DatePickerProps,
  DatePickerFieldProps,
} from '@mui/x-date-pickers/DatePicker';
import {
  useSplitFieldProps,
  usePickersContext,
} from '@mui/x-date-pickers/hooks';
import { CButton, CFormInput, CInputGroup } from '@coreui/react';
import { useValidation, validateDate } from '@mui/x-date-pickers';
import CIcon from '@coreui/icons-react';
import { cilCalendar } from '@coreui/icons';
import './CFormFieldDatePicker.css';

function CFormDateField(props: DatePickerFieldProps<Dayjs, false>) {
  const { internalProps, forwardedProps } = useSplitFieldProps(props, 'date');
  const { value, timezone } = internalProps;
  const { InputProps } = forwardedProps;

  const pickersContext = usePickersContext();

  const { hasValidationError } = useValidation({
    validator: validateDate,
    value,
    timezone,
    props: internalProps,
  });

  const handleTogglePicker = (event: React.UIEvent) => {
    if (pickersContext.open) {
      pickersContext.onClose(event);
    } else {
      pickersContext.onOpen(event);
    }
  };

  return (
    <CInputGroup>
      <CButton color='secondary' variant='outline' onClick={handleTogglePicker}>
        <CIcon icon={cilCalendar} />
      </CButton>
      <CFormInput
        ref={InputProps!.ref}
        value={value == null ? '' : value.format('DD/MM/YYYY')}
        valid={hasValidationError}
        className='form-control-validate-fix'
        required
        feedbackInvalid="A Data é obrigatória"
        feedbackValid="Data de nascimento preencida com sucesso"
      />
    </CInputGroup>
  );
}

export default function CFormFieldDatePicker(props: DatePickerProps<Dayjs>) {
  return (
    <DatePicker views={["year", "month", "day" ]} {...props} slots={{ ...props.slots, field: CFormDateField }} />
  );
}
