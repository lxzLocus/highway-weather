# 静的 1 ファイルの Web アプリを nginx で配信するだけの最小イメージ。
# 外部 API (OSRM / Open-Meteo / Nominatim) はすべてブラウザ側から直接叩くため、
# サーバー側の依存・環境変数・キーは一切不要。
FROM nginx:1.27-alpine

COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
