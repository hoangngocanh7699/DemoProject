import type { PropsWithChildren } from 'react';
import './cell.css';
declare type CalendarCellProps = {
    end?: boolean;
    hovered?: boolean;
    inRange?: boolean;
    inverted?: boolean;
    nextMonth?: boolean;
    prevMonth?: boolean;
    selectable?: boolean;
    selected?: boolean;
    start?: boolean;
    today?: boolean;
    title?: string;
};
declare const CalendarCell: {
    ({ children, end, hovered, inRange, inverted, nextMonth, prevMonth, selectable, selected, start, today, ...otherProps }: PropsWithChildren<CalendarCellProps>): JSX.Element;
    defaultProps: {
        end: boolean;
        hovered: boolean;
        inRange: boolean;
        nextMonth: boolean;
        prevMonth: boolean;
        start: boolean;
    };
};
export default CalendarCell;
