import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { AppDisaptch, RootState } from './../store/store'

export const useAppDispatch = () => useDispatch<AppDisaptch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
