import { useEffect, useMemo } from 'react';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export type LimitType = '5' | '10' | '20';

interface TodoPaginationProps {
  count: number;
  limit: LimitType;
  setLimit: (limit: LimitType) => void;
  page: number;
  setPage: (page: number) => void;
  todos: Todo[];
}
export const Pagination: React.FC<TodoPaginationProps> = ({
  count,
  limit,
  setLimit,
  page,
  setPage,
  todos,
}) => {
  const pages = useMemo(
    () =>
      Array.from({ length: Math.ceil(count / Number(limit)) }, (_, i) => i + 1),
    [count, limit]
  );
  console.log(pages);

  return (
    <div>
      <Select value={limit} onValueChange={setLimit}>
        <SelectTrigger>
          <SelectValue placeholder="Кол-во на странице" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
        </SelectContent>
      </Select>
      {pages.map((el) => (
        <Button
          onClick={el === page ? undefined : () => setPage(el)}
          key={el}
          type="button"
        >
          <span style={{ color: el === page ? 'red' : 'green' }}>{el}</span>
        </Button>
      ))}
    </div>
  );
};
