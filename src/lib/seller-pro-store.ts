type BannerClick = { timestamp: string; userAgent: string };
type Signup = { timestamp: string; email: string; interests: string[] };

let bannerClicks: BannerClick[] = [];
let signups: Signup[] = [];

export function recordBannerClick(userAgent: string) {
  bannerClicks.push({ timestamp: new Date().toISOString(), userAgent });
}

export function recordSignup(email: string, interests: string[]) {
  signups.push({ timestamp: new Date().toISOString(), email, interests });
}

export function getStats() {
  return { bannerClicks, signups };
}
