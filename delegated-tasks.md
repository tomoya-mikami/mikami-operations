# 分割作業・チャット管理台帳

最終更新: 2026-05-25

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
| T-017 | I-004/I-007 送料・Shipping Policy詳細反映 | Alf候補 / 正式作業台 | 受付 | eBay送料・関税・Shipping Policy/Rate Table設計を、最新マスター・旧方針・要検証・スタッフ手順に分けて正本化する | `shipping-policy-import-summary.md`, `master-shipping-expansion-summary.md`, `chat-import-ledger.md` | I-007のv9確定値を受領。RT-Light/Mid/Heavyの画面反映、Africa追加、Antigua、Sri Lanka、66ポリシー登録、旧11ポリシー付替を確認する | 一部済 |
| T-018 | 旧チャット成果物ベース復元 | Alf / 正式作業台 | 受付 | remote compact再失敗により旧チャット本文からの要約取得が困難なため、既存の目次案と成果物ファイルから詳細仕様を復元する | `alf-old-chat-artifact-recovery-packet.md`, `research-support-tool-import-summary.md`, `shipping-policy-import-summary.md` | I-007を追加材料として、AlfでGoogle Drive/ローカル成果物の所在を確認し、リサーチツールとShipping Policyの詳細仕様・未完了タスク・要検証事項を正本へ反映する | 未 |
| T-019 | I-008 公庫面談・BREMEN創業計画確認 | Fay / 必要に応じてAlf | 受付 | 公庫・信金面談準備チャットの情報を、面談結果確認、創業計画書正本、印刷セット、追加資料タスクに分解する | `financing-import-summary.md`, `projects.md`, `handoff.md` | 2026-05-13/14の面談結果を三神さんに確認し、創業計画書xlsxと印刷チェックリストの差分を必要ならAlfで確認する | 未 |
| T-020 | I-009 eBay業務自動化 Phase1整理 | Alf候補 / 正式作業台 | 受付 | 稼働中GAS自動化12ファイル、定期トリガー、絶対ルール、未完了ダッシュボード要望を正本化し、再構築対象と残す機能を整理する | `ebay-automation-phase1-summary.md`, `tool-inventory.md`, `projects.md` | Manus AI向けWebダッシュボード仕様書を作成する前に、現行GASの本番ファイル、不要4ファイル、操作禁止事項、保存禁止情報を確認する | 未 |

## 未整理メモ

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
