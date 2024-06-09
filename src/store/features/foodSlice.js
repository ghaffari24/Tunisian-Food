import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const getFood = createAsyncThunk(
  'food/getFood',
  async () => {
    const response = await axios.get('https://threew-academy.onrender.com/api/foods')
    return response.data
  }
)
export const addFood = createAsyncThunk(
  'food/addFood',
  async (data) => {
    const response = await axios.post('https://threew-academy.onrender.com/api/food', data)
    return response.data
  }
)
export const delFood = createAsyncThunk(
  'food/delFood',
  async (id) => {

    const response = await axios.delete('https://threew-academy.onrender.com/api/food/' + id)
    console.log(response);
    /* console.log(response._id); */
    return response.data._id

  }
)
/*********** getById*************/
// export const getOneFood = createAsyncThunk(
//   'food/getOneFood',
//   async (id) => {

//     const response = await axios.get('https://threew-academy.onrender.com/api/food/'+id)

//     return response.data


//   }
// )
export const editFood = createAsyncThunk(
  'food/editFood',
  async (items) => {
    try {
      const response = await axios.put('https://threew-academy.onrender.com/api/food/' + items.id, items)
      console.log(response);
      /* console.log(response._id); */
      return response.data
    } catch (error) {
      return error
    }


  }
)

const initialState = {
  foodList: [],
  food: {},
  loading: false,
  error: ""

}
export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //getFoods
    builder.addCase(getFood.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(getFood.fulfilled, (state, action) => {
      state.loading = false;
      state.foodList = action.payload
    })
    builder.addCase(getFood.rejected, (state, action) => {
      state.loading = false;
    })

    //addFoods
    builder.addCase(addFood.pending, (state, action) => {

    })
    builder.addCase(addFood.fulfilled, (state, action) => {
      console.log(action.payload);
      state.foodList.push(action.payload)

    })
    builder.addCase(addFood.rejected, (state, action) => {

    })
    //DeleteFoods
    builder.addCase(delFood.pending, (state, action) => {

    })
    builder.addCase(delFood.fulfilled, (state, action) => {
      state.foodList = state.foodList.filter((food) => food._id !== action.payload)

    })
    builder.addCase(delFood.rejected, (state, action) => {

    })
    //   //ModificationFoods
    //   builder.addCase(getOneFood.pending, (state, action) => {

    //   })
    //   builder.addCase(getOneFood.fulfilled, (state, action) => {
    //     state.food = action.payload


    //   })
    //   builder.addCase(getOneFood.rejected, (state, action) => {

    //   })



    // 
    /***********modification********/
    builder.addCase(editFood.pending, (state, action) => {

    })
    builder.addCase(editFood.fulfilled, (state, action) => {
      const index = state.foodList.findIndex((item) => item._id == action.payload._id)
      state.foodList[index] = action.payload

    })
    builder.addCase(editFood.rejected, (state, action) => {
      state.error = action.payload
    })
  }


})
export const loading = (state) => state.food.loading
export const data = (state) => state.food.foodList
export const oneFood = (state) => state.food.food
export default foodSlice.reducer
