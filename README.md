# 高速道路 天気予報シミュレーター

出発IC・到着ICとルート、巡航速度から、ルート上の各地点の**通過時刻(モンテカルロで±の幅つき)**と、その時間帯の**天気・風向風速・規制の目安**を表示するWebアプリ。

## 機能

- IC・地名検索(Nominatim)、複数代替ルート・経由地指定(OSRM)
- **Google Maps の経路インポート**(経路URLの貼り付け / GPX・KMLファイル)
- 出発時刻 or 到着時刻基準、巡航速度±ばらつきのモンテカルロ試行(2,000回、P10/P50/P90)
- 区間別速度: OSRMの道路種別速度を巡航速度にスケール(市街地・ランプは自動減速)、標高データによる上り勾配減速
- 各地点の天気・気温・降水・風向風速・突風(Open-Meteo、16日先まで)。通過時刻レンジ内の最大値も併記
- 予報値からの規制の目安(強風・大雨・降雪・濃霧)。渋滞・規制区間の手入力反映(km区間+速度)

すべてブラウザから公開APIを直接叩くため、**サーバー側の設定・APIキーは不要**。

## 起動方法

### ローカル(開発)

`index.html` を HTTP 配信してブラウザで開く。`file://` で直接開くと、OpenStreetMap のタイルや一部の外部 API がブラウザ制約で 403 になることがあります。

Docker を使うなら:

```bash
docker compose up -d --build
# → http://localhost:8090
```

Docker を使わない場合は、任意の静的 HTTP サーバー経由で `index.html` を開いてください。

### Docker(デプロイ)

```bash
git clone https://github.com/lxzLocus/highway-weather.git
cd highway-weather
docker compose up -d --build
# → http://<ホスト>:8090
```

更新時:

```bash
git pull && docker compose up -d --build
```

### CI済みイメージ(GHCR)を使う場合

main への push で GitHub Actions がイメージをビルドし `ghcr.io/lxzlocus/highway-weather:latest` に push する。デプロイ先では:

```bash
IMAGE=ghcr.io/lxzlocus/highway-weather:latest docker compose up -d
# 更新時
IMAGE=ghcr.io/lxzlocus/highway-weather:latest docker compose pull && \
IMAGE=ghcr.io/lxzlocus/highway-weather:latest docker compose up -d
```

パッケージが private の場合は事前に `docker login ghcr.io`(PAT: `read:packages`)が必要。

## データソース

| 用途 | サービス | 備考 |
|---|---|---|
| ルート | OSRM (router.project-osrm.org / routing.openstreetmap.de) | 区間速度アノテーション使用 |
| 天気 | Open-Meteo Forecast API | 16日先まで、複数地点バッチ |
| 標高 | Open-Meteo Elevation API | 90m DEM。トンネルは地形標高になる点に注意 |
| 地名検索 | Nominatim | 日本国内に限定 |

リアルタイムの渋滞・規制の無料公開APIは存在しないため(JARTICオープンデータは月次CSV)、公式サイト(ドラぷら / NEXCO中日本 / NEXCO西日本 / JARTIC)へのリンクと手入力方式で対応している。
