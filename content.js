const bannedSites = [
  "www.princesscasino.ro",
  "bannedwebsite.com",
  "anotherbadsite.com",
];

if (bannedSites.some((site) => window.location.hostname.includes(site))) {
  document.documentElement.innerHTML = "Lasa bets";
  window.stop();
}
