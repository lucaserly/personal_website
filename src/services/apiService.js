let stravaToken = '';
let tokenExpirationDate = 1659022788629;

const fetchRequest = async (path, options) => {
  try {
    const response = await fetch(path, options);
    const { status } = response;
    if (status === 204 || status === 401) return response;
    const parsed = await response.json();
    if (status >= 200 && status < 300) return parsed;
    throw Error(JSON.stringify(parsed));
  } catch (err) {
    console.error('fetchRequest Error:', err);
    return err;
  }
};

const getNewToken = async () => {
  const url = `remove url because of security reasons`;
  const newToken = await fetchRequest(url, {
    method: 'POST',
    redirect: 'follow',
  });
  if (newToken && newToken.access_token) {
    tokenExpirationDate = Date.now() + 5 * (60 * 60 * 1000);
    stravaToken = newToken.access_token;
  }
};

const getStravaInfo = () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${stravaToken}`,
    },
    redirect: 'follow',
  };
  return fetchRequest('https://www.strava.com/api/v3/athlete', requestOptions);
};

const getStravaActivitiesPerPage = (page) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${stravaToken}`,
    },
    redirect: 'follow',
  };
  return fetchRequest(`https://www.strava.com/api/v3/athlete/activities?after=0&page=${page}&per_page=200`, requestOptions);
};

const getAllStravaActivities = async () => {
  if (Date.now() > tokenExpirationDate) await getNewToken();
  let finalResult = [];
  let result = [];
  let page = 1;
  do {
    result = await getStravaActivitiesPerPage(page);
    page += 1;
    if (result && result.length > 0) finalResult.push(...result);
  } while (result.length > 0);
  return finalResult;
};

const apiService = { getStravaInfo, getAllStravaActivities };

export default apiService;
