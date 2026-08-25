/**
 * pue-proxy controller
 *
 * Fetches the InfraCredit PUE geographical-distribution data server-side and
 * forwards it verbatim. Exists because InfraCredit's WordPress firewall blocks
 * requests from Vercel's shared/dynamic IP range (confirmed via HTTP 403) but
 * not from this Strapi VPS's fixed IP — see frontend `lib/api/pue.ts`, which
 * fetches this route instead of InfraCredit directly.
 */

const PUE_API_URL = 'https://infracredit.ng/climate-facility/wp-json/infracredit/v1/pue';
const PUE_TIMEOUT_MS = 8_000;

export default {
  async index(ctx: any) {
    try {
      const res = await fetch(PUE_API_URL, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          Accept: 'application/json',
        },
        signal: AbortSignal.timeout(PUE_TIMEOUT_MS),
      });

      const body = await res.text();

      ctx.status = res.status;
      ctx.type = 'application/json';
      ctx.body = body;
    } catch (err) {
      ctx.status = 502;
      ctx.body = {
        error: err instanceof Error ? err.message : 'PUE upstream fetch failed',
      };
    }
  },
};
