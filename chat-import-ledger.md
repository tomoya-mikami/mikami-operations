# 旧チャット取り込み台帳

最終更新: 2026-05-25

## 目的

財務担当チャット、リサーチチャット、送料・ツール開発チャットなど、過去チャットから出力された要約を受け取り、重要度・進捗・反映状況を一覧化する。

チャット本文を正本にせず、この台帳と各管理ファイルを正本にする。

## 運用ルール

- 受付チャットは原則1つ: `旧チャット取り込み - 受付`
- 大量または分野別に分ける場合も、最終的にはこの台帳へ集約する。
- Fayが重要度、緊急度、状態、反映先、Alf依頼要否を判断する。
- 3-5件たまった、または反映量が多い場合はAlfへ渡す。
- 取り込みチャットが長くなってきたら、いっぱいになる前にAlfへ反映作業を渡す。
- パスワード、口座番号、マイナンバー、顧客個人情報は記録しない。

## ステータス定義

- `未整理`: 受け取ったが分類前
- `分類済`: 重要度・反映先まで判断済み
- `反映中`: FayまたはAlfが管理ファイルへ反映中
- `反映済`: 管理ファイルへ反映済み
- `確認待ち`: 三神さん確認が必要
- `保留`: 今は進めない
- `要最新確認`: 税務、金融、法律、規約、料金など最新確認が必要

## 取り込み一覧

| ID | 受付日 | 元チャット/分野 | テーマ | 重要度 | 緊急度 | 状態 | 反映先 | Alf依頼 | 次アクション |
|---|---|---|---|---|---|---|---|---|---|
| I-001 | 2026-05-25 | 運用設計 | 旧チャット取り込み方法 | 高 | 中 | 反映済 | `chat-import-protocol.md`, `delegated-tasks.md`, `handoff.md` | 不要 | 旧チャット要約を受け取り次第、この台帳へ追加する |
| I-002 | 2026-05-25 | 運用設計 | 受付チャット開始 | 高 | 中 | 反映済 | `chat-import-ledger.md`, `delegated-tasks.md` | 不要 | 以後、三神さんが貼る旧チャット要約をFayが取り込み要約として扱う |
| I-003 | 2026-05-25 | リサーチ / ツール | eBay輸出リサーチ支援ツール目次案 | 高 | 中 | 反映中 | `research-support-tool-import-summary.md`, `projects.md`, `delegated-tasks.md`, `handoff.md` | 必要 | 最新Code.gs仕様、利益計算、列構成、未実装案、禁止事項を詳細要約として受け取り、旧仕様と最新仕様を分離して反映する |
| I-004 | 2026-05-25 | 送料 / Shipping Policy | eBay送料・関税・Shipping Policy目次案 | 高 | 高 | 反映中 | `shipping-policy-import-summary.md`, `master-shipping-expansion-summary.md`, `projects.md`, `delegated-tasks.md`, `handoff.md` | 必要 | Rate Table、除外国、CPaSS送料マスター、既存出品移行、パート手順を詳細要約として受け取り、最新マスターと古い方針を分離する |
| I-005 | 2026-05-25 | 運用エラー | remote compact context_length_exceeded | 中 | 高 | 反映済 | `chat-import-protocol.md`, `handoff-risk-register.md`, `handoff.md` | 不要 | 旧チャット全体の圧縮ではなく、テーマ単位・Part分割で要約を作る |
| I-006 | 2026-05-25 | 運用エラー | remote compact再失敗 | 高 | 高 | 反映済 | `chat-import-protocol.md`, `delegated-tasks.md`, `handoff.md`, `alf-old-chat-artifact-recovery-packet.md` | 必要 | 旧チャットへの追加指示を止め、既存の目次案と成果物ファイルからAlfで詳細復元する |
| I-007 | 2026-05-25 | 送料 / Shipping Policy | Triad eBay輸出 Shipping Policy v9詳細目次 | 高 | 高 | 反映中 | `shipping-policy-import-summary.md`, `master-shipping-expansion-summary.md`, `delegated-tasks.md`, `handoff.md`, `alf-old-chat-artifact-recovery-packet.md` | 必要 | v9確定値、Rate Table作業中項目、除外国、成果物、配送業者別データを反映。アカウント名等の機密寄り情報は保存しない |
| I-008 | 2026-05-25 | 財務 / 融資 | 公庫面談準備・BREMEN創業計画目次 | 高 | 高 | 確認待ち / 古い可能性あり | `financing-import-summary.md`, `projects.md`, `delegated-tasks.md`, `handoff.md` | 必要 | 2026-05-13/14面談結果、BREMEN創業計画書xlsx最終値、印刷チェックリスト差分を確認。個人借入・本人確認書類等は保存しない |
| I-009 | 2026-05-25 | ツール / eBay業務自動化 | eBay業務自動化 Phase1 目次 | 高 | 中 | 進行中 | `ebay-automation-phase1-summary.md`, `tool-inventory.md`, `projects.md`, `delegated-tasks.md`, `handoff.md` | 必要 | 稼働中GAS12ファイル、定期トリガー、絶対ルール、Webダッシュボード要望を反映。APIトークン、ChatworkルームID、外注個人情報、eBayアカウント名は保存しない |

## 見える化の観点

Fayは取り込みが増えたら、以下の形で集計する。

| 観点 | 出す内容 |
|---|---|
| 分野別 | 財務、リサーチ、送料、ツール、国内販売、グループホームなど |
| 重要度別 | 高/中/低の件数と、高重要度タスク一覧 |
| 状態別 | 未整理、進行中、確認待ち、反映済、保留 |
| ブロッカー別 | 三神さん確認待ち、原資料待ち、最新情報確認待ち、Alf作業待ち |
| 次アクション別 | 今日やる、今週やる、後でよい、保留 |

## 受付チャットが長くなった時の合図

Fayは以下の状態になったら、三神さんへ知らせる。

- 取り込み要約が5件以上たまった。
- 1件あたりの要約が長い。
- 未反映の重要事項が複数ある。
- 同じ分野の要約が重複し始めた。
- 受付チャット内だけでは全体把握しにくくなった。

通知文:

```text
取り込みが増えてきました。ここで一度Alfへ渡して、台帳化・ファイル反映・commit/pushまで進めます。
```
