/** this would wrap all the api endpoints and base urls */
export const baseUrl = process.env.REACT_APP_BASE_URL;

export const url = {
  login: "/user",
  profile: "/user/profile",
  generalLeaderboard: "/leaderboard",
  campaign: "/admin/campaign",
  allCampaign: "/leaderboard/campaign",
  addTweet: "/admin/campaign/",
  updateAccessLevel: "/admin/update-accesslevel",
  endCampaign: "/admin/campaign/",
  welcomePoints: "/user/bonus/"
};
