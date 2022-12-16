/// <reference types="react" />
import { SemanticDatepickerProps } from '../types';
declare type CustomIconProps = {
    clearIcon: SemanticDatepickerProps['clearIcon'];
    icon: SemanticDatepickerProps['icon'];
    isClearIconVisible: boolean;
    onClear: () => void;
    onClick: () => void;
};
declare const CustomIcon: ({ clearIcon, icon, isClearIconVisible, onClear, onClick, }: CustomIconProps) => JSX.Element;
export default CustomIcon;
