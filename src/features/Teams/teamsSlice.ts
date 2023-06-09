import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getTeamsAPI } from "./teamsAPI";
import { Team } from "./types";

type DataById = Record<Team["id"], Team>;

export interface teamsState {
  /* original data suitable for visualizing itself */
  data: Team[];
  /* Precomputed team data by keys for fast joins with other tables */
  dataById: DataById;
  status: "idle" | "loading" | "failed";
}

const initialState: teamsState = {
  data: [],
  dataById: {},
  status: "idle",
};

export const getTeams = createAsyncThunk("teams/getTeams", async () => {
  return await getTeamsAPI();
});

function getDataById(teams: Team[]): DataById {
  const dataById: DataById = {};
  teams.forEach((row) => {
    dataById[row.id] = row;
  });
  return dataById;
}

export const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeams.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        const data = action.payload;
        state.status = "idle";
        state.data = action.payload;
        state.dataById = getDataById(data);
      })
      .addCase(getTeams.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectTeams = (state: RootState) => state.teams.data;
export const selectTeamsById = (state: RootState) => state.teams.dataById;

export default teamsSlice.reducer;
