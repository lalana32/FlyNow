import { useDispatch } from 'react-redux';
import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { useSelector } from 'react-redux';

type AppThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

export const useAppSelector = (selector: (state: RootState) => any) =>
  useSelector(selector);
