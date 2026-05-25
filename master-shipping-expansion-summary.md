# マスター送料体系拡張 要約

最終更新: 2026-05-23

## 目的

リサーチサポートツールや既存出品管理ツールで共通利用する、詳細な送料・キャリア比較マスターを作る。

現状の課題:

- リサーチサポートツールの送料は簡易テーブルで、利益計算の精度が低い
- FedEx以外のキャリア料金表が未統合
- キャリアごとにゾーン体系が違う
- 料金改定時に複数ツールを手で直す必要がある

目標:

- 1つのマスター送料表を更新すれば、各ツールの送料計算に反映される
- `FIND_CHEAPEST_CARRIER(weight_kg, country)` のような共通関数で最安キャリアを出す
- 軽量品は `JP_EPL` も候補に入れる
- 必要に応じてExpedited系へ切替できる土台を作る

## マスタースプレッドシート

URL:

`https://docs.google.com/spreadsheets/d/1Yieugd_qfk-1C7WNLx1xlc9vh_PRqie8SLKkWTsCUA8/edit`

## 対象キャリア

| carrier_id | 内容 | 状態 |
|---|---|---|
| FEDEX_FICP | FedEx International Connect Plus | 既存詳細データ確認済み |
| JP_EPL | 日本郵便 国際eパケットライト | 追加データ作成済み |
| DHL_SPEEDPAK | Orange Connex経由DHL | 料金表・公式ゾーン取得済み |
| PEGASUS_DHL | Pegasus PEN-DHL | 料金表作成済み、燃料SC 47.25% |
| OC_ECONOMY | Orange Connex Economy | xlsx版を正とする。US中心 |
| SPEEDPAK_ECONOMY | eBay SpeedPAK Economy | 未確定、保留 |
| PEN-PEI UPS | Pegasus UPS | 現在未使用、取り込まない |

## 確定事項

- `OC_ECONOMY` はPDFではなくxlsxの料金を正とする。
- `PEN-PEI UPS` は現時点で未使用。
- Pegasus燃料サーチャージは自動取得せず、手動入力で運用する。
- Pegasus燃料サーチャージの現在値は `47.25%`。
- `setupMasterV2.gs` で一括取込する方針。
- GAS本体は `gas_12_M2Carrier_v2.js` を `12_M2Carrier.gs` に追記する方針。

## 作成済み成果物

| ファイル | 用途 |
|---|---|
| `setupMasterV2.gs` | マスターシートへ一括取込するApps Script |
| `gas_12_M2Carrier_v2.js` | 最安キャリア・送料取得関数 |
| `shipping_rates_master.csv` | 追加送料表 |
| `carrier_zones_master.csv` | キャリア別ゾーン定義 |
| `carriers_jp_epl_addition.csv` | JP_EPL追加行 |
| `carriers_oc_economy_update.csv` | OC_ECONOMY修正行 |
| `surcharges_pegasus_update.csv` | Pegasus 47.25%更新 |
| `settings_pegasus_update.csv` | Settings側のPegasus更新 |
| `pegasus_all_fees.csv` | Pegasus DHL手数料。UPS分は除外済み |

## 次にやること

1. `setupMasterV2.gs` をマスターシートのApps Scriptへ貼る
2. `setupMasterV2()` を実行する
3. `gas_12_M2Carrier_v2.js` を `12_M2Carrier.gs` 末尾へ追記する
4. `testFindCheapestCarrierV2()` を実行する
5. シート上で `=FIND_CHEAPEST_CARRIER(0.5, "US")` を試す
6. 動作確認後、リサーチサポートツール側へ連携する

## 保留/確認事項

- `SPEEDPAK_ECONOMY` を実運用で使うか
- Pegasusゾーン国マッピングの正式確認
- OC_ECONOMYをUS以外にも使うか
- リサーチサポートツール側の統合方式
- 料金改定時の更新手順をスタッフ運用できるか

## I-004 Shipping Policy / Rate Table連携メモ

2026-05-25、旧チャット取り込みで eBay送料・関税・Shipping Policy設計の目次案を受領した。

このファイルは送料マスター/GAS寄りの正本、`shipping-policy-import-summary.md` はeBay画面上のShipping Policy、Rate Table、除外国、パートスタッフ手順寄りの正本として使い分ける。

接続が必要な論点:

- CPaSS / SpeedPAK / FedEx / DHL / Pegasusの送料データをGoogle Sheets/GASで参照できる形にする。
- 66個のShipping Policyと、重量帯・価格帯・DDP/DDU切替を送料マスター側の計算と一致させる。
- `RT-Light`、`RT-Mid`、`RT-Heavy` の追加送料と高リスク国暫定送料を、利益計算・CSV出力へ反映できるようにする。
- 既存eBay出品のShipping Policy移行CSV構想と、送料マスターの重量・サイズ推定を接続する。
- Pegasus燃油サーチャージ、CPaSS送料表、eBay手数料などは要最新確認として扱う。

## ダッシュボード反映項目

このプロジェクトはダッシュボード上では以下のように表示する。

- ジャンル: 送料・利益計算
- ステータス: 進行中
- 重要度: 最重要
- 担当: マスター送料体系拡張チャット
- 次アクション: `setupMasterV2()` 実行
- ブロッカー: GAS貼付・実行確認
