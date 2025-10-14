import { useMemo } from 'react';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks';
import { todosSlice } from '@/store/reducer/todosSlice';
import { Todo } from '@/types/Todo';

export type LimitType = '5' | '10' | '20';

export const Pagination: React.FC = () => {
  const { page, limit, count } = useAppSelector((state) => state.todosSlice);
  const dispatch = useAppDispatch();

  const handleValueChange = (value: LimitType) => {
    dispatch(todosSlice.actions.setLimit(value));
  };

  const handleClick = (pageNumber: number) => {
    if (pageNumber === page) {
      return;
    }
    dispatch(todosSlice.actions.setPage(pageNumber));
  };

  const pages = useMemo(
    () =>
      Array.from({ length: Math.ceil(count / Number(limit)) }, (_, i) => i + 1),
    [count, limit]
  );

  return (
    <div className="mt-4 flex flex-col items-start gap-2 sm:flex-row">
      <div className="mb-3">
        <Select value={limit} onValueChange={handleValueChange}>
          <SelectTrigger>
            <SelectValue placeholder="Кол-во на странице" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-3">
        {pages.map((el) => (
          <Button
            variant="ghost"
            onClick={() => handleClick(el)}
            key={el}
            type="button"
          >
            <span style={{ color: el === page ? 'red' : 'green' }}>{el}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
