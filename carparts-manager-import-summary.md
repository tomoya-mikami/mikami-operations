# カーパーツ管理ツール 取り込み要約

最終更新: 2026-05-25

## 取り込み判定

| 項目 | 内容 |
|---|---|
| 取り込みID | I-011 |
| 分類 | カーパーツ管理ツール / Manus Webdev / eBayカーパーツ / Sellsta CSV / 外注管理 |
| 重要度 | 高 |
| 緊急度 | 高 |
| 状態 | 進行中 / 運用開始前確認あり |
| Alf依頼 | 必要 |

## 概要

`carparts-manager` は、eBayカーパーツ輸出のリサーチ取り込みからSellsta用CSV生成、SKU採番、禁止品番・重複チェック、給与計算までをWebアプリで扱うための管理ツール。

対象バージョンは Manus Webdev チェックポイント `72a64d3f`。公開URLは元資料に記載あり。

この要約では、スプレッドシートID、サービスアカウント、DB接続文字列、APIキー、Secrets値、個人情報に該当しうる情報は重複保存しない。必要時は元資料またはManus管理画面で確認する。

## 目的

- 外注リサーチャーの個別Google Sheetsから商品情報を取り込む。
- 禁止品番、生産終了、納期未定、既存品番重複をチェックする。
- SKUを自動採番し、共有スプレッドシートへ転記する。
- 取り込み結果を外注シートへ書き戻す。
- Sellsta向けCSVを出力する。
- 担当者別の月次件数と給与を計算する。

## システム構成

| レイヤー | 内容 |
|---|---|
| フロント / BFF | React 19、TypeScript、Tailwind CSS、shadcn/ui、Wouter、Node.js、Express、tRPC、Drizzle |
| バックエンド | Python 3.11、FastAPI、gspread、APScheduler、PyMySQL |
| DB | TiDB Cloud Serverless |
| 認証 | Manus OAuth |
| 外部連携 | Google Sheets API、Sellsta CSV |

構成上、Node.jsサーバーとFastAPIサーバーの2プロセスが動く。Manus側のNode.jsはWebdev管理対象、FastAPIは手動起動・管理が必要。

## 主要データ

### DBテーブル

- `users`: Manus OAuthユーザー。
- `staff_members`: 外注リサーチャー、パートスタッフ、給与条件、外注シート設定。
- `import_logs`: 取り込みログ。
- `description_templates`: CSV説明文テンプレート。
- `app_settings`: 自動同期などのアプリ設定。

### スプレッドシート

- 共有シート、禁止リスト、テンプレートの3系統がある。
- 元資料にはIDが記載されているが、この要約には重複保存しない。
- サービスアカウントJSON本体、認証情報、Secrets値は保存禁止。

## 実装済み機能

| 機能 | 状態 | メモ |
|---|---|---|
| データ取り込みパイプライン | 実装済み | 未処理行の取り込み、禁止/重複判定、SKU採番、共有シート転記、外注シート書き戻し |
| SKU採番 | 実装済み | `[A-Z][1-9][A-Z]` 形式、最大6,084件 |
| Sellsta CSV出力 | 実装済み / 実出品テスト待ち | 52列、UTF-8 BOM付き。Sellsta側受入確認が最優先 |
| 品番バリデーション | 実装済み / 実データ確認待ち | T列と品番1-20列の整合性確認 |
| 給与計算 | 実装済み | 取り込み件数、単価、インセンティブをもとに算出 |
| 自動同期 | 実装済み / 復元挙動確認待ち | APScheduler。FastAPI再起動時の復元に注意 |
| 管理画面 | 実装済み | 取り込み、集計、給与、SKU、CSV、担当者、設定、バリデーション |

## 運用開始前の最優先確認

| 優先 | 確認項目 | 担当 | 状態 |
|---|---|---|---|
| 1 | Sellsta CSVの実出品テスト | Alf / Manus | 未完了 |
| 2 | 未確認の外注担当者シートの列構成と取り込みテスト | Alf / Manus | 未完了 |
| 3 | FastAPIサーバー起動確認 | Alf / Manus | 未確認 |
| 4 | GCPサービスアカウント認証情報の安全な配置確認 | Alf / Manus | 未確認 |
| 5 | `staff_members` の担当者種別、シート設定、給与条件確認 | Alf / Manus | 未確認 |
| 6 | Sheets共有権限と禁止リスト参照権限確認 | Alf / Manus | 未確認 |

## 高優先の改善候補

- FastAPI設定をDBまたはSecretsに永続化する。
- 取り込みログをUIで一覧表示する。
- Sellsta出品後のeBay出品済フラグ管理フローを作る。
- FastAPIのCORSを本番URLに絞る。
- FastAPI直アクセス時の認証・ネットワーク保護を確認する。

## 中低優先の改善候補

- eBay File Exchange形式CSV生成。
- 担当者別CSVの一括/ZIP出力。
- ディスクリプションテンプレート編集UIとFastAPI側読み込み。
- SKUフォーマット拡張。
- 禁止リストのキャッシュ改善。
- 品番バリデーション画面の視認性改善。
- 統計グラフ強化。
- Chatwork等への通知。
- モバイル表示改善。

## セキュリティ注意

- `credentials.json`、サービスアカウントJSON、DB接続文字列、`JWT_SECRET`、APIキー、Chatworkトークンは保存しない。
- Google Sheets IDやサービスアカウントメールはアクセス情報に近いため、必要時のみ元資料またはManus管理画面で確認する。
- FastAPIが外部から直接到達できる構成の場合、認証なしAPIにならないか要確認。
- CORS全許可は本番運用前に見直す。
- 担当者削除は取り込みログや履歴に影響する可能性があるため、三神さん確認なしに実行しない。

## 参照元

- `/Users/tomoya/Downloads/カーパーツ管理ツール — ユーザーマニュアル.md`
- `/Users/tomoya/Downloads/カーパーツ管理ツール — 現状の課題と今後の改善案.md`
- `/Users/tomoya/Downloads/manus_final_prompt.md`

## Alfへ渡す作業

詳細は `delegated-tasks.md` の T-023 と `alf-import-triage-packet.md` を参照する。

Alf側では、Manus Webdev上で実機確認を行い、確認結果だけをこの正本へ戻す。Secrets値、認証JSON、個人情報は貼らない。
