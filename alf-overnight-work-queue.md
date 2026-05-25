# Alf作業キュー

最終更新: 2026-05-26

## 目的

三神さんが不在または就寝中でも、Alf側で次に確認すべき作業が迷子にならないようにする。

## 現在の最優先

### A-001: eBay業務自動化 Phase1 本番GAS読み取り確認

状態: 確認待ち / 認証済み読み取り経路待ち

参照:

- `alf-phase1-gas-readonly-check-request.md`
- `ebay-phase1-startup-tasks.md`
- `ebay-phase1-audit.md`
- `ebay-phase1-test-plan.md`

やること:

- 本番GAS 12ファイルの実在確認。
- トリガー一覧確認。
- Script Propertiesのキー名だけ確認。
- 不要候補4ファイルの実在確認。
- ダッシュボード/メニューの有無確認。

禁止:

- 削除しない。
- 変更しない。
- GAS関数を実行しない。
- トリガーを変更しない。
- Script Propertiesの値を保存しない。
- Google Driveファイルを削除・移動しない。

成果物:

- `ebay-phase1-readonly-check-result.md`

2026-05-26 Alf結果:

- Alf環境では `clasp` / `gcloud` / 既存clasp認証が見つからず、本番GASの実体読み取りは未完了。
- 削除・変更・実行・トリガー変更・Script Properties値保存・Drive操作は行っていない。
- 次はブラウザ目視確認、または `clasp` などの読み取り用認証経路整備が必要。

### A-002: 経営防御ダッシュボード用データ棚卸し

状態: A-001完了後

参照:

- `management-defense-dashboard-plan.md`
- `ebay-automation-phase1-summary.md`
- `ebay-phase1-audit.md`

やること:

- eBay売上一覧表、円換算スプレッドシート、外注費一覧、メルカード利用明細、在庫ログのうち、経営防御ダッシュボードに使える項目を整理する。
- 削除・移動・変更はしない。
- シート名、列名、月次更新状況、足りないデータを確認する。

成果物:

- `management-dashboard-data-inventory.md`

### A-003: Phase1の使いやすさ改善仕様

状態: Fay暫定仕様作成済み / A-001完了後に実体確認

参照:

- `ebay-phase1-improvement-plan.md`
- `ebay-phase1-system-map.md`
- `ebay-phase1-test-plan.md`
- `ebay-phase1-operations-ui-spec.md`

やること:

- GASエディタで関数を探して実行しなくて済む運用を設計する。
- スプレッドシートメニュー改善案、実行ログ、月次チェックリスト、Webダッシュボード案をまとめる。

成果物:

- `ebay-phase1-operations-ui-spec.md`

## Fayへ戻す内容

Alf作業後は、以下を `handoff.md` または結果ファイルに残す。

- 実施した確認
- 確認できたこと
- 未確認事項
- 実行してよいテスト案
- 三神さん確認が必要な操作
- 次にFayが判断すべきこと
