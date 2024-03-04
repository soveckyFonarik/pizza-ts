import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import { type Pizza, type SearchPizzaParams } from '../@types/Pizzas';

export const fetchPizzass = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizzas/fetchPizzass',
  async (params) => {
    const { cotegoryBy, sortBy, order, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://65d61378f6967ba8e3bd739e.mockapi.io/pizzas`,
      {
        params: pickBy(
          {
            page: currentPage,
            limit: 4,
            cotegoryBy,
            sortBy,
            order,
            searchBy: search
          },
          identity
        )
      }
    );
    return data;
  }
);
