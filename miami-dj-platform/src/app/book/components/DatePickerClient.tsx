"use client";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerClientProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  minDate: Date;
  maxDate: Date;
  dateFormat?: string;
  className?: string;
  placeholderText?: string;
  showPopperArrow?: boolean;
  disabledKeyboardNavigation?: boolean;
  dayClassName?: (date: Date) => string;
}

const DatePickerClient: React.FC<DatePickerClientProps> = (props) => {
  return <DatePicker {...props} />;
};

export default DatePickerClient;
