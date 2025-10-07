import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../../components/ui/select';

interface PageSizeSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span>Показывать:</span>
      <Select
        value={String(value)}
        onValueChange={(val) => onChange(Number(val))}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="10" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PageSizeSelector;
