import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../Types/User";
import Cookies from 'js-cookie';
import { FieldValues } from "react-hook-form";
import axios from "axios";
import agent from "../Axios/axios";

interface AccountState {
    user: User | null;
    status: string; 
  }
  
  const initialState: AccountState = {
    user: null,
    status: 'idle',
  };

export const signInUser = createAsyncThunk<User, FieldValues>(
    'account/signin', 
    async(data, thunkAPI)=>{
        try{
            const response = await axios.post('http://localhost:5223/api/account/login', data);
            const user = response.data; 
            Cookies.set('user', JSON.stringify(user),{
                expires: 7,
                sameSite: 'lax',
                secure: true
            });
            return user;
        }catch(error: any)
        {
            return thunkAPI.rejectWithValue({erro: error.data})
        }
      }
    )
  
    export const fetchCurrentUser = createAsyncThunk<User>(
        'account/fetchCurrentUser',
        async (_, thunkAPI) => {
            thunkAPI.dispatch(setUser(JSON.parse(Cookies.get('user')!)))
            try {
                const user = await agent.requests.get('/account/currentuser');
                Cookies.set('user', JSON.stringify(user));
                return user;
            } catch (error) {
                return thunkAPI.rejectWithValue(error);
            }
        },
        {
            condition: () => {
                if (!Cookies.get('user')) return false;
            }
        }
    )
    

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setUser: (state, action)=>{
            state.user = action.payload;
        },
        signOut: (state)=>{
            state.user = null;
            Cookies.remove('user');
        },
        setBalance: (state, action)=>{
            state.user.Balance = action.payload;
        }
    },
    extraReducers: (builder)=> {
        builder
            .addMatcher(
                isAnyOf(signInUser.pending, fetchCurrentUser.pending),
                (state) => {
                    state.status = 'pending'
                }
            )
            .addMatcher(
                isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
                (state, action)=>{
                    state.status = 'idle'
                    state.user = action.payload
                }
            )
            .addMatcher(
                isAnyOf(signInUser.rejected, fetchCurrentUser.rejected),
                (state)=>{
                    state.status = 'idle'
                }
            )

    }
})

export const { setUser, signOut, setBalance } = accountSlice.actions;