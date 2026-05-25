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
| P-009 | eBay業務自動化 Phase1 | 稼働中 / 監査整理中 / 読み取り確認待ち | 請求書、領収書、税理士提出書類、eBayインボイス、外注報酬、在庫ログなどのGAS自動化を運用する | `ebay-phase1-audit.md`, `ebay-phase1-system-map.md`, `ebay-phase1-test-plan.md`, `ebay-phase1-improvement-plan.md`, `ebay-automation-phase1-summary.md`, `ebay-phase1-startup-tasks.md`, `alf-phase1-gas-readonly-check-request.md`, `tool-inventory.md` | Alfで本番GAS 12ファイル、トリガー、Script Propertiesキー名、不要候補4ファイル、ダッシュボード/メニューを読み取り確認する。削除・変更・実行は禁止 |
| P-010 | eBay輸出自動化 Phase2 | セットアップ待ち | AI・出品・リサーチ向けに、ベンチマークセラー分析、出品自動化、価格最適化を構築する | `ebay-automation-phase2-summary.md`, `tool-inventory.md` | Phase1不可侵を守りつつ、Apify/Claude/n8n/GASの環境セットアップ7ステップを順番に進める |
| P-011 | カーパーツ管理ツール | 運用開始前確認 / 改善候補あり | 外注リサーチャーのGoogle Sheets取り込み、禁止/重複チェック、SKU採番、Sellsta CSV、給与計算をWebアプリで自動化する | `carparts-manager-import-summary.md`, `tool-inventory.md` | Sellsta CSV実出品テスト、未確認の外注担当者シート、FastAPI起動、担当者DB、GCP認証情報、Sheets権限、CORS/認証設定をAlfで確認する |
| P-012 | 経営防御ダッシュボード v1 | 構想 / データ棚卸し待ち | 売上、実質利益、支出、送料、関税、外注費、固定費、在庫、資金繰りを見える化する | `management-defense-dashboard-plan.md`, `alf-overnight-work-queue.md` | Phase1読み取り確認後、既存データ源から使える項目と不足データを棚卸しする |

## 現在の最優先

1. T-017: Shipping Policy v9 / Rate Tableの未確認項目を、xlsx本体またはeBay画面で確認する。
2. T-023: カーパーツ管理ツールの運用開始前チェックを行い、Sellsta CSV実出品テストとFastAPI/認証まわりを確認する。
3. T-018: 旧チャット成果物ファイルから、リサーチサポートツールと送料/Policy仕様を復元する。
4. T-020: eBay業務自動化 Phase1の本番GAS 12ファイル・トリガー・Script Properties・不要候補4ファイルを、削除なしで読み取り確認する。
5. T-021: eBay輸出自動化 Phase2のセットアップ準備を、APIキー保存なし・1回1タスクで進める。
6. マスター送料体系 v2.0 をマスタースプレッドシートへ反映し、`FIND_CHEAPEST_CARRIER()` を動作確認する。

## 注意

- 口座番号、パスワード、マイナンバー、顧客個人情報などはGitHubに入れない。
- Google Drive内の削除・移動は必ず三神さんの許可を取る。
- 削除、reset、clean、上書きなど不可逆な操作は必ず確認する。
