import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { PersonSlice } from '../features/personSlice'

export const store = configureStore({
	reducer: {
		person: PersonSlice.reducer
	}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;