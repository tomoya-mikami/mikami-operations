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
| T-001 | マスターファイル / 既存出品ポリシー変更ツール | このチャット / マスタースプシ | 進行中 | 既存eBay出品のShipping Policy見直し | マスタースプレッドシート、各GAS、Sellsta CSV | 残タスク確認、必要機能の棚卸し | 一部済 |
| T-002 | リサーチサポートツール | リサーチチャット | 進行中 | 仕入候補からSellsta出品CSVを作る | リサーチサポートスプレッドシート | 別チャット履歴を読み込み、重複機能を整理 | 未 |
| T-003 | マスター送料体系拡張 | 専用チャット | 進行中 | FedEx以外のJP_EPL/DHL/Pegasus/OC/SpeedPAK対応 | `setupMasterV2.gs`, `gas_12_M2Carrier_v2.js`, `shipping_rates_master.csv`, `carrier_zones_master.csv` など | マスターシートへ一括取込スクリプトを貼付・実行、GAS関数追加、動作確認 | 反映中 |
| T-004 | ツール群棚卸し・再構築プロジェクト | フェイ | 整理中 | 乱立したツールを分類し、必要/不要を判断して再構築する | `tool-inventory.md`, `tool-rebuild-plan.md` | 追加チャット履歴を読み込み、全体台帳を完成 | 進行中 |
| T-005 | 引き継ぎ・オートセーブ運用 | フェイ / アルフ | 進行中 | チャット上限前に次スレッドへ安全に引き継ぐ | `handoff.md`, `意思決定ログ.md`, `delegated-tasks.md` | 進捗が出るたびに更新し、長文化したら早めに三神さんへ知らせる | 済 |
| T-006 | GitHub共通作業台 / Alf・Fay運用 | Fay / Alf / GitHub | 進行中 | 複数端末・複数AI間で作業ログと成果物を迷子にしない | `mikami-operations`, `handoff.md`, `desktop-codex-prompt.md` | Alf側で `desktop-codex-prompt.md` を読み込み、commit/push運用をテストする | 反映済 |
| T-007 | Alf依頼フローテスト | Fay / Alf代替サブエージェント | 完了 | FayからAlfへ依頼する形式が成立するか確認する | `alf-test-request.md` | 実際のAlfへ渡す場合は作業場所を明記して依頼する | 済 |
| T-008 | 新チャット起動プロトコル | Fay | 完了 | 毎回長い設定を貼らずにFayとして再開できるようにする | `START_HERE.md`, `AGENTS.md`, `handoff.md` | 新チャットでは「Fay、START_HERE.mdから再開して。」だけで再開する | 済 |
| T-009 | CLI認証・引き継ぎリスク対策 | Fay | 完了 | CLI pushを可能にし、複数端末運用のリスクと対策を整理する | `handoff-risk-register.md`, `handoff.md`, `意思決定ログ.md` | 以後、端末間作業ではリスク台帳の標準チェックリストを使う | 済 |
| T-010 | 安全作業の確認省略ルール | Fay | 完了 | 保存・commit/pushのたびに確認せず、スムーズに進める | `START_HERE.md`, `handoff.md`, `意思決定ログ.md` | 削除・不可逆操作・機密情報関連だけ確認する | 済 |
| T-011 | 三神さん向け引き継ぎ手順書 | Fay | 完了 | 新チャット・Alf・スマホ運用で三神さんがやることを短くまとめる | `handoff-runbook.md` | 新チャットでは「Fay、START_HERE.mdから再開して。」を使う | 済 |
| T-012 | Fay/Alf相互再開プロンプト | Fay / Alf | 完了 | 片方のチャットがいっぱいになった時、もう片方が新チャット移行を支援する | `alf-restart-prompt.md`, `fay-restart-prompt.md` | Alf満杯時はFay、Fay満杯時はAlfが再開プロンプトを作る | 済 |
| T-013 | Fay/Alf引き継ぎ運用スライド | Fay | 完了 | 後で見返せるように、引き継ぎ方法と運用ルールをスライド化する | `presentations/fay-alf-handoff-guide.pptx` | 必要なら内容を更新して再出力する | 済 |
| T-014 | 永続worktree移行 | Fay / 新Codexプロジェクト | 確認待ち | 秘書運用の正本を、Codexの永続worktreeプロジェクトへ移す | `persistent-worktree-migration.md` | 三神さんが永続worktree採用を最終決定したら、新プロジェクトを作成し、移行対象ファイルを反映する | 反映中 |
| T-015 | 旧チャット情報取り込み | Fay / 必要に応じてAlf | 受付 | 財務担当チャットなど過去チャットの内容を、文脈上限を超えない形で秘書ハブへ集約する | `chat-import-protocol.md` | 旧チャット側で目次化・詳細引き継ぎを出力し、Fayで分類して必要ファイルへ反映する | 開始 |

## 未整理メモ

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
