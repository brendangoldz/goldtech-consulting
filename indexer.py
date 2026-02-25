import csv
import time
from typing import Dict, Any, List

from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = ["https://www.googleapis.com/auth/webmasters"]

# --- CONFIG ---
CLIENT_SECRET_FILE = "client_secret.json"

# Use ONE of these:
SITE_URL = "sc-domain:example.com"         # domain property (recommended)
# SITE_URL = "https://www.example.com/"    # url-prefix property

URLS = [
    "https://www.example.com/page1",
    "https://www.example.com/page2",
]
OUT_CSV = "gsc_url_inspection_report.csv"

# Throttle between calls to avoid quota bursts
SLEEP_SECONDS = 1.0


def auth_service():
    flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRET_FILE, SCOPES)
    creds = flow.run_local_server(port=0)
    return build("searchconsole", "v1", credentials=creds)


def safe_get(d: Dict[str, Any], path: List[str], default=None):
    cur = d
    for p in path:
        if not isinstance(cur, dict) or p not in cur:
            return default
        cur = cur[p]
    return cur


def inspect_url(service, url: str) -> Dict[str, Any]:
    body = {"inspectionUrl": url, "siteUrl": SITE_URL}
    return service.urlInspection().index().inspect(body=body).execute()


def extract_fields(url: str, result: Dict[str, Any]) -> Dict[str, Any]:
    idx = safe_get(result, ["inspectionResult", "indexStatusResult"], {}) or {}

    # Key fields that mirror GSC “Page indexing” insights
    return {
        "url": url,
        "verdict": idx.get("verdict"),
        "coverage_state": idx.get("coverageState"),
        "indexing_state": idx.get("indexingState"),
        "robots_txt_state": idx.get("robotsTxtState"),
        "page_fetch_state": idx.get("pageFetchState"),
        "last_crawl_time": idx.get("lastCrawlTime"),
        "google_canonical": idx.get("googleCanonical"),
        "user_canonical": idx.get("userCanonical"),
        "referring_urls_count": len(idx.get("referringUrls", []) or []),
        "referring_urls_sample": " | ".join((idx.get("referringUrls", []) or [])[:5]),
        "sitemap_count": len(idx.get("sitemaps", []) or []),
        "sitemaps_sample": " | ".join((idx.get("sitemaps", []) or [])[:5]),
    }


def main():
    service = auth_service()

    rows = []
    for i, url in enumerate(URLS, start=1):
        try:
            result = inspect_url(service, url)
            rows.append(extract_fields(url, result))
            print(f"[{i}/{len(URLS)}] OK: {url}")
        except HttpError as e:
            # Capture API errors cleanly in the report
            rows.append({
                "url": url,
                "verdict": "ERROR",
                "coverage_state": "",
                "indexing_state": "",
                "robots_txt_state": "",
                "page_fetch_state": "",
                "last_crawl_time": "",
                "google_canonical": "",
                "user_canonical": "",
                "referring_urls_count": "",
                "referring_urls_sample": "",
                "sitemap_count": "",
                "sitemaps_sample": "",
                "error": str(e),
            })
            print(f"[{i}/{len(URLS)}] ERROR: {url} -> {e}")
        time.sleep(SLEEP_SECONDS)

    # Write CSV
    fieldnames = sorted({k for r in rows for k in r.keys()})
    with open(OUT_CSV, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        w.writerows(rows)

    print(f"\nWrote: {OUT_CSV}")


if __name__ == "__main__":
    main()