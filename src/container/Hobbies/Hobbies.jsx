import { useEffect, useState } from 'react';
import './Hobbies.scss';
import { AppWrap, MotionWrap } from '../../wrapper';
import { apiService } from '../../services';
import { Tooltip, CartesianGrid, XAxis, YAxis, LineChart, Line, ResponsiveContainer } from 'recharts';
import { images, months } from '../../constants';
import { useIsMobile } from '../../hooks';
import { motion } from 'framer-motion';

// 1. when on mobile add row with selectable months
// 2. add weekly way with each day of the week
// 2.1 when pressing back I should check where I am to go to previous stage and not to beginning
// 3. add button to switch between line graph and table
// 4. add loading motivo icon at start
// 5. add loader when fetching strava data

// const getDays = (year, month) => new Date(year, month, 0).getDate();

const digitFormatter = (num, decimals = true, addSign = true, sign = 'km') => {
  if (num === undefined) return;
  const formattedNum = decimals ? num.toFixed(2) : Math.round(num);

  const arr = formattedNum.split('.');
  const splittedDigits = arr[0].split('');

  for (let i = splittedDigits.length; i >= 0; i -= 3) {
    const isEqualToNumOfDigits = i === splittedDigits.length;
    if (isEqualToNumOfDigits) {
      continue;
    } else if (i === 0) {
      break;
    } else {
      splittedDigits[i] = `,${splittedDigits[i]}`;
    }
  }

  const digitsJoined = splittedDigits.join('');
  const digitsWithDecimals = decimals ? `${digitsJoined}.${arr[1]}` : `${digitsJoined}`;
  const result = addSign ? `${digitsWithDecimals} ${sign}` : digitsWithDecimals;
  return result;
};

const getMonthName = (date, length = 'short') => {
  const dateObj = new Date(date);
  // return dateObj.toLocaleString('default', { month: length });
  return months[dateObj.getMonth()];
};

const getCorrectToolTipYear = (name, comparisonType, activeMonth, activeYear) => {
  if (name === 'pv' && comparisonType === 'prev month' && !activeMonth) return activeYear - 1;
  if (name === 'pv' && comparisonType === 'prev year' && activeMonth) return activeYear - 1;
  return activeYear;
};

const findPrevMonth = (month) => {
  const indexOfCurrMonth = months.indexOf(month);
  const indexOfPrevMonth = indexOfCurrMonth === 0 ? months.length - 1 : indexOfCurrMonth - 1;
  return months[indexOfPrevMonth];
};

const CustomTooltip = ({ active, payload, label, activeYear, activeMonth, comparisonType }) => {
  // here I have to get prev month when  comparisontype is prev month and activemonth is true

  if (active && payload && payload.length) {
    const sortedPayload = payload.sort((a, b) => b.value - a.value);
    return (
      <div>
        {sortedPayload.map((el, index) => {
          const year = getCorrectToolTipYear(el.name, comparisonType, activeMonth, activeYear);

          const month = activeMonth
            ? comparisonType === 'prev month' && el.name === 'pv'
              ? findPrevMonth(activeMonth)
              : activeMonth
            : '';

          return <p key={index}>{`${label} ${month} ${year}: ${digitFormatter(el.value)}`}</p>;
        })}
        {payload[0].payload.pv && <p>{`delta : ${digitFormatter(payload[0].payload.uv - payload[0].payload.pv)}`}</p>}
      </div>
    );
  }

  return null;
};

const sumDistancePerMonth = (rawData, month) =>
  rawData.reduce((cv, pv) => {
    if (month === getMonthName(pv.start_date)) return pv.distance + cv;
    return cv;
  }, 0);

const sumDistancePerWeek = (rawData, week) => {
  const result = rawData.reduce((cv, pv) => {
    const day = pv.start_date.split('-')[2].split('T')[0];
    if ((week === '1st week' || week === '1w') && day >= 1 && day <= 7) return pv.distance + cv;
    if ((week === '2nd week' || week === '2w') && day >= 8 && day <= 14) return pv.distance + cv;
    if ((week === '3rd week' || week === '3w') && day >= 15 && day <= 21) return pv.distance + cv;
    if ((week === '4th week' || week === '4w') && day >= 22 && day <= 28) return pv.distance + cv;
    return cv;
  }, 0);
  return result;
};

const parseMonthlyDataForChart = (filteredData, allData, compare, sportType) => {
  const prevYear = filteredData.length > 0 && getYear(filteredData[0].start_date) - 1;
  const prevYearData = allData.filter((el) => getYear(el.start_date) === prevYear && el.sport_type === sportType);

  return months.map((month) => ({
    name: month,
    uv: sumDistancePerMonth(filteredData, month) / 1000,
    ...(compare === 'year' && {
      pv: sumDistancePerMonth(prevYearData, month) / 1000,
    }),
  }));
};

const parseWeeklyDataForChart = (allData, filteredData, month, compare, weeksHeaders, sportType, compareType = 'prev month') => {
  const monthlyData = filteredData.length > 0 && filteredData.filter((el) => getMonthName(el.start_date) === month);

  const prevMonth = monthlyData.length > 0 && getMonth(monthlyData[0].start_date) - 1;

  const prevMonthlyData =
    compareType === 'prev month'
      ? filteredData.filter((el) => getMonth(el.start_date) === prevMonth)
      : allData.length > 0 &&
        allData.filter(
          (el) =>
            getYear(el.start_date) === getYear(monthlyData[0].start_date) - 1 &&
            el.sport_type === sportType &&
            getMonth(el.start_date) === getMonth(monthlyData[0].start_date)
        );

  return weeksHeaders.map((week) => ({
    name: week,
    uv: sumDistancePerWeek(monthlyData, week) / 1000,
    ...(compare === 'week' && {
      pv: sumDistancePerWeek(prevMonthlyData, week) / 1000,
    }),
  }));
};

const getYear = (date) => {
  const dateObj = new Date(date);
  return dateObj.getFullYear();
};

const getMonth = (date) => {
  const dateObj = new Date(date);
  return dateObj.getMonth();
};

const getYears = (rawData) => [...new Set(rawData.map((el) => getYear(el.start_date)))].reverse();

const Hobbies = () => {
  const isMobile = useIsMobile();
  const weeksHeaders = isMobile ? ['1w', '2w', '3w', '4w'] : ['1st week', '2nd week', '3rd week', '4th week'];
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [sportTypes, setSportTypes] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');
  const [filteredActivies, setFilteredActivities] = useState([]);
  const [activeYear, setActiveYear] = useState();
  const [parsedData, setParsedData] = useState([]);
  const [activeMonth, setActiveMonth] = useState(false);
  const [isCompare, setIsCompare] = useState('');
  const [comparisonType, setComparisonType] = useState('prev month');
  const years = getYears(activities.filter((el) => el.sport_type === activeFilter));
  const listClassName = isMobile ? 'app__experience-filter-mobile' : 'app__experience-filter';

  useEffect(() => {
    apiService.getAllStravaActivities().then((activities) => {
      const years = getYears(activities);
      const mostRecentYear = years[0];
      const sportTypes = [...new Set(activities.map((el) => el.sport_type))];
      setActivities(activities);
      setFilteredActivities(
        activities.filter((el) => getYear(el.start_date) === mostRecentYear && el.sport_type === sportTypes[0])
      );
      setSportTypes(sportTypes);
      setActiveYear(mostRecentYear);
      setActiveFilter(sportTypes[0]);
      setTimeout(() => setIsLoading(false), 2000);
    });
  }, []);

  useEffect(() => {
    const years = getYears(filteredActivies);
    const mostRecentYear = years[0];
    const filteredByTypeActivities = filteredActivies.filter((el) => el.sport_type === activeFilter);

    const parsedData =
      isCompare === 'week' || activeMonth
        ? parseWeeklyDataForChart(
            activities,
            filteredByTypeActivities,
            activeMonth,
            isCompare,
            weeksHeaders,
            activeFilter,
            comparisonType
          )
        : parseMonthlyDataForChart(filteredByTypeActivities, activities, isCompare, activeFilter);

    setParsedData(parsedData);
    setActiveYear(mostRecentYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities, comparisonType, filteredActivies, isCompare, activeMonth]);

  const handleActivitiesFilter = (item) => {
    setActiveFilter(item);
    const filteredByTypeActivities = activities.filter((activity) => activity.sport_type === item);
    const years = getYears(filteredByTypeActivities);
    const mostRecentYear = years[0];

    setFilteredActivities(filteredByTypeActivities.filter((activity) => getYear(activity.start_date) === mostRecentYear));
  };

  const handleYearFilter = (item) => {
    setActiveYear(item);
    setFilteredActivities(activities.filter((el) => getYear(el.start_date) === item && el.sport_type === activeFilter));
  };

  return (
    <>
      <h2 className='head-text'>Hobbies</h2>
      {isLoading ? (
        <motion.div
          whileInView={{ opacity: [1, 0] }}
          transition={{ duration: 8 }}
          className='app__spinning-logo-container'
          style={{
            background: 'white',
            width: '100%',
            justifyContent: 'flex-start',
            marginTop: '30vh',
          }}
        >
          <img src={images.running} alt='logo' className='app__spinning-logo' style={{ height: '110px' }} />
        </motion.div>
      ) : filteredActivies.length === 0 ? (
        <p
          className='p-text'
          style={{
            marginTop: '20%',
            height: '90vh',
            textAlign: 'center',
            width: '90%',
          }}
        >
          Not available at the moment.
        </p>
      ) : (
        <>
          <div
            className={listClassName}
            style={{
              height: isMobile ? '103px' : '',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {sportTypes.length > 0 &&
              sportTypes.map((type, index) => (
                <div
                  key={index}
                  className={`app__experience-filter-item app__flex p-text ${activeFilter === type ? 'item-active' : ''}`}
                  onClick={() => handleActivitiesFilter(type)}
                >
                  {type}
                </div>
              ))}
          </div>

          <div
            className={listClassName}
            style={{
              height: isMobile ? '100px' : '',
              justifyContent: 'flex-start',
              width: '100%',
              margin: '0',
            }}
          >
            {years.length > 0 &&
              years.map((year, index) => (
                <div
                  key={index}
                  className={`app__experience-filter-item app__flex ${activeYear === year ? 'item-active' : ''}`}
                  onClick={() => handleYearFilter(year)}
                >
                  {year}
                </div>
              ))}
          </div>

          <div
            className={listClassName}
            style={{
              height: isMobile ? '100px' : '',
              justifyContent: 'flex-start',
              width: '100%',
              margin: '0',
              marginBottom: isMobile ? '15%' : '',
            }}
          >
            {filteredActivies.length > 0 && (
              <div
                style={{ display: isMobile ? 'inline-block' : '' }}
                className={`app__hobbies-date-item app__flex ${isCompare.length === 0 ? '' : 'item-active'}`}
                onClick={() => {
                  if (isCompare === '') setIsCompare(activeMonth ? 'week' : 'year');
                  else setIsCompare('');
                }}
              >
                compare
              </div>
            )}
            {activeMonth && (
              <>
                <div
                  className='app__hobbies-date-item app__flex'
                  style={{ display: isMobile ? 'inline-block' : '' }}
                  onClick={() => {
                    setParsedData(parseMonthlyDataForChart(filteredActivies, activities, isCompare, activeFilter));
                    setActiveMonth(false);
                    setIsCompare('');
                    setComparisonType('prev month');
                  }}
                >
                  back
                </div>
                {isCompare.length > 0 && (
                  <div
                    style={{ display: isMobile ? 'inline-block' : '' }}
                    className={`app__hobbies-date-item app__flex ${isCompare.length === 0 ? '' : 'item-active'}`}
                    onClick={() => {
                      if (activeMonth) {
                        if (comparisonType === 'prev month') {
                          setComparisonType('prev year');
                          setParsedData(
                            parseWeeklyDataForChart(
                              activities,
                              filteredActivies,
                              activeMonth,
                              isCompare,
                              weeksHeaders,
                              activeFilter,
                              'prev year'
                            )
                          );
                        } else {
                          setComparisonType('prev month');
                          setParsedData(
                            parseWeeklyDataForChart(
                              activities,
                              filteredActivies,
                              activeMonth,
                              isCompare,
                              weeksHeaders,
                              activeFilter
                            )
                          );
                        }
                      }
                    }}
                  >
                    {comparisonType}
                  </div>
                )}
              </>
            )}
          </div>

          {filteredActivies.length > 0 && (
            <ResponsiveContainer height={isMobile ? '80%' : '60%'} aspect={isMobile ? 1.7 : 3}>
              <LineChart
                data={parsedData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                onClick={(e) => {
                  if (!isMobile && e && e.activeLabel) {
                    setParsedData(
                      parseWeeklyDataForChart(
                        activities,
                        filteredActivies,
                        e.activeLabel,
                        isCompare,
                        weeksHeaders,
                        activeFilter,
                        comparisonType
                      )
                    );
                    setActiveMonth(e.activeLabel);
                    setIsCompare('');
                  }
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='name'
                  onClick={(e) => {
                    if (isMobile && e && e.value) {
                      setParsedData(
                        parseWeeklyDataForChart(
                          activities,
                          filteredActivies,
                          e.value,
                          isCompare,
                          weeksHeaders,
                          comparisonType,
                          activeFilter
                        )
                      );
                      setActiveMonth(e.value);
                      setIsCompare('');
                    }
                  }}
                />
                {!isMobile && <YAxis />}
                <Tooltip
                  content={<CustomTooltip activeYear={activeYear} activeMonth={activeMonth} comparisonType={comparisonType} />}
                />
                {/* <Legend /> */}
                <Line type='monotone' dataKey='pv' stroke='#8884d8' />
                <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
              </LineChart>
            </ResponsiveContainer>
          )}
        </>
      )}
    </>
  );
};

export default AppWrap(MotionWrap(Hobbies, 'app__hobbies'), 'hobbies', 'app__whitebg');
