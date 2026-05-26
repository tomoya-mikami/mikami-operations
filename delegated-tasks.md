# 分割作業・チャット管理台帳

最終更新: 2026-05-26

## 2026-05-26 Alf追記

T-020 / T-024 を中心に、AlfでPhase1安全運用と経営防御ダッシュボードv1の整理を進めた。

完了:

- `phase1-management-work-summary.md` を作成し、現在終わっていること、課題、次アクションを整理。
- `management-defense-dashboard-v1-spec.md` を作成し、Google Sheets版の経営防御ダッシュボードv1仕様を整理。
- `ebay-phase1-safe-operations-runbook.md` を作成し、Phase1の見るだけ/ドライラン/確認後実行/禁止操作を整理。
- `ebay-phase1-needs-review-move-plan.md` を作成し、`00_要確認` の分類別移動先候補を整理。
- `alf-to-fay-management-phase1-handoff.md` を作成し、Fayへ返す要点を整理。
- `management-dashboard-data-inventory.md` を更新し、本番GASとDrive構造の確認済み状態を反映。

未完了:

- 経営防御ダッシュボードの実シート作成。
- `00_要確認` のマスク済み個別移動予定リスト作成。
- 実列名確認。
- Script Propertiesキー名確認。

次アクション:

- T-020: 実移動せず、`00_要確認` の移動予定リストを作る。
- T-024: 既存本番GASを変更せず、別シート/別タブで経営防御ダッシュボードv1を試作する。

## 目的

このファイルは、フェイが司令塔として、別チャット・アルフ・サブエージェント・他AIに分けた仕事を管理するための台帳です。

記録すること:

- どのチャット/端末/AIで作業したか
- 何を目的に分けたか
- 現在どこまで進んでいるか
- 成果物はどこにあるか
- この秘書チャットへ反映済みか
- 次に何をするか

## 管理ルール

- 三神さんは基本的にフェイへ依頼する。
- フェイが必要に応じて、アルフ・専用チャット・サブエージェントへ分ける。
- 分けた作業は必ずこの台帳へ登録する。
- 作業が終わったら、結果・成果物・次アクションをこの台帳へ戻す。
- 削除・移動・不可逆な整理は、必ず三神さんの許可を取る。

## ステータス定義

- `受付`: 依頼を受けたが未整理
- `整理中`: 内容を読んで分類中
- `進行中`: 作業中
- `確認待ち`: 三神さんの判断待ち
- `完了`: 成果物作成・反映済み
- `保留`: 今は進めない
- `廃止候補`: 機能重複や不要の可能性あり

## 台帳

| ID | 仕事名 | 担当/場所 | ステータス | 目的 | 成果物/保存先 | 次アクション | 秘書反映 |
|---|---|---|---|---|---|---|---|
| T-001 | マスターファイル / 既存出品ポリシー変更ツール | このチャット / マスタースプシ / 必要に応じてAlf | 進行中 | 既存eBay出品のShipping Policy見直し | マスタースプレッドシート、各GAS、Sellsta CSV、`shipping-policy-import-summary.md` | I-004を受領。既存出品CSVから新Shipping Policyへ移行する構想、Rate Table、除外国、高リスク国対応を詳細要約で確認する | 一部済 |
| T-002 | リサーチサポートツール | リサーチチャット / 必要に応じてAlf | 進行中 | 仕入候補からSellsta出品CSVを作る | リサーチサポートスプレッドシート、`research-support-tool-import-summary.md` | 目次案 I-003 を受領。最新Code.gs仕様、利益計算、列構成、未実装案、禁止事項の詳細引き継ぎを取り込み、旧仕様と最新仕様を分離する | 一部済 |
| T-003 | マスター送料体系拡張 | 専用チャット / 必要に応じてAlf | 進行中 | FedEx以外のJP_EPL/DHL/Pegasus/OC/SpeedPAK対応 | `setupMasterV2.gs`, `gas_12_M2Carrier_v2.js`, `shipping_rates_master.csv`, `carrier_zones_master.csv`, `shipping-policy-import-summary.md` など | I-004を受領。CPaSS/SpeedPAK/FedEx/DHL/Pegasus送料表をGoogle Sheets/GAS参照用マスターへつなぐ詳細を確認する | 反映中 |
| T-004 | ツール群棚卸し・再構築プロジェクト | フェイ | 整理中 | 乱立したツールを分類し、必要/不要を判断して再構築する | `tool-inventory.md`, `tool-rebuild-plan.md` | 追加チャット履歴を読み込み、全体台帳を完成 | 進行中 |
| T-005 | 引き継ぎ・オートセーブ運用 | フェイ / アルフ | 進行中 | チャット上限前に次スレッドへ安全に引き継ぐ | `handoff.md`, `意思決定ログ.md`, `delegated-tasks.md` | 進捗が出るたびに更新し、長文化したら早めに三神さんへ知らせる | 済 |
| T-006 | GitHub共通作業台 / Alf・Fay運用 | Fay / Alf / GitHub | 進行中 | 複数端末・複数AI間で作業ログと成果物を迷子にしない | `mikami-operations`, `handoff.md`, `desktop-codex-prompt.md` | Alf側で永続worktree再開確認済み。commit/push結果をFayへ戻す | 反映済 |
| T-007 | Alf依頼フローテスト | Fay / Alf代替サブエージェント | 完了 | FayからAlfへ依頼する形式が成立するか確認する | `alf-test-request.md` | 実際のAlfへ渡す場合は作業場所を明記して依頼する | 済 |
| T-008 | 新チャット起動プロトコル | Fay | 完了 | 毎回長い設定を貼らずにFayとして再開できるようにする | `START_HERE.md`, `AGENTS.md`, `handoff.md` | 新チャットでは「Fay、START_HERE.mdから再開して。」だけで再開する | 済 |
| T-009 | CLI認証・引き継ぎリスク対策 | Fay | 完了 | CLI pushを可能にし、複数端末運用のリスクと対策を整理する | `handoff-risk-register.md`, `handoff.md`, `意思決定ログ.md` | 以後、端末間作業ではリスク台帳の標準チェックリストを使う | 済 |
| T-010 | 安全作業の確認省略ルール | Fay | 完了 | 保存・commit/pushのたびに確認せず、スムーズに進める | `START_HERE.md`, `handoff.md`, `意思決定ログ.md` | 削除・不可逆操作・機密情報関連だけ確認する | 済 |
| T-011 | 三神さん向け引き継ぎ手順書 | Fay | 完了 | 新チャット・Alf・スマホ運用で三神さんがやることを短くまとめる | `handoff-runbook.md` | 新チャットでは「Fay、START_HERE.mdから再開して。」を使う | 済 |
| T-012 | Fay/Alf相互再開プロンプト | Fay / Alf | 完了 | 片方のチャットがいっぱいになった時、もう片方が新チャット移行を支援する | `alf-restart-prompt.md`, `fay-restart-prompt.md` | Alf満杯時はFay、Fay満杯時はAlfが再開プロンプトを作る | 済 |
| T-013 | Fay/Alf引き継ぎ運用スライド | Fay | 完了 | 後で見返せるように、引き継ぎ方法と運用ルールをスライド化する | `presentations/fay-alf-handoff-guide.pptx` | 必要なら内容を更新して再出力する | 済 |
| T-014 | 永続worktree移行 | Fay / 新Codexプロジェクト | 確認待ち | 秘書運用の正本を、Codexの永続worktreeプロジェクトへ移す | `persistent-worktree-migration.md` | 三神さんが永続worktree採用を最終決定したら、新プロジェクトを作成し、移行対象ファイルを反映する | 反映中 |
| T-015 | 旧チャット情報取り込み | Fay / 必要に応じてAlf | 進行中 | 財務担当チャットなど過去チャットの内容を、文脈上限を超えない形で秘書ハブへ集約する | `chat-import-protocol.md`, `chat-import-ledger.md` | このチャットを受付として、貼られた要約ごとに重要度・緊急度・状態・反映先を判断。3-5件たまったらAlfへ反映作業を渡す | 進行中 |
| T-016 | I-003 リサーチサポートツール詳細反映 | Alf候補 / 正式作業台 | 受付 | eBay輸出リサーチ支援ツールの旧チャット目次案を、最新仕様・旧仕様・要検証・未実装案に分けて正本化する | `research-support-tool-import-summary.md`, `chat-import-ledger.md` | 詳細引き継ぎ要約を受け取り次第、テーマ別メモ、`projects.md`、`delegated-tasks.md`、必要なら `tool-inventory.md` / `tool-rebuild-plan.md` へ反映する | 未 |
| T-017 | I-004/I-007 送料・Shipping Policy詳細反映 | Alf / 正式作業台 | 確認待ち | eBay送料・関税・Shipping Policy/Rate Table設計を、最新マスター・旧方針・要検証・スタッフ手順に分けて正本化する | `shipping-policy-import-summary.md`, `master-shipping-expansion-summary.md`, `chat-import-ledger.md` | Alfで正本上の未確認項目を整理済み。RT-Light Africa、RT-Mid Europe/Canada、RT-Heavy Antigua、Sri Lanka、66ポリシー、旧11付替はxlsx本体またはeBay画面確認待ち | 一部済 |
| T-018 | 旧チャット成果物ベース復元 | Alf / 正式作業台 | 確認待ち | remote compact再失敗により旧チャット本文からの要約取得が困難なため、既存の目次案と成果物ファイルから詳細仕様を復元する | `alf-old-chat-artifact-recovery-packet.md`, `research-support-tool-import-summary.md`, `shipping-policy-import-summary.md` | Git作業ツリー内には正本Markdownのみ確認。最新Code.gs、Sellsta CSV、Shipping Policy xlsx、Rate Table xlsx、GAS/CSV実体の所在確認待ち | 一部済 |
| T-019 | I-008 公庫面談・BREMEN創業計画確認 | Fay / 必要に応じてAlf | 受付 | 公庫・信金面談準備チャットの情報を、面談結果確認、創業計画書正本、印刷セット、追加資料タスクに分解する | `financing-import-summary.md`, `projects.md`, `handoff.md` | 2026-05-13/14の面談結果を三神さんに確認し、創業計画書xlsxと印刷チェックリストの差分を必要ならAlfで確認する | 未 |
| T-020 | I-009/I-013 eBay業務自動化 Phase1整理 | Alf / 正式作業台 | 読み取り確認済 / 追加確認待ち | 稼働中GAS自動化12ファイル、詳細トリガー、絶対ルール、未完了ダッシュボード要望を正本化し、再構築対象と残す機能を整理する | `ebay-phase1-readonly-check-result.md`, `ebay-phase1-folder-map.md`, `ebay-phase1-needs-review-triage.md`, `phase1-gas-browser-checklist.md`, `ebay-phase1-audit.md`, `ebay-phase1-system-map.md`, `ebay-phase1-test-plan.md`, `ebay-phase1-improvement-plan.md`, `ebay-automation-phase1-summary.md`, `ebay-phase1-startup-tasks.md`, `alf-phase1-gas-readonly-check-request.md`, `tool-inventory.md`, `projects.md` | 三神さんログイン後にブラウザ読み取り確認を実施。本番12ファイル、不要候補4ファイル、トリガー一覧、スプレッドシート側メニュー/タブ、Driveフォルダ構造を確認。`runInvoiceBridge` は請求書メール保存フォルダから税理士提出用投げ込みフォルダへのコピー中継で午前4-5時実行。`00_要確認` 50件をファイル名ベースで分類済み。スクショ読み取りスクリプト `screenshot_data_extractor.gs` あり。`collectTaxDocuments` / `collectEbayInvoices` は関数選択リストにもトリガーにも未検出。Script Propertiesは値露出リスクで未確認 | 一部済 |
| T-021 | I-010 eBay輸出自動化 Phase2セットアップ | Alf / 正式作業台 | 確認待ち | Phase2のコード・設計完了済み成果物を、環境セットアップ、テスト、本番運用開始まで進める | `ebay-automation-phase2-summary.md`, `tool-inventory.md`, `projects.md` | Alfで準備可能タスクと三神さん側APIキー取得タスクを分離済み。成果物21ファイル所在、最新料金/UI/CSV仕様、APIキー取得待ち | 一部済 |
| T-022 | 旧チャット取り込み後の作業判定・振り分け | Fay / Alf | 進行中 | I-003からI-013までの取り込み内容を、Fay確認、Alf実作業、保留、要最新確認に分ける | `work-triage-2026-05-25.md`, `alf-import-triage-packet.md` | Fayは面談結果確認、AlfはT-017/T-018/T-020/T-021/T-023を優先順に処理する | 反映済 |
| T-023 | I-011/I-012 カーパーツ管理ツール運用開始前確認 | Alf候補 / Manus Webdev | 受付 | `carparts-manager` の運用開始前に、Sellsta CSV、外注シート、FastAPI、DB、認証・Secrets、Sheets権限を確認する | `carparts-manager-import-summary.md`, `tool-inventory.md`, `projects.md` | Sellsta CSV実出品テスト、外注2名の個別シート取り込みテスト、パート2名の給与対象設定、`staff_members`、FastAPI起動、GCP認証情報、CORS/認証設定を確認。Secrets値、生SS ID、認証JSONは保存しない | 未 |
| T-024 | 経営防御ダッシュボード v1 | Fay / Alf | 受付 | Phase1に保存済みのeBay、請求書、領収書、外注費、在庫ログ等を使い、実質利益・支出・資金繰りを見える化する | `management-defense-dashboard-plan.md`, `management-dashboard-data-inventory.md`, `alf-overnight-work-queue.md` | Phase1読み取り確認後、データソース棚卸しを確定し、Google Sheets版v1の構成を決める | 一部済 |
| T-025 | 外注管理・報酬計算 相談 | Fay / 専用チャット / 必要に応じてAlf | 整理中 | 外注スタッフとのやり取り、作業管理シート、報酬計算、支払い漏れ防止、ツール化を整理する | `outsourcing-ops-chat-prompt.md` | 三神さんから現状を聞き、現状・困っていること・必要な管理項目・すぐ改善できること・ツール化候補の5分類で整理する | 進行中 |

## 未整理メモ

- 2026-05-26: A-001としてPhase1本番GAS読み取り確認を開始。`clasp`/`gcloud`/既存clasp認証は見つからず、Alf環境から本番GAS実体を読み取れなかった。結果は `ebay-phase1-readonly-check-result.md` に保存。削除・変更・実行・トリガー変更・Script Properties値保存・Drive操作は行っていない。
- 2026-05-26: ブラウザで本番GAS URLを開いたがGoogleログイン画面が表示されたため、指示どおり停止。ログイン情報は要求していない。
- 2026-05-26: 三神さんログイン後、Codex in-app browserでA-001を続行。本番GAS 12ファイル、不要候補4ファイル、トリガー一覧、スプレッドシート側の `プロジェクト管理` / `在庫管理` / `更新と管理` を読み取り確認。削除・変更・実行なし。Script Propertiesは値露出リスクのため未確認。
- 2026-05-26: `runInvoiceBridge` の役割とトリガー詳細時刻を追加確認。`auto_invoice_bridge.gs` は現役トリガーありのため削除不可・要確認。`collectTaxDocuments` / `collectEbayInvoices` は本番GAS関数選択リスト上では見つからず。
- 2026-05-26: Phase1 Driveフォルダ構造を読み取り確認し、`ebay-phase1-folder-map.md` を作成。`00_要確認` に未分類ファイルが残る、年フォルダ表記が混在する、メール装飾画像が保存されている可能性がある、などの確認候補を整理。Drive削除・移動・リネームはしていない。
- 2026-05-26: `00_要確認` 50件をファイル名ベースで分類し、`ebay-phase1-needs-review-triage.md` を作成。個別の人名、メールアドレス、請求書番号、ファイルIDは保存していない。スクリーンショット読み取りスクリプト `screenshot_data_extractor.gs` の存在と役割も整理。
- 2026-05-25: AlfでeBay業務自動化 Phase1の監査整理を実施。`ebay-phase1-audit.md`、`ebay-phase1-system-map.md`、`ebay-phase1-test-plan.md`、`ebay-phase1-improvement-plan.md` を作成。GAS本体、Google Drive、スプレッドシートは未操作。次は本番GAS 12ファイル、トリガー、不要候補4ファイルの実在確認と、テスト用サンプル実行可否の確認。
- 2026-05-25: Alfとして永続worktree `/Users/mikami/.codex/worktrees/ebe0/mikami-operations-official` で再開。`START_HERE.md` の順番で基礎ファイルと `master-shipping-expansion-summary.md` を確認済み。現在地は旧チャット取り込み、Shipping Policy v9詳細反映、マスター送料体系 v2.0、Fay/Alf運用安定化。Fayへ戻す内容は、Alf再開済み・開始時点の作業ツリー未変更・次はT-017/T-018またはマスター送料体系反映を進めること。
- 2026-05-25: Alfとして `/Users/mikami/Documents/GitHub/mikami-operations-official` で再開。`origin/main` をfast-forward pullし、`START_HERE.md` の順番で基礎ファイルを確認済み。次に具体作業が来たら、Alf側で実作業、`handoff.md` / `delegated-tasks.md` 更新、commit/pushまで行う。
- Claude/Codex/ChatGPT/Genspark/Manus/Cursor/Claude Code など複数ツールが関係している。
- 同じようなGAS機能が複数チャットで作成されている可能性がある。
- 最終的には管理ダッシュボード化したい。

## 2026-05-23 追記: マスター送料体系拡張チャットの進捗

### 受領内容

専用チャットで、マスター送料体系 v2.0 のデータ抽出と一括取込準備が進んだ。

### 確定したこと

- マスタースプレッドシートURL:
  `https://docs.google.com/spreadsheets/d/1Yieugd_qfk-1C7WNLx1xlc9vh_PRqie8SLKkWTsCUA8/edit`
- `FEDEX_FICP` は既存データが正しいと確認済み。
- `JP_EPL` は追加対象。
- `DHL_SPEEDPAK` は公式ゾーン定義 `DHL地域.xlsx` により214国で確定。
- `PEGASUS_DHL` は料金表抽出済み。燃料サーチャージは手動入力運用、現在値は `47.25%`。
- `OC_ECONOMY` はxlsxを正とする。PDF版は不採用。
- `PEN-PEI UPS` は現在未使用。取り込み不要。
- サーチャージ自動取得ではなく、手動更新方針。

### 作成済み成果物

- `setupMasterV2.gs`: マスターシートへ一括取込するApps Script
- `gas_12_M2Carrier_v2.js`: `FIND_CHEAPEST_CARRIER()` 等の送料比較関数
- `shipping_rates_master.csv`: 追加送料表
- `carrier_zones_master.csv`: キャリア別ゾーン定義
- `carriers_jp_epl_addition.csv`: JP_EPL追加行
- `carriers_oc_economy_update.csv`: OC_ECONOMY更新行
- `surcharges_pegasus_update.csv`: Pegasus 47.25%更新
- `settings_pegasus_update.csv`: Settings側のPegasus値更新
- `pegasus_all_fees.csv`: Pegasus DHL手数料。UPS分は除外済み

### 次アクション

1. 三神さんがバックアップ済み。
2. `setupMasterV2.gs` をマスターシートのApps Scriptへ貼る。
3. `setupMasterV2()` を実行する。
4. `gas_12_M2Carrier_v2.js` を `12_M2Carrier.gs` 末尾へ追記する。
5. `testFindCheapestCarrierV2()` を実行する。
6. シート上で `=FIND_CHEAPEST_CARRIER(0.5, "US")` 等を確認する。

## 2026-05-25 追記: Alf永続worktree再開確認

### 受領内容

三神さんから、Alfとして永続worktreeで再開し、`START_HERE.md` から必要ファイルを確認するよう依頼があった。

### 確認したこと

- 作業場所: `/Users/mikami/.codex/worktrees/ebe0/mikami-operations-official`
- 読み込み済み: `START_HERE.md`、`00_プロフィール.md`、`handoff.md`、`projects.md`、`意思決定ログ.md`、`delegated-tasks.md`、`desktop-codex-prompt.md`
- Git状態: detached HEAD
- リモート: `origin https://github.com/tomoya-mikami/mikami-operations.git`

### Fayへ戻す内容

- 現在地: 永続worktreeでAlf再開が成立。作業ログ更新とcommit/pushの実地テスト中。
- 最優先タスク: マスター送料体系 v2.0 のマスタースプレッドシート反映と、`FIND_CHEAPEST_CARRIER()` 動作確認。
- 成果: リモート側の先行更新を取り込んだうえで、Alf再開ログをGitHub `main` へpush済み。
- 注意点: Fay側はFetch/Pullしてこの更新を受け取る。
