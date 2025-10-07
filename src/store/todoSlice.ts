// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import {
//   fetchTodos as apiFetchTodos,
//   createTodo as apiCreateTodo,
//   updateTodo as apiUpdateTodo,
//   deleteTodo as apiDeleteTodo,
// } from '../api/todos';
// import { Todo, ApiTodo, PaginatedResponse } from '../types';

// // Преобразование даты
// const toClientTodo = (api: ApiTodo): Todo => ({
//   ...api,
//   createdAt: new Date(api.createdAt),
// });

// // Состояние
// interface TodoState {
//   items: Todo[];
//   total: number;
//   currentPage: number;
//   limit: number;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: TodoState = {
//   items: [],
//   total: 0,
//   currentPage: 1,
//   limit: 5,
//   loading: false,
//   error: null,
// };

// // Thunks
// export const fetchTodos = createAsyncThunk<
//   PaginatedResponse,
//   void,
//   { state: { todos: TodoState }; rejectValue: string }
// >('todos/fetchTodos', async (_, { getState, rejectWithValue }) => {
//   const { currentPage, limit } = getState().todos;
//   try {
//     return await apiFetchTodos(currentPage, limit);
//   } catch (err: any) {
//     return rejectWithValue(
//       err.response?.data?.message || 'Ошибка загрузки задач'
//     );
//   }
// });

// export const createTodo = createAsyncThunk<
//   Todo,
//   string,
//   { rejectValue: string }
// >('todos/createTodo', async (text, { rejectWithValue }) => {
//   try {
//     const apiTodo = await apiCreateTodo(text);
//     return toClientTodo(apiTodo);
//   } catch (err: any) {
//     return rejectWithValue(
//       err.response?.data?.message || 'Не удалось создать задачу'
//     );
//   }
// });

// export const updateTodo = createAsyncThunk<
//   Todo,
//   { id: number; updates: Partial<ApiTodo> },
//   { rejectValue: string }
// >('todos/updateTodo', async ({ id, updates }, { rejectWithValue }) => {
//   try {
//     const apiTodo = await apiUpdateTodo(id, updates);
//     return toClientTodo(apiTodo);
//   } catch (err: any) {
//     return rejectWithValue(
//       err.response?.data?.message || 'Не удалось обновить задачу'
//     );
//   }
// });

// export const deleteTodo = createAsyncThunk<
//   number,
//   number,
//   { rejectValue: string }
// >('todos/deleteTodo', async (id, { rejectWithValue }) => {
//   try {
//     await apiDeleteTodo(id);
//     return id;
//   } catch (err: any) {
//     return rejectWithValue(
//       err.response?.data?.message || 'Не удалось удалить задачу'
//     );
//   }
// });

// // Slice
// const todoSlice = createSlice({
//   name: 'todos',
//   initialState,
//   reducers: {
//     setLimit: (state, action: PayloadAction<number>) => {
//       state.limit = action.payload;
//       state.currentPage = 1;
//     },
//     setPage: (state, action: PayloadAction<number>) => {
//       state.currentPage = action.payload;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // fetchTodos
//     builder.addCase(fetchTodos.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(fetchTodos.fulfilled, (state, action) => {
//       state.loading = false;
//       state.items = action.payload.todos.map(toClientTodo);
//       state.total = action.payload.total;
//       state.currentPage = action.payload.page;
//       state.limit = action.payload.limit;
//     });
//     builder.addCase(fetchTodos.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload || 'Неизвестная ошибка';
//     });

//     // createTodo
//     builder.addCase(createTodo.fulfilled, (state, action) => {
//       state.items.unshift(action.payload);
//       state.total += 1;
//     });

//     // updateTodo
//     builder.addCase(updateTodo.fulfilled, (state, action) => {
//       const index = state.items.findIndex((t) => t.id === action.payload.id);
//       if (index !== -1) state.items[index] = action.payload;
//     });

//     // deleteTodo
//     builder.addCase(deleteTodo.fulfilled, (state, action) => {
//       state.items = state.items.filter((t) => t.id !== action.payload);
//       state.total -= 1;
//     });

//     // Общая обработка ошибок (можно добавить к каждому rejected, но для краткости — через fulfilled + pending)
//     [createTodo, updateTodo, deleteTodo].forEach((thunk) => {
//       builder.addCase(thunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       });
//       builder.addCase(thunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Ошибка операции';
//       });
//     });
//   },
// });

// export const { setLimit, setPage, clearError } = todoSlice.actions;
// export default todoSlice.reducer;
