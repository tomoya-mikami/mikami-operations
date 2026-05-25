# 引き継ぎメモ

最終更新: 2026-05-25

## 目的

このファイルは、チャットの文脈上限に近づいたとき、次スレッド・別チャット・アルフへ安全に引き継ぐための正本です。

新チャット開始時の起点は `START_HERE.md`。三神さんが毎回長い説明を貼り直さなくて済むように、Fayは `START_HERE.md` の順番で必要ファイルを読み、現在地を復元する。

## 固定前提

- 三神知也さんの専属秘書役として動く。
- 秘書名・司令塔役は「フェイ」。
- アルフは実作業サーバー / コード整理 / ファイル生成などを担当する相手として扱う。
- 端末ニックネーム:
  - デスクトップPC: Alf / アルフ / Alfred / アルフレッド
  - ノートPC: Fay / フェイ / Friday
- 三神さんの入力は音声中心なので、確認は短く、結論から返す。
- 削除・移動・不可逆な整理は、必ず三神さんの許可を取る。
- 重要判断は、根拠になるファイル名と一緒に残す。

## 共通作業台 / GitHub運用

目的:

スマホ・ノートPC・デスクトップPC・Codex・Claude間で、作業内容を迷子にせず引き継げる状態を作る。

現在の状態:

- GitHubリポジトリ `mikami-operations` を作成済み。
- まずは無料プラン・Privateリポジトリで運用開始。
- Google Driveは資料保管、GitHubは作業ログと引き継ぎ台帳として使う。
- 今後は `mikami-operations` を、ノートPC・デスクトップPC・スマホ・Codex・Claude間の共通作業台として使う。
- ノートPCにはGitHub Desktopを導入済み。
- ノートPC側のクローン先: `/Users/tomoya/Documents/GitHub/mikami-operations`
- デスクトップPC正式作業台: `/Users/mikami/Documents/GitHub/mikami-operations-official`
- 三神さんが「アルフでやって」「Alfで進めて」と言った場合は、デスクトップPC側Codexが正式作業台で作業する。
- 2026-05-23: GitHub CLI認証後、Codexから `git push origin main` が成功済み。
- 以後、Alf運用では作業後に `handoff.md` 更新、commit、可能ならpushまで行う。
- 2026-05-25: 旧チャット情報取り込みの方針を `chat-import-protocol.md` に作成。古いチャット本文を丸ごと貼らず、目次化・詳細引き継ぎ要約に圧縮してからFay/Alfで反映する。

Fay / フェイの役割:

- 三神さんは基本的にFayへ依頼する。
- Fayは秘書チャットを司令塔として使う。
- Fayは内容を見て、長時間作業・重いファイル作業・調査・commit/pushが必要な場合は、Alfに依頼することを提案する。
- 大きな仕事は必要に応じてAlfや専用スレッド/エージェントに分ける。
- 分けた仕事の結果・決定・次アクションだけを `handoff.md` やプロジェクトファイルへ集約する。
- 分けた仕事の台帳管理はFayが担当する。

Fayが記録すること:

- どこで作業したか
- なぜ分けたか
- 現在の進捗
- 成果物
- 保存場所
- 次アクション
- この秘書チャットへ反映済みか

別チャットを三神さん側で作る必要がある場合:

- Fayがチャット名と初回プロンプトを作成する。
- そのチャットも台帳で追跡する。

## オートセーブ運用

普段から、進捗が出たら次の場所に残す。

- 起動手順と最小プロンプト: `START_HERE.md`
- 重要な決定: `意思決定ログ.md`
- 現在地・次アクション・引き継ぎ文: `handoff.md`
- 分割した仕事・アルフや別チャットへの依頼: `delegated-tasks.md`
- ツールの棚卸し・残す/統合/保留/廃止判断: `tool-inventory.md`
- 再構築方針: `tool-rebuild-plan.md`
- 引き継ぎリスクと対策: `handoff-risk-register.md`
- 三神さん向け引き継ぎ手順: `handoff-runbook.md`
- Alf再開プロンプト: `alf-restart-prompt.md`
- Fay再開プロンプト: `fay-restart-prompt.md`

毎回GitHub同期を必須にはしない。同じ端末・同じ作業台で続ける場合は、まずローカルの `START_HERE.md` と `handoff.md` を読む。

GitHub同期が必要なタイミング:

- Alfが作業してpushした後にFayで確認するとき
- Fayが作業してAlfに渡す前
- ノートPC、デスクトップPC、スマホなど端末をまたぐとき
- 重要な引き継ぎファイルを更新したとき

正本:

- `mikami-operations` を共通作業台の正本にする。
- ローカル秘書プロジェクトとGitHub側が分岐した場合は、原則GitHub側を優先する。

## 早めに引き継ぎ更新するタイミング

正確な残り文脈量は見えないため、以下の兆候が出たら余裕を持って更新する。

- 長いチャット履歴を貼り付けた
- 大きなファイルや複数ファイルを読んだ
- 重要な決定が3件以上たまった
- 別チャット、アルフ、他AIに作業を分けた
- 新しい成果物、URL、スプレッドシート、GASファイルが増えた
- 作業が1時間以上続きそう
- 「この先も続く」タイプの作業に入る
- FayまたはAlf片方のチャットがいっぱいになった

更新後は三神さんへ短く知らせる。

例:

```text
引き継ぎメモを更新しました。次スレッドに移っても再開できます。
```

## 次スレッド開始時の指示

次スレッドでは、最初に以下を読む。

1. `START_HERE.md`
2. `AGENTS.md`
3. `00_プロフィール.md`
4. `handoff.md`
5. `projects.md`
6. `意思決定ログ.md`
7. `delegated-tasks.md`
8. 必要に応じて `tool-inventory.md`
9. 必要に応じて `tool-rebuild-plan.md`
10. 必要に応じて `tool-development-summary.md`
11. 必要に応じて `master-shipping-expansion-summary.md`
12. 必要に応じて `handoff-risk-register.md`
13. 必要に応じて `handoff-runbook.md`
14. 必要に応じて `alf-restart-prompt.md`
15. 必要に応じて `fay-restart-prompt.md`

次スレッドに貼る最小文:

```text
Fay、START_HERE.mdから再開して。
```

GitHub共通作業台から再開する場合の最小文:

```text
前の続き。mikami-operations の handoff.md を読んで、Fay/フェイとして再開して。必要ならAlfへ分ける前提で、現在地と次アクションを確認して。
```

## アルフへの引き継ぎルール

アルフへ仕事を渡すときは、必ず以下をセットで残す。

- 依頼の目的
- 入力ファイル / URL / スプレッドシート
- 期待する成果物
- やってよいこと / やってはいけないこと
- 完了後にフェイへ戻す内容
- `delegated-tasks.md` のID

アルフ側でも作業が進んだら、成果物・実行結果・未完了事項をフェイ側の `delegated-tasks.md` と `handoff.md` に戻す。

## 現在地

現在の中心テーマは3つ。

1. スマホ・ノートPC・デスクトップPC・Codex・Claude間の共通作業台運用を安定させる。
2. Triad.inc の eBay 出品・リサーチ・送料計算・Sellsta CSV 管理を自動化する。
3. Codexの永続worktreeを使い、秘書運用の正本を新プロジェクトへ移行するか決める。

2026-05-25追記:

- 三神さんから、既存秘書チャットを今後どう運用するか、永続worktreeへ移した方がよいか相談があった。
- 判断としては、今後は永続worktreeを正本にする方がよい。
- ただし、この既存フォルダ `/Users/tomoya/Documents/Claude/Projects/<秘書>` はGitリポジトリではないため、そのままworktree化するのではなく、`mikami-operations` などのGitリポジトリから永続worktreeプロジェクトを新規作成するのがよい。
- 移行用まとめとして `persistent-worktree-migration.md` を作成した。

確認済みのローカル管理ファイル:

- `00_プロフィール.md`
- `AGENTS.md`
- `delegated-tasks.md`
- `desktop-codex-prompt.md`
- `projects.md`
- `tool-inventory.md`
- `tool-rebuild-plan.md`
- `master-shipping-expansion-summary.md`
- `tool-development-summary.md`

最重要の作業:

1. 永続worktreeを使うか最終決定する。
2. 使う場合は、`persistent-worktree-migration.md` の手順で新プロジェクトへ移行する。
3. デスクトップPC側Codexで `desktop-codex-prompt.md` を読み込ませる。
4. デスクトップPC側Codexに、作業完了後のcommitとpushまで任せる運用をテストする。
5. ノートPC側では、作業前にGitHub DesktopでFetch originし、必要ならPull originを実行して成果物を受け取る。
6. Codexモバイル連携、またはChrome Remote DesktopでスマホからデスクトップPCへ指示する方法を設定する。
7. マスター送料体系 v2.0 をマスタースプレッドシートへ反映する。
8. `setupMasterV2.gs` をApps Scriptへ貼り、`setupMasterV2()` を実行する。
9. `gas_12_M2Carrier_v2.js` を `12_M2Carrier.gs` 末尾へ追記する。
10. `testFindCheapestCarrierV2()` と `FIND_CHEAPEST_CARRIER()` を確認する。
11. 動作確認後、リサーチサポートツール側へ連携する。
12. 財務担当チャットなど旧チャットの情報は、`chat-import-protocol.md` のプロンプトで要約してから取り込む。
13. 取り込み内容の重要度・進捗・反映状況は `chat-import-ledger.md` で見える化する。受付チャットは原則1つにし、3-5件たまったらFay判断でAlfへファイル反映・commit/pushを渡す。

マスタースプレッドシート:

`https://docs.google.com/spreadsheets/d/1Yieugd_qfk-1C7WNLx1xlc9vh_PRqie8SLKkWTsCUA8/edit`

## 保存チェックポイント

### 2026-05-25

旧チャット取り込み受付開始:

- 三神さんの指示により、このチャットを旧チャット情報の取り込み受付として運用開始。
- 以後、三神さんが旧チャットの引き継ぎ要約を貼った場合、毎回細かい指示がなくてもFayが取り込み要約として扱う。
- 各要約は重要度、緊急度、状態、反映先、Alf依頼要否、機密情報/要最新確認の有無を判断し、`chat-import-ledger.md` へ集約する。
- 3-5件たまった場合、または反映量が多い場合は、FayがAlf向け作業パケットを作成する。

I-003 リサーチサポートツール目次案:

- eBay輸出リサーチ支援ツールの引き継ぎ目次案を受領。
- 内容はGoogle Sheets + Google Apps Scriptで、仕入候補入力、AI補完、利益計算、Terapeak/オクファン確認、人間の出品OK判断、Sellsta CSV出力までを扱う。
- 最新仕様は4シート構成、リサーチ入力は22列構成。14列、17列、20列は過去案として分離が必要。
- APIキー、Googleアカウント情報、スプレッドシート共有URL、顧客個人情報、口座番号、パスワード、マイナンバーは保存禁止。
- eBay手数料、Promoted Listings、International fee、US関税、DDU/DDP、EU VAT/IOSS、Sellsta CSV仕様、Geminiモデル/料金は要最新確認。
- 反映先として `research-support-tool-import-summary.md` を作成し、詳細引き継ぎが来たらAlfで正本化する。

I-004 送料・Shipping Policy目次案:

- eBay越境輸出の送料・関税・Shipping Policy/Rate Table設計の目次案を受領。
- 最新マスターは `Triad_Shipping_Policy_Master_v9_通し番号.xlsx`。66ポリシー構成で、DDP 60個、DDU 6個、No.01-66の通し番号体系。
- Rate Tableは `RT-Light`、`RT-Mid`、`RT-Heavy` の3系統。国名詳細版として `Triad_Rate_Tables_詳細版_国名.xlsx` がある。
- 高リスク国/除外国は暫定的に高額送料で抑止し、後日各Shipping PolicyのExcluded shipping locations設定を確認する。
- CPaSS / SpeedPAK / FedEx / DHL / Pegasus送料表はGoogle Sheets/GAS参照用マスター化が必要。
- 個人メールアドレス、eBayアカウント名、取引先・契約情報、顧客個人情報、ログイン情報、APIキーは保存禁止。
- eBay画面設定、SpeedPAK ExpeditedとRate Tableの効き方、Africa追加漏れ、高リスク国購入可否、CPaSS送料表、Pegasus燃油サーチャージ、eBay手数料は要最新確認。
- 反映先として `shipping-policy-import-summary.md` を作成し、詳細引き継ぎが来たらAlfで正本化する。

I-005 remote compact失敗:

- 三神さんから `context_length_exceeded` エラー報告あり。
- 原因は旧チャット全体または長大入力を一括で圧縮しようとして、モデルの文脈上限を超えたこと。
- 対処は、チャット全体の圧縮ではなく、目次の1テーマずつ3,000-5,000字程度で分割して引き継ぐ。
- `chat-import-protocol.md` に短縮プロンプトを追記し、`handoff-risk-register.md` にR-017として登録した。

I-006 remote compact再失敗:

- 三神さんから、分割方針後も同じ `context_length_exceeded` が出たと報告あり。
- 判断: その旧チャットはAI側で本文を読み直して要約する段階を超えている可能性が高い。
- 方針: 旧チャットへ追加指示を送るのを止め、すでに取れた目次案と成果物ファイルからAlfで詳細復元する。
- `alf-old-chat-artifact-recovery-packet.md` を作成し、T-018として `delegated-tasks.md` に登録した。

I-007 Triad eBay輸出 Shipping Policy v9詳細目次:

- Shipping Policy v9の詳細目次を受領。アカウント名等の機密寄り情報は正本保存から除外した。
- v9は60 DDP + 6 DDU = 66ポリシー。重量帯はWA-WFの6段階、価格帯はUSD 1-100からUSD 2,001-2,500までの11段階、USD 2,501以上はDDU。
- Free Shipping戦略は、商品価格へ重量帯別基準額を上乗せし、EU-Major/Asia-MajorはRate Tableに含めず自動Free表示にする方針。
- Rate Table確定値と作業中項目を `shipping-policy-import-summary.md` に反映。RT-LightはAfrica追加、RT-MidはEurope/Canada修正、RT-HeavyはAntigua確認が必要。
- 配送業者はFedEx FICPをメイン、SpeedPAK DHLを予備、Pegasus DHLは燃油約47%前提で不採用。ただし燃油・DHL割引・CPaSS表は要最新確認。
- 配送業者別データはFedEx FICP、SpeedPAK DHL、SpeedPAK Economy、Pegasus DHLが読取済みで、次タスクはGAS/Sheets用CSV/JSONへの構造化。

Alf再開:

- 三神さんの指示により、Alfとして `/Users/mikami/Documents/GitHub/mikami-operations-official` で再開。
- ローカルは `origin/main` から6コミット遅れていたため、`git pull --ff-only origin main` で最新化済み。
- `START_HERE.md` を起点に、`AGENTS.md`、`00_プロフィール.md`、`handoff.md`、`projects.md`、`意思決定ログ.md`、`delegated-tasks.md` を確認済み。
- 現在地: 永続worktree正本化、Fay/Alf運用安定化、マスター送料体系 v2.0 反映が中心。
- 次アクション: Fayまたは三神さんから具体作業が来たら、Alf側でファイル作成・コード修正・調査・commit/pushまで進める。

### 2026-05-23

前チャットから復元した主要情報をローカル管理ファイルへ保存済み。

保存済み:

- `START_HERE.md`
- `00_プロフィール.md`
- `AGENTS.md`
- `handoff.md`
- `projects.md`
- `意思決定ログ.md`
- `delegated-tasks.md`
- `desktop-codex-prompt.md`
- `tool-inventory.md`
- `tool-rebuild-plan.md`
- `tool-development-summary.md`
- `master-shipping-expansion-summary.md`
- `alf-test-request.md`
- `handoff-risk-register.md`
- `handoff-runbook.md`
- `alf-restart-prompt.md`
- `fay-restart-prompt.md`
- `presentations/fay-alf-handoff-guide.pptx`

Alf依頼テスト:

- `alf-test-request.md` を作成。
- この環境からデスクトップPC側Alfへ直接接続はできない。
- 代替として、同じ依頼形式をサブエージェントに渡して、依頼フローが成立するか確認する。
- テスト結果: 依頼形式は成立。実際のAlfへ渡す場合は、作業場所 `/Users/mikami/Documents/GitHub/mikami-operations-official` を明記する。

CLI認証:

- 2026-05-23、ノートPC側にGitHub CLI `gh` をインストール。
- `gh auth login --hostname github.com --git-protocol https --web` で `tomoya-mikami` として認証済み。
- `git push origin main` はCLIから実行可能。

## 最新の決定

- 今後の秘書運用は、可能であればCodexの永続worktreeを正本にする方がよい。
- 既存秘書チャットを直接永続worktree化するのではなく、Gitリポジトリ `mikami-operations` をベースに新しい永続worktreeプロジェクトを作る。
- 移行用まとめは `persistent-worktree-migration.md` に保存済み。
- 長期運用では、チャットが突然いっぱいになる前に `handoff.md` を更新して知らせる。
- フェイの作業進捗は、普段からオートセーブに近い形でローカル管理ファイルへ残す。
- アルフへ分けた作業も同じく、`delegated-tasks.md` と `handoff.md` に戻す。
- Google Driveは資料保管、GitHubは作業ログと引き継ぎ台帳として使う。
- 三神さんが「アルフでやって」「Alfで進めて」と言った場合は、デスクトップPC側Codexが正式作業台で作業する。
- Alfでは、作業後に `handoff.md` 更新、commit、可能ならpushまで行う。
- Alf初回セットアップと毎回の作業依頼には `desktop-codex-prompt.md` を使う。
- 引き継ぎリスクと対策は `handoff-risk-register.md` に保存する。
- 安全な保存・台帳更新・commit/pushは、毎回確認せずFayが進めてよい。
- 確認が必要なのは、削除、不可逆操作、個人情報/機密情報へのアクセスや保存、Google Drive内の削除・移動。
- AlfがいっぱいになったらFayが `alf-restart-prompt.md` で再開支援する。
- FayがいっぱいになったらAlfが `fay-restart-prompt.md` で再開支援する。
- 引き継ぎ運用の見返し用スライドは `presentations/fay-alf-handoff-guide.pptx` に保存済み。

## 注意点

- 口座番号、パスワード、マイナンバー、顧客個人情報などはGitHubに入れない。
- Google Drive内の削除・移動は必ず三神さんの許可を取る。
- 出張中にデスクトップPCへ作業させるには、デスクトップPC側Codexがgit commitとgit pushまで実行できる状態にする必要がある。
