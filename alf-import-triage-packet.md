# Alf作業パケット: 旧チャット取り込み後の実作業振り分け

作成日: 2026-05-25

## 作業場所

`/Users/mikami/Documents/GitHub/mikami-operations-official`

または永続worktree:

`/Users/mikami/.codex/worktrees/ebe0/mikami-operations-official`

## 背景

Fay側で旧チャット取り込み I-003 から I-010 までを受け付け、正本Markdownへ一次反映済み。

取り込み量が多く、成果物ファイル確認、GAS/n8n/CSV整理、Shipping Policy/Rate Table確認が必要なため、Alfで実作業を進める。

## 優先順位

### 0. カーパーツ管理ツール運用開始前確認

対象:

- I-011
- T-023

参照:

- `carparts-manager-import-summary.md`
- `/Users/tomoya/Downloads/カーパーツ管理ツール — ユーザーマニュアル.md`
- `/Users/tomoya/Downloads/カーパーツ管理ツール — 現状の課題と今後の改善案.md`
- `/Users/tomoya/Downloads/manus_final_prompt.md`

やること:

- Sellsta CSVの実出品テスト手順を確認し、可能なら1件テストする。
- 未確認の外注担当者シートの列構成と取り込み動作を確認する。
- FastAPIサーバーの起動状態を確認する。
- `staff_members` の担当者種別、シート設定、給与条件を確認する。
- GCPサービスアカウント認証情報とGoogle Sheets共有権限を確認する。
- FastAPIのCORS全許可、直接アクセス時の認証なしAPIリスクを確認する。
- Secrets値、認証JSON、DB接続文字列、APIキー、個人情報は正本へ保存しない。

### 1. Shipping Policy v9 / Rate Table確認

対象:

- I-004
- I-007
- T-017

参照:

- `shipping-policy-import-summary.md`
- `master-shipping-expansion-summary.md`

やること:

- RT-LightのAfrica追加状況を確認。
- RT-MidのEurope USD 75修正、Canada行追加を確認。
- RT-HeavyのAntigua and Barbuda有無を確認。
- Sri LankaをAsia-Wideか高リスク群へ入れるか、判断待ち項目として整理。
- 66ポリシー登録、旧11ポリシー付替、旧削除の状態を確認。
- CPaSS/SpeedPAK/FedEx/DHL/PegasusデータをGAS/Sheets用CSVまたはJSONへ構造化するための未完了タスクを整理。

### 2. 旧チャット成果物ベース復元

対象:

- I-003
- I-006
- T-016
- T-018

参照:

- `alf-old-chat-artifact-recovery-packet.md`
- `research-support-tool-import-summary.md`
- `shipping-policy-import-summary.md`

やること:

- 旧チャット本文ではなく、作成済み成果物ファイルから仕様を復元する。
- リサーチサポートツールの最新Code.gs、利益計算、22列構成、Sellsta CSV仕様を確認。
- 古い14/17/20列案、古い利益計算、古いCSV仕様を分離する。

### 3. eBay業務自動化 Phase1整理

対象:

- I-009
- T-020

参照:

- `ebay-automation-phase1-summary.md`
- `tool-inventory.md`

やること:

- 本番GAS12ファイルと定期トリガーを確認。
- `deleteRow` 禁止、日本語Gmailラベル禁止、実行指示形式の絶対ルールを維持。
- 不要4ファイル削除は、実害なし・三神さん確認待ちとして保留。
- Webダッシュボード仕様書作成前に、現行機能と未完了要望を整理する。

### 4. eBay輸出自動化 Phase2整理

対象:

- I-010
- T-021

参照:

- `ebay-automation-phase2-summary.md`
- `tool-inventory.md`

やること:

- Phase1不可侵を守る。
- 7ステップのうち、現時点で実行可能な準備と、三神さん側のAPIキー取得が必要なものを分ける。
- eBay Seller Hub CSV仕様、Apify UI、Claude/Apify/n8n料金は最新確認待ちにする。
- APIキー、トークン、Chatwork情報は保存しない。

## Fay側確認待ち

T-019 融資・BREMEN創業計画は、先にFayが三神さんへ以下を確認する。

- 2026-05-13/14の面談結果。
- 追加資料の有無。
- 次回対応。

結果が出てから、必要ならAlfでxlsxや印刷セットを確認する。

## 完了条件

- 必要なMarkdownを更新した。
- `handoff.md` に作業内容と次アクションを残した。
- `delegated-tasks.md` の状態を更新した。
- `git status` で変更内容を確認した。
- 問題なければcommitした。
- `git push origin main` でGitHubへ反映した。
- Fayへ、完了したこと・未確認のこと・次に三神さんへ聞くことを短く戻した。

## 禁止事項

- 削除、reset、clean、強制pushをしない。
- Google Driveファイルを削除・移動しない。
- APIキー、トークン、ログイン情報、口座番号、マイナンバー、顧客個人情報を保存しない。
- Phase1の稼働中6システムを勝手に変更しない。
