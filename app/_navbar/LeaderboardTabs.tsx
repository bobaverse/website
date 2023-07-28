'use client';
import CurrentSeasonRanks from "@/components/leaderboards/CurrentSeasonRanks";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { FC, ReactNode, SyntheticEvent, useState } from "react";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  styled, Table, TableBody, TableCell,
  TableContainer,
  TableHead, TableRow,
  ThemeProvider
} from "@mui/material";
import theme from "@/styles/mui";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import Image from 'next/image';

const StyledTab = styled(Tab)(({ }) => ({
  color: 'white',
  '& .MuiTab-root.Mui-disabled': {
    color: 'white',
  }
}))

const a11yProps = (index: number) => {
  return {
    id: `leaderboard-tab-${index}`,
    'aria-controls': `leaderboard-tabpanel-${index}`,
  };
}

interface LeaderboardTabsProps {
  children?: ReactNode;
}

const LeaderboardTabs: FC<LeaderboardTabsProps> = () => {
  const [value, setValue] = useState(1);
  const [game, setGame] = useState<string>('plinko');
  const [date, setDate] = useState<Dayjs | null>(dayjs((new Date()).toISOString().split('T')[0]));
  const changeGame = (event: SelectChangeEvent) => {
    if (game !== event.target.value) {
      setGame(event.target.value);
    }
  }

  const changeTab = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="w-full">
          <div style={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={changeTab}
              aria-label="Leaderboard Tabs"
              variant="fullWidth"
              TabIndicatorProps={{
                style: {
                  color: 'white',
                  backgroundColor: 'white',
                }
              }}
            >
              <StyledTab label="Last Season" disabled {...a11yProps(0)} />
              <StyledTab label="Current Season" {...a11yProps(1)} />
              <StyledTab label="Lifetme" disabled {...a11yProps(2)} />
            </Tabs>
          </div>
          <div className="pt-5 px-2 lg:px-5">
            {game === "plinko" && (
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <Select
                    id="select-game"
                    value={game}
                    variant="standard"
                    onChange={changeGame}
                    className="lg:text-4xl"
                    sx={{ ':before': { borderBottomColor: 'rgba(255, 255, 255, 0.2)' } }}
                  >
                    <MenuItem value="plinko">Plinko</MenuItem>
                  </Select>
                  <DatePicker
                    value={dayjs(date)}
                    onChange={(newValue) => setDate(newValue)}
                    format="YYYY-MM"
                    views={['year', 'month']}
                    openTo="month"
                    disableFuture
                    minDate={dayjs('2023-01-01')}
                    maxDate={dayjs(`${(new Date()).getFullYear()}-12-31`)}
                    className="max-w-[150px]"
                    shouldDisableYear={(year) => year.isBefore('')}
                  />
              </div>
                <CurrentSeasonRanks month={(date && date.month() + 1) || 5} year={date?.year() || 2023} />
              </div>)}
          </div>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default LeaderboardTabs;