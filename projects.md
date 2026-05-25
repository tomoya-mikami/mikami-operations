# プロジェクト一覧

最終更新: 2026-05-25

## 目的

Fay / Alf / Codex / Claude が、現在進行中の仕事を見失わないためのプロジェクト台帳です。

詳細な分割作業は `delegated-tasks.md`、ツール棚卸しは `tool-inventory.md`、再構築方針は `tool-rebuild-plan.md` を参照します。

## 事業プロジェクト

| プロジェクト | 状態 | 目的 | 次アクション |
|---|---|---|---|
| 融資相談 | 確認待ち | 関税問題による売上低迷と資金繰りへの対応。I-008で公庫・信金面談準備情報を受領 | 2026-05-13/14面談結果、必要な追加資料、BREMEN創業計画書の最終数値を確認する |
| 無線機カテゴリ販売戦略 | 進行中 | eBay等のバイオレーション影響で出品取り下げが続く状況への対応 | 出品可能性、代替チャネル、国内販売の選択肢を整理する |
| 関税・送料処理フロー改善 | 進行中 | 支払い処理とコスト構造を見直し、利益計算の精度を上げる | I-004のShipping Policy/Rate Table目次を起点に、66ポリシー、Rate Table、除外国、高リスク国、送料マスター連携を詳細化する |
| 国内販売チャネル立ち上げ | 準備中 | 海外販売に加えて国内販売を並行展開する | 対象商品、販売先、運用フローを整理する |
| グループホーム事業 | 準備中 / 確認待ち | 新規事業としてグループホーム経営を立ち上げる。I-008でBREMEN創業計画書の準備情報を受領 | 面談結果、創業計画書xlsx、収支シミュレーション正本、印刷セットの差分を確認する |

## システム / ツールプロジェクト

| ID | プロジェクト | 状態 | 目的 | 成果物 / 参照先 | 次アクション |
|---|---|---|---|---|---|
| P-001 | GitHub共通作業台 / Alf・Fay運用 | 進行中 | スマホ・ノートPC・デスクトップPC・Codex・Claude間で作業を引き継ぐ | `handoff.md`, `desktop-codex-prompt.md`, `delegated-tasks.md` | Alf側で `desktop-codex-prompt.md` を読み込み、commit/push運用をテストする |
| P-002 | 引き継ぎ・オートセーブ運用 | 進行中 | チャット上限前に次スレッドへ安全に引き継ぐ | `handoff.md`, `意思決定ログ.md` | 進捗が出るたびに更新し、長文化したら早めに知らせる |
| P-003 | マスターファイル / 既存出品ポリシー変更ツール | 進行中 | 既存eBay出品のShipping Policyを見直す | マスタースプレッドシート、各GAS、Sellsta CSV、`shipping-policy-import-summary.md` | I-004を起点に、既存出品CSVから適切な新Shipping Policyを判定する移行仕様を詳細化する |
| P-004 | リサーチサポートツール | 進行中 | 仕入候補からSellsta出品CSVを作る | リサーチサポートスプレッドシート、`research-support-tool-import-summary.md` | I-003の目次案を起点に、最新Code.gs仕様、利益計算、列構成、未実装案、禁止事項の詳細要約を取り込み、古い14/17/20列案と最新22列案を分離する |
| P-005 | マスター送料体系 v2.0 | 進行中 | JP_EPL/DHL/Pegasus/OC/SpeedPAK等を含む共通送料マスターを作る | `master-shipping-expansion-summary.md`, `shipping-policy-import-summary.md` | `setupMasterV2()` 実行、GAS関数追加、動作確認に加え、Shipping Policy/Rate Table設計との接続を確認する |
| P-006 | 業務ツール棚卸し・再構築 | 整理中 | 乱立したツールを分類し、必要/不要を判断して再構築する | `tool-inventory.md`, `tool-rebuild-plan.md` | 追加チャット履歴を読み込み、全体台帳を完成する |
| P-007 | ツール管理ダッシュボード | 構想中 | ツール一覧、進捗、成果物、未完了タスクを見える化する | 未作成 | まずはMarkdown/Google Sheets/HTML案で最小構成を検討する |
| P-008 | 引き継ぎ運用スライド | 完了 | Fay/Alf/スマホ/GitHubの引き継ぎ運用を後で見返せる形にする | `presentations/fay-alf-handoff-guide.pptx` | 必要に応じて更新版を作る |
| P-009 | eBay業務自動化 Phase1 | 稼働中 / 拡張検討 | 請求書、領収書、税理士提出書類、eBayインボイス、外注報酬、在庫ログなどのGAS自動化を運用する | `ebay-automation-phase1-summary.md`, `tool-inventory.md` | Manus AI向けWebダッシュボード仕様書を作成し、請求書管理機能追加と不要GAS4ファイル削除要否を判断する |

## 現在の最優先

1. Alf運用のcommit/pushテスト。
2. マスター送料体系 v2.0 をマスタースプレッドシートへ反映。
3. `FIND_CHEAPEST_CARRIER()` の動作確認。
4. リサーチサポートツールの簡易送料テーブルを、マスター送料体系参照へ移行。
5. 業務ツール棚卸しを更新し、残す/統合/保留/廃止候補を確定。

## 注意

- 口座番号、パスワード、マイナンバー、顧客個人情報などはGitHubに入れない。
- Google Drive内の削除・移動は必ず三神さんの許可を取る。
- 削除、reset、clean、上書きなど不可逆な操作は必ず確認する。
