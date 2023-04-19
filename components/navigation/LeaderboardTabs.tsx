'use client';
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

  const rankMap = (i: number) => (i === 0 ? 'bg-gold' : i === 1 ? 'bg-silver' : i === 2 ? 'bg-bronze' : '');

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
                <TableContainer>
                  <Table sx={{ '& .MuiTableCell-root': { borderColor: 'transparent' } }}>
                    <TableHead>
                      <TableRow>
                        <TableCell className="py-2 pt-4 w-[60px]">Rank</TableCell>
                        <TableCell className="py-2 pt-4">Player</TableCell>
                        <TableCell className="pb-2 pt-4" align="right">Score</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.from({ length: 10 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell className="py-1 w-[60px]">
                            <div
                              className={"w-[32px] h-[32px] lg:w-[48px] lg:h-[48px] rounded-md flex justify-center items-center " + rankMap(index)}
                            >
                              <span className="text-3xl">{index + 1}</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-1">
                            <div className="flex w-[32px] h-[32px] lg:w-[48px] lg:h-[48px]">
                              <Image
                                src="https://i.imgur.com/MgYBxfS.jpeg"
                                alt="profile pic"
                                className="rounded-full mr-2"
                                width={48}
                                height={48}
                              />
                              <div className="flex flex-col">
                                <span className="text-md lg:text-xl font-semibold">TraderByDay</span>
                                <span className="text-xs lg:text-sm text-seafoam">0xD34D...833F</span>
                              </div>
                            </div>

                          </TableCell>
                          <TableCell className="py-1 text-xl" align="right">{(10 - index) * 11}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>)}
          </div>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default LeaderboardTabs;