export interface FilterSelectProps {
    value: string | null;
    onChange: (selectedValue: string | null) => void;
    options: string[];
    label: string;
}