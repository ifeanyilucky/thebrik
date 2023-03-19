import ReactGA from 'react-ga';

export const useAnalyticEventTracker = (category) => {
  const eventTracker = (action, label) => {
    ReactGA.event({ category, action, label });
  };
  return eventTracker;
};
