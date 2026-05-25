# Alf作業パケット: 旧チャット成果物ベース復元

作成日: 2026-05-25

## 背景

旧チャットのremote compactで `context_length_exceeded` が再発し、旧チャット本文からの追加要約取得が困難になった。

以後は旧チャットへ追加指示を送らず、すでに取得済みの目次案と、作成済み成果物ファイルから仕様・未完了タスク・要検証事項を復元する。

## 作業場所

Alf正式作業台:

`/Users/mikami/Documents/GitHub/mikami-operations-official`

## 対象ID

- `chat-import-ledger.md`: I-003, I-004, I-006
- `delegated-tasks.md`: T-016, T-017, T-018
- `projects.md`: P-003, P-004, P-005

## 参照する正本候補

- `research-support-tool-import-summary.md`
- `shipping-policy-import-summary.md`
- `master-shipping-expansion-summary.md`
- `chat-import-ledger.md`
- `delegated-tasks.md`
- `projects.md`
- `handoff.md`

## 復元対象

### 1. eBay輸出リサーチ支援ツール

目的:

- Google Sheets + Google Apps Script構成のリサーチ支援ツール仕様を復元する。
- 仕入候補入力、AI補完、利益計算、Terapeak/オクファン確認、人間の出品OK判断、Sellsta CSV出力までを整理する。

確認したいもの:

- 最新 `Code.gs`
- `appsscript.json`
- 改修提案書
- Genspark用レビュープロンプト
- 利益計算検証プロンプト
- ClaudeCode引き継ぎプロンプト
- CSV/HTML/JS補助ファイル

出力:

- 最新仕様
- 古い仕様
- シート列構成
- 利益計算ロジック
- Sellsta CSV出力仕様
- 未実装改修案
- 要検証事項

### 2. 送料・関税・Shipping Policy

目的:

- eBay Shipping Policy、Rate Table、除外国、高リスク国、CPaSS/SpeedPAK/FedEx/DHL/Pegasus送料データの仕様を復元する。

確認したいもの:

- `Triad_Shipping_Policy_Master_v9_通し番号.xlsx`
- `Triad_Rate_Tables_詳細版_国名.xlsx`
- `Triad_eBay_Setup_Guide_for_Part_Staff.docx`
- `Genspark相談用プロンプト.md`
- 各種旧バージョン v1-v7
- PDFフローチャート類
- Word運用マニュアル類
- 送料マスター関連CSV/GAS

出力:

- 最新66ポリシー体系
- DDP/DDU切替ルール
- 3Rate Table仕様
- 高リスク国・除外国対応
- CPaSS送料マスター化に必要なデータ構造
- 既存出品のShipping Policy移行CSV構想
- パートスタッフ向け手順の更新点
- 要最新確認事項

## 禁止事項

以下は保存しない。

- APIキー
- eBayログイン情報
- 個人メールアドレス
- パスワード
- 口座番号
- マイナンバー
- 顧客個人情報
- 取引先との契約条件の詳細

## 完了条件

- 必要な成果物ファイルの所在を確認した。
- `research-support-tool-import-summary.md` と `shipping-policy-import-summary.md` を、成果物ベースで更新した。
- 必要に応じて `projects.md`、`delegated-tasks.md`、`handoff.md` を更新した。
- `git status` で変更内容を確認した。
- 問題なければcommitした。
- `git push origin main` でGitHubへ反映した。
- 最後にFayへ、何を復元し、何が未確認かを短く報告した。

## Alfへ渡す本文

```text
この作業はアルフで進めてください。
作業場所:
/Users/mikami/Documents/GitHub/mikami-operations-official

背景:
旧チャットのremote compactで context_length_exceeded が再発し、旧チャット本文からの追加要約取得が困難になりました。
以後は旧チャットへ追加指示を送らず、すでに取得済みの目次案と作成済み成果物ファイルから仕様・未完了タスク・要検証事項を復元してください。

対象:
- I-003 eBay輸出リサーチ支援ツール目次案
- I-004 eBay送料・関税・Shipping Policy目次案
- I-006 remote compact再失敗
- T-016, T-017, T-018

参照ファイル:
- research-support-tool-import-summary.md
- shipping-policy-import-summary.md
- master-shipping-expansion-summary.md
- chat-import-ledger.md
- delegated-tasks.md
- projects.md
- handoff.md

作業内容:
1. 既存成果物ファイルの所在を確認してください。
2. リサーチ支援ツールについて、最新仕様、古い仕様、シート列構成、利益計算、Sellsta CSV仕様、未実装改修案、要検証事項を復元してください。
3. Shipping Policyについて、最新66ポリシー体系、DDP/DDU切替、3Rate Table、高リスク国/除外国、CPaSS送料マスター化、既存出品移行CSV構想、パートスタッフ手順を復元してください。
4. APIキー、ログイン情報、個人メールアドレス、顧客個人情報、口座番号、パスワード、マイナンバー、取引先契約条件の詳細は保存しないでください。
5. 復元した内容を research-support-tool-import-summary.md と shipping-policy-import-summary.md に反映し、必要に応じて projects.md、delegated-tasks.md、handoff.md も更新してください。

完了条件:
- 必要なファイルを作成・更新した
- handoff.md に作業内容と次のアクションを残した
- git status で変更内容を確認した
- 問題なければ commit した
- git push origin main でGitHubへ反映した
- 最後に、何を復元し、何が未確認かを短く報告した

注意:
- 不明点があれば、作業を止めて三神さんに短く質問してください。
- 推測で大きな判断をしないでください。
- 削除や不可逆な操作は必ず確認してください。
```
