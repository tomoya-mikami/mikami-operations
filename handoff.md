# 引き継ぎメモ

最終更新: 2026-05-26

## 2026-05-26 Alf追記: Phase1・経営管理の現在地

三神さんの依頼により、Alf側では一旦スプレッドシート個別確認を置き、次の2点に集中して進めた。

1. 利益が見える経営管理。
2. eBay業務自動化 Phase1を安全に運用できる状態づくり。

完了したこと:

- Phase1本番GAS 12ファイル、不用候補4ファイル、トリガー、`runInvoiceBridge` の役割、Driveフォルダ構造、`00_要確認` 50件の分類は読み取り確認済み。
- `runInvoiceBridge` は現役トリガーありのため削除候補から外す。
- `collectTaxDocuments` / `collectEbayInvoices` は現行関数リスト・トリガー上では未検出。
- スクショ読み取りスクリプト `screenshot_data_extractor.gs` は存在確認済み。ただし実行はしていない。
- 新規成果物として `phase1-management-work-summary.md`、`management-defense-dashboard-v1-spec.md`、`ebay-phase1-safe-operations-runbook.md`、`alf-to-fay-management-phase1-handoff.md` を作成。
- `ebay-phase1-needs-review-move-plan.md` を作成し、`00_要確認` の分類別移動先候補と確認事項を整理。
- `management-dashboard-data-inventory.md` を、Phase1読み取り確認後の状態へ更新。

未完了:

- 経営防御ダッシュボードの実体作成。
- eBay売上一覧、円換算、外注費、在庫ログの実列名確認。
- `00_要確認` のマスク済み個別移動予定リスト作成。
- Script Propertiesのキー名確認。値露出リスクがあるため未確認のまま。
- Drive内の実移動、削除、リネーム、GAS実行、トリガー変更。

次アクション:

1. 経営防御ダッシュボードv1を、既存本番GASを変更しない別タブ/別スプレッドシートで試作する。
2. `00_要確認` は、実移動前にマスク済み移動予定リストだけ作る。
3. Fay側では `alf-to-fay-management-phase1-handoff.md` を見て、三神さんへ「次に決めること」を短く返す。

## 2026-05-26 Alf追記: 許可後の追加作業

三神さんから次の2点について許可あり。

- 経営防御ダッシュボードv1を、本番GASを触らず別シート/別タブで試作してよい。
- `00_要確認` の中身を、実移動せずにマスク済み個別移動予定リストとして作ってよい。

実施したこと:

- `ebay-phase1-needs-review-masked-move-list.md` を作成。Drive上の50件を、ファイル名を保存せず `NR-001` から `NR-050` で番号化。
- `spreadsheets/management-defense-dashboard-v1-prototype.xlsx` を作成。Google Sheets移植前提のローカル試作ブック。
- `spreadsheets/management-defense-dashboard-v1-preview.png` を作成。経営サマリーの見た目確認用。
- `scripts/build_management_dashboard_v1.mjs` を作成。試作ブック再生成用。

未実施:

- 本番GAS変更。
- Google Drive内の削除、移動、リネーム。
- 既存Google Sheetsへの書き込み。
- GAS関数実行。
- ファイル本文、PDF本文、ZIP中身確認。

次アクション:

1. Google Sheets上に試作ブックを置く場合は、既存本番シートとは分けて作る。
2. 実データ接続前に、eBay売上一覧、円換算、外注費、在庫ログの実列名を読み取り確認する。
3. `00_要確認` の実移動は、マスク済みリスト確認後に別承認を取る。

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

2026-05-25 Alf追記:

- デスクトップPC側の永続worktree `/Users/mikami/.codex/worktrees/ebe0/mikami-operations-official` でAlfとして再開した。
- `START_HERE.md` の順番で、`00_プロフィール.md`、`handoff.md`、`projects.md`、`意思決定ログ.md`、`delegated-tasks.md`、`desktop-codex-prompt.md` を確認した。
- Git状態は detached HEAD。リモートは `origin https://github.com/tomoya-mikami/mikami-operations.git`。
- 現在地は、永続worktree運用の実地テスト段階。最優先は Alf側で作業後に `handoff.md` / `delegated-tasks.md` を更新し、commit/pushまで通すこと。
- Fayへ戻す内容は、この永続worktreeでAlf再開が成立したこと、次にマスター送料体系 v2.0 の反映作業へ進めること、push結果。
- push結果: リモート側の先行更新を `git fetch` / `git rebase origin/main` で取り込み、Alf再開ログを `origin/main` へpush済み。

## 保存チェックポイント

### 2026-05-26

外注管理・報酬計算 相談開始:

- 専用チャット `外注管理・報酬計算 相談` の初回プロンプトが使われ、P-013/T-025を「整理中」に更新。
- 相談の最初の整理軸は、現状、困っていること、必要な管理項目、すぐ改善できること、ツール化候補。
- 報酬詳細、口座情報、マイナンバー、支払先詳細、機密情報はGitHubへ保存しない。必要な場合もスタッフIDや役割名に置き換える。
- 次アクションは、三神さんから外注スタッフごとの役割、作業管理シートの現状、報酬計算ルール、実績確認方法、支払い漏れ防止の悩みを聞き取る。

外注管理表の構造確認:

- 三神さんから、現在使っている外注管理表の共有を受けた。個人名、支払先、実支払額、シートURLはGitHubへ保存しない。
- 現行表は、期別外注費シートで、行にスタッフ/支払先、列に月別の請求書・振込・振込額が並ぶ構成。
- メモ欄でリサーチ、出品、梱包発送、修理、パートなどを区別している。
- 課題は、報酬計算の根拠データ、請求書/振込チェック、支払予定が同じ表に混ざっており、月次計算が手入力・転記依存になりやすいこと。
- 改善案として `outsourcing-management-improvement-plan.md` を作成。推奨は、スタッフマスター、作業単価マスター、作業実績入力、月次報酬計算、支払チェック、エラーチェックの6シート構成。
- 修理報酬は、完全時給制ではなく「標準単価制 + 例外作業のみ承認工数制」を第一候補にする。

修理報酬方針の更新:

- 三神さんから、修理担当は細かく厳格に入力させるより、信頼ベースで入力負担を減らす方がよいという相談あり。
- 実際には、多少多めの時間申告があっても、商品利益に対して修理報酬が収まるなら問題ないという判断。
- 方針を「標準単価制 + 低入力の時間申告 + カテゴリ別上限 + 成果インセンティブ」へ更新。
- ゲーム機系はカテゴリ別の支払上限を設定する案。カーオーディオ系は動作復旧による売価上昇が大きいため、件数または復旧成果に応じたインセンティブを検討する。
- GitHubには具体的な単価・個人別報酬額は保存しない。

修理管理シート確認:

- 三神さんから現在使用中の修理管理シート共有あり。個別商品、シリアル、具体的な金額、シートURLはGitHubへ保存しない。
- 構成は、修理記録一覧、報酬集計シート、単価表・部品代表。
- 現行シートは、定型作業チェック、部品代、手作業修理時間、トータル費用が分かれており、ゼロから作り直すより最小改修がよい。
- 改善候補は、単価を数式直書きから単価表参照にすること、総報酬額集計式を修理記録一覧の支払対象額合計にすること、作業単価上限の表示と数式を一致させること、商品カテゴリ別ルール表を追加すること。
- 入力欄は増やしすぎず、作業日、本体名称、実作業時間、作業結果、定型作業チェック、部品使用、手作業内容、備考程度に絞る。

修理報酬ルール案:

- 三神さん案として、1商品ごとに実作業時間を1分単位で入力し、基準時給1,500円/時で報酬算定する。
- 基本上限は1商品1,500円。修理できなかった場合の上限は1,000円。
- ワケあり商品の時間報酬は上限1,500円。ただしインセンティブ対象外。
- 修理を伴わない動作確認のみは200円、クリーニングのみは300円。
- 修理ありの場合、動作確認・クリーニングは時間報酬に含め、二重加算しない。
- 修理後状態は、動作確認済み、ワケあり、ジャンクの3択。
- 修理完了かつ修理後状態が動作確認済みの件数を月次集計し、30件ごとに1,000円のインセンティブを付ける。
- ワケあり、ジャンク、修理を伴わない動作確認のみの商品はインセンティブ対象外。
- 修理できなかった商品はインセンティブ対象外。
- 修理内容、新品部品購入・使用、仕入れ、送料、部品代を入力し、商品ごとのトータル原価を算出する。
- 部品代、仕入れ、送料は作業報酬と分け、商品原価・実費として別列管理する。
- 返送日が入った月を報酬計上月とし、別シートで月次集計する。
- 返送日未入力の商品は、その月の報酬に入れない。
- 2026-05-26: 現行修理管理シートを直接上書きせず、確認用の改修版xlsxをローカル一時出力した。追加内容は、修理完了、クリーニングのみ、仕入れ金額、送料、作業報酬、インセン対象、報酬計上月、商品原価合計、要確認、報酬ルール表、月次集計式。実データを含むため、xlsx本体はGitHubに保存しない。

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

I-011 カーパーツ管理ツール:

- Manus Webdev製 `carparts-manager` の引き継ぎプロンプト、ユーザーマニュアル、課題/改善案、最終プロンプトを受領。
- 目的は、外注リサーチャーのGoogle Sheets取り込み、禁止/重複チェック、SKU採番、共有シート転記、Sellsta CSV出力、給与計算をWebアプリで自動化すること。
- 状態は進行中 / 運用開始前確認あり。Sellsta CSV実出品テスト、未確認の外注担当者シート、FastAPI起動、GCP認証情報、Sheets権限、`staff_members`、FastAPI/CORS/認証設定を確認するまで本運用扱いにしない。
- 反映先として `carparts-manager-import-summary.md` を作成し、`projects.md` P-011、`delegated-tasks.md` T-023、`tool-inventory.md` へ追加した。
- GCPサービスアカウントJSON、DB接続文字列、JWT、APIキー、Chatworkトークン、Secrets値、個人情報は保存しない。

I-012 カーパーツ管理ツール全体サマリー追記:

- 人員構成、スプレッドシート構成、GCPサービスアカウント前提の追記を受領。
- 外注リサーチャー2名、パートスタッフ2名。パートスタッフは共有SSへ直接入力し、データ取り込み対象ではない。給与計算は全員対象。
- 共有SS、禁止リストSS、テンプレートSS、外注担当者用SS 2件の構成。共有/外注SSは編集権限、禁止リストSSは閲覧権限の前提。
- Google Sheets APIとGoogle Drive APIを利用。サービスアカウントには個人Gmail由来のファイル作成制限がある。
- 貼り付けは途中で重複し、`ファイル構成` の見出しで切れている可能性がある。
- 生のスプレッドシートID、GCPプロジェクトID、サービスアカウントメールは正本へ複製せず、元資料またはManus管理画面参照にする。

I-007 Triad eBay輸出 Shipping Policy v9詳細目次:

- Shipping Policy v9の詳細目次を受領。アカウント名等の機密寄り情報は正本保存から除外した。
- v9は60 DDP + 6 DDU = 66ポリシー。重量帯はWA-WFの6段階、価格帯はUSD 1-100からUSD 2,001-2,500までの11段階、USD 2,501以上はDDU。
- Free Shipping戦略は、商品価格へ重量帯別基準額を上乗せし、EU-Major/Asia-MajorはRate Tableに含めず自動Free表示にする方針。
- Rate Table確定値と作業中項目を `shipping-policy-import-summary.md` に反映。RT-LightはAfrica追加、RT-MidはEurope/Canada修正、RT-HeavyはAntigua確認が必要。
- 配送業者はFedEx FICPをメイン、SpeedPAK DHLを予備、Pegasus DHLは燃油約47%前提で不採用。ただし燃油・DHL割引・CPaSS表は要最新確認。
- 配送業者別データはFedEx FICP、SpeedPAK DHL、SpeedPAK Economy、Pegasus DHLが読取済みで、次タスクはGAS/Sheets用CSV/JSONへの構造化。

I-008 公庫面談準備・BREMEN創業計画目次:

- 公庫面談準備チャットの引き継ぎ目次を受領。2026-05-13信金面談、2026-05-14公庫面談は現在日付2026-05-25時点では過去のため、結果確認待ちとして扱う。
- 対象はTriad輸出ECの融資相談と、合同会社BREMENの障害者グループホーム創業計画。
- BREMEN創業計画書は「KINOPPI監修 収支シミュレーションシート」を正本として統一済みとのこと。最終数値は記憶ではなくxlsx本体で確認する。
- ファイル所在候補は `03_融資・銀行対応/合同会社BREMEN_創業計画書.xlsx` と `印刷セット_2026-05-14_公庫面談/` 配下。
- 個人借入、本人確認書類、通帳コピー、NISA解約書類、口座情報、印鑑関連、顧客個人情報はGitHubへ保存しない。
- 反映先として `financing-import-summary.md` を作成。次アクションは面談結果、追加資料、印刷チェックリスト差分の確認。

I-009 eBay業務自動化 Phase1:

- `eBay業務自動化Phase1` の引き継ぎ目次を受領。請求書メール保存、税理士提出書類、eBayインボイス、外注報酬、領収書処理、書類振り分け、在庫ログ等のGAS自動化群。
- 基本6システムは2026-04-07完了、強化3件は2026-04-08完了、追加機能は2026-04から05月にかけて決定済み。
- 本番GASは12ファイル構成。詳細は `ebay-automation-phase1-summary.md` へ保存。
- 絶対ルールは、スプレッドシート行削除禁止、日本語Gmailラベルを検索除外に使わない、実行指示はファイル名と関数名を明記すること。
- 次アクションはManus AI向けWebダッシュボード仕様書作成。請求書追加/削除、書類種別自動判定、ブラウザからの操作実行を含める。
- Chatwork APIトークン、ルームID、外注スタッフ個人情報、税理士メールアドレス、eBayアカウント名は保存しない。

I-013 eBay業務自動化 Phase1 GAS詳細:

- `引き継ぎ_Phase1全システム.md` と `引き継ぎ_GAS詳細_Part1-3.md` を受領。
- Phase1は全システム完了・本番稼働中。詳細では本番12ファイル、11スケジュール、業務フロー、過去エラー、不要候補4ファイル、改善案が整理されている。
- 旧要約の「9本のトリガー」と詳細資料の「11スケジュール」は、在庫ログ系を含めるかどうかの数え方の差分として扱い、Alfで実画面確認する。
- `ebay-phase1-startup-tasks.md` を作成し、起動確認、トリガー確認、Script Properties存在確認、ダッシュボード確認、削除禁止事項を分離した。
- 2026年7月中に6期対応として `ebay_yen_converter.gs` の月列マッピングを確認する。
- APIキー、トークン、ChatworkルームID、Script Properties値は保存しない。
- 2026-05-26: 三神さんから、Alfで本番GASを読み取り専用確認する指示あり。削除・変更・実行は禁止。依頼内容は `alf-phase1-gas-readonly-check-request.md` に保存。
- 2026-05-26深夜: 三神さんから「寝るので進められるところまで」と指示あり。Fay側で `management-defense-dashboard-plan.md`、`management-dashboard-data-inventory.md`、`ebay-phase1-operations-ui-spec.md`、`alf-overnight-work-queue.md` を作成し、Phase1読み取り確認後に経営防御ダッシュボード用データ棚卸しと操作UI改善へ進む流れを整理した。
- AlfのA-001結果では、Alf環境に `clasp` / `gcloud` / 既存認証がなく、本番GAS実体確認は未完了。次はブラウザ目視確認を推奨し、`phase1-gas-browser-checklist.md` を作成した。
- 2026-05-26: 三神さんから、Phase1/経営管理と並行して外注スタッフとのやり取り、作業管理シート、報酬計算、ツール化について相談したい旨あり。個人情報・報酬詳細が絡むため、専用チャット `外注管理・報酬計算 相談` を推奨し、初回プロンプトを `outsourcing-ops-chat-prompt.md` に作成した。

I-010 eBay輸出自動化 Phase2:

- `eBay輸出自動化 Phase2` の引き継ぎ目次を受領。AI・出品・リサーチ向けのベンチマークセラー分析、出品自動化、価格最適化の3システム。
- 現在地はコード・設計完了、環境セットアップ待ち。進捗目安は約60%。
- Phase1は完成済み・変更禁止として扱う。
- 成果物は設計ドキュメント3件、GAS6件、n8n v2ワークフロー3件、v1参照用3件、AIプロンプト3件、CSVテンプレート、全体フローチャートHTML。
- 残り作業はApify APIトークン取得、Claude APIキー取得、GAS貼り付け、n8n Credentials登録、WF1-WF3 v2インポート、Test 0-6、本番セラーID登録。
- eBay Seller Hub CSV仕様、Apify UI、Claude/Apify/n8n料金、APIモデル名は要最新確認。
- APIキー、トークン、Chatwork情報は保存しない。

取り込み後の作業判定・振り分け:

- I-003からI-013までの取り込みがたまったため、`work-triage-2026-05-25.md` で優先順位を整理した。
- Fayが持つ最優先確認はI-008の面談結果確認。2026-05-13/14は過去日付のため、結果と追加資料の有無を三神さんに聞く。
- Alfへ渡す最優先はT-017 Shipping Policy v9 / Rate Table確認、T-018旧チャット成果物ベース復元。
- 次点でT-020 Phase1 GAS起動確認とWebダッシュボード仕様化、T-021 Phase2セットアップ準備。
- 旧チャットへの追加compact/要約依頼は停止。今後は成果物ベースで復元する。
- Alf向け実作業パケットとして `alf-import-triage-packet.md` を作成した。

Alf再開:

- 三神さんの指示により、Alfとして `/Users/mikami/Documents/GitHub/mikami-operations-official` で再開。
- ローカルは `origin/main` から6コミット遅れていたため、`git pull --ff-only origin main` で最新化済み。
- `START_HERE.md` を起点に、`AGENTS.md`、`00_プロフィール.md`、`handoff.md`、`projects.md`、`意思決定ログ.md`、`delegated-tasks.md` を確認済み。
- 現在地: 永続worktree正本化、Fay/Alf運用安定化、マスター送料体系 v2.0 反映が中心。
- 次アクション: Fayまたは三神さんから具体作業が来たら、Alf側でファイル作成・コード修正・調査・commit/pushまで進める。

Alf再開確認:

- 三神さんの指示により、Alfとして永続worktree `/Users/mikami/.codex/worktrees/ebe0/mikami-operations-official` で再開。
- `START_HERE.md` の順番で、`00_プロフィール.md`、`handoff.md`、`projects.md`、`意思決定ログ.md`、`delegated-tasks.md`、`master-shipping-expansion-summary.md` を確認済み。
- 現在地: 旧チャット取り込み、Shipping Policy v9詳細反映、マスター送料体系 v2.0、Fay/Alf運用安定化が並行中。
- 最優先: T-017/T-018として、送料・Shipping Policy詳細と既存成果物ベース復元を正本へ反映する。続いてマスター送料体系 v2.0 のGAS/Sheets反映と `FIND_CHEAPEST_CARRIER()` 動作確認。
- Fayへ戻す内容: Alf再開済み、作業ツリーは開始時点で未変更、次は具体依頼に応じてファイル作成・コード修正・調査・commit/pushまで進める。

Alf作業 T-017 / T-018 / T-020 / T-021:

- `alf-import-triage-packet.md` を読み、T-017 -> T-018 -> T-020 -> T-021 の順で整理した。
- T-017: Shipping Policy v9 / Rate Tableは、正本上の確定値と未確認項目を `shipping-policy-import-summary.md` に整理。RT-Light Africa、RT-Mid Europe USD 75/Canada、RT-Heavy Antigua、Sri Lanka、66ポリシー、旧11ポリシー付替は、xlsx本体またはeBay画面確認待ち。
- T-018: 旧チャット成果物ベース復元は、Git作業ツリー内に実体成果物がなく正本Markdownのみ確認。最新 `Code.gs`、Sellsta CSV、Shipping Policy xlsx、Rate Table xlsx、GAS/CSV実体の所在確認待ち。
- T-020: Phase1は稼働中GAS12ファイル、定期トリガー、絶対ルール、不要4ファイル保留、Webダッシュボード要件を `ebay-automation-phase1-summary.md` に整理。稼働中システムは変更していない。
- T-021: Phase2はAlf側で進められる準備と、三神さん側のAPIキー/トークン取得が必要な作業を `ebay-automation-phase2-summary.md` に分離。APIキー類は保存していない。
- 次アクション: Fayは三神さんへ、成果物21ファイルやShipping Policy/Rate Table xlsxの所在、APIキー取得タイミング、Sri Lankaの扱いを確認する。

Alf作業 T-020 Phase1監査:

- 三神さんの依頼により、eBay業務自動化 Phase1の監査・整理・見える化・テスト計画を作成した。
- 作成成果物:
  - `ebay-phase1-audit.md`: 本番GAS 12ファイル、基本6システム、強化3件、追加機能、不要候補4ファイル、危険操作、経営防御ダッシュボード用データ源を整理。
  - `ebay-phase1-system-map.md`: Mermaid図で、メール/CSV/スクショ/インボイス/領収書/外注費/在庫ログがDrive・Sheets・税理士提出・経営防御へ流れる構造を図解。
  - `ebay-phase1-test-plan.md`: 各GASの手動テスト方法、トリガー確認、期待出力、ログ確認、実行可/事前確認必須を整理。
  - `ebay-phase1-improvement-plan.md`: GASエディタで関数を探さずに運用するためのメニュー、ボタン、ログ、Webダッシュボード、月次チェックリスト案を整理。
- 実施していないこと: GAS本体変更、Google Driveファイル削除/移動、GASファイル削除、APIキー/トークン/個人情報の保存、Phase1稼働中システム変更。
- 次アクション: 本番GASエディタで12ファイル・トリガー・不要候補4ファイルの実在を読み取り確認し、テスト用サンプルを使ってよいか三神さんに確認する。

A-001 Phase1本番GAS読み取り確認:

- 2026-05-26、`alf-overnight-work-queue.md` のA-001として、Phase1本番GAS読み取り確認を開始した。
- `clasp`、`gcloud`、既存clasp認証、`appsscript.json` は確認した範囲では見つからず、Alf環境から本番GASへ認証済みで読み取りアクセスできなかった。
- 結果は `ebay-phase1-readonly-check-result.md` に保存した。
- 削除、変更、GAS関数実行、トリガー変更、Google Drive削除/移動、Script Properties値の表示/保存は行っていない。
- 次アクション: 三神さんがブラウザでGAS画面を開いて目視確認するか、`clasp` 等の読み取り用認証経路を整えてから、ファイル名・トリガー・Script Propertiesキー名だけを確認する。

A-001 ブラウザ確認追記:

- ブラウザで本番GAS URLを開いたところ、Googleログイン画面が表示された。
- 指示どおりそこで停止し、ログイン情報の要求、メールアドレス入力、GAS画面操作は行っていない。
- 本番GAS 12ファイル、不要候補4ファイル、トリガー、Script Propertiesキー名、ダッシュボード/メニューは引き続き未確認。
- 次アクションは、三神さんがログイン済みブラウザで目視確認するか、Alf用の読み取り専用認証経路を整えること。

A-001 ログイン後ブラウザ読み取り確認完了:

- 三神さんログイン後、Codex in-app browserで本番GAS編集画面、トリガー画面、関連スプレッドシートを読み取り確認した。
- 本番GAS 12ファイルと不要候補4ファイルはすべて実在確認済み。`appsscript.json` も確認済み。
- トリガー一覧では、`saveInvoicesFromGmail_v3`、`processReceiptEmails`、`processPurchaseEmails` 2件、`processScreenshots`、`runAutoSorterWithRename`、`tallyMonthlyRewards`、`checkInvoicesAndAlert`、`checkTaxDocuments`、想定外の `runInvoiceBridge` を確認。`collectTaxDocuments` と `collectEbayInvoices` は一覧上では見つからず。
- トリガー詳細時刻は一覧上に表示されず、編集画面を開く必要があるため未確認。誤操作回避のため編集画面は開いていない。
- Script Propertiesは値露出リスクがあるため未確認。キー名も保存していない。
- スプレッドシート側は、正本上のIDを開いたところ表示タイトルが `税理士提出チェックリスト`。カスタムらしき `プロジェクト管理` / `在庫管理` とタブ `更新と管理` を確認。シート内データは読んでいない。
- 削除、変更、GAS関数実行、トリガー追加/削除/変更、Google Drive削除/移動、Script Properties値保存は行っていない。
- 次アクション: `runInvoiceBridge` は不要候補側でも実トリガーありのため削除不可・要確認に引き上げる。`collectTaxDocuments` / `collectEbayInvoices` は別プロジェクト、手動メニュー、または未設定の可能性を確認する。

A-001 追加確認:

- `runInvoiceBridge` は `auto_invoice_bridge.gs` の関数。`01_請求書メール` から `04_税理士提出用/00_投げ込み用` へ添付ファイルをコピーする中継処理で、二重コピー防止の処理済み記録を持つ。
- `runInvoiceBridge` の本番トリガー詳細は、時間主導型 / 日付ベースのタイマー / 午前4時-5時。ファイル内コメントの「8:30」想定とはズレがある。
- `collectTaxDocuments` / `collectEbayInvoices` は本番GAS全ファイルの関数選択リスト上では見つからず、トリガー一覧にも存在しない。旧設計名または別関数へ置換済みの可能性が高い。
- 現役候補は、税理士提出書類側が `checkTaxDocuments` 系、eBay書類側が `findAndOrganizeEbayDocs` / `processEbayDocuments` 系。ただし同一役割かは未確定。
- 削除、変更、保存、GAS関数実行、トリガー保存、Script Properties確認は行っていない。

Phase1 フォルダ地図作成:

- 三神さん依頼により、Google Drive内のPhase1関連フォルダを読み取り確認し、`ebay-phase1-folder-map.md` を作成した。
- 確認した主な場所は `01_請求書メール`、`03_eBayインボイス`、`04_税理士提出用`、`04_税理士提出用/00_投げ込み用`、`00_要確認`、`00_重複確認`、直近月フォルダ。
- `00_要確認` に見える範囲で50件の未分類ファイルがあり、請求書、領収書、FedEx系、配送/通関系、CSV/Excel/画像/ZIPが混在している。個別の個人名・請求書番号・メールアドレスは文書に保存していない。
- `01_請求書メール` では `2026` と `2026年` のような年フォルダ表記違いがあり、`2026年` は空、`2026` 側に実ファイルがあるように見える。自動保存先の表記ズレ候補。
- `04_税理士提出用` と `03_eBayインボイス` は年フォルダと月フォルダが混在。年フォルダが空で、月フォルダ直置きが実運用になっている可能性あり。
- `01_請求書メール/2026` にメール装飾画像らしきものが混在。保存対象除外ルールの改善候補。
- Google Drive内の削除、移動、リネーム、ファイル本文閲覧、GAS実行、コード変更、トリガー変更は行っていない。
- 次アクション: `00_要確認` をファイル名ベースでカテゴリ分けし、移動予定リストだけを作る。実移動は三神さん確認後。

Phase1 `00_要確認` 分類:

- `04_税理士提出用/00_要確認` の見える範囲50件をファイル名ベースで分類し、`ebay-phase1-needs-review-triage.md` を作成した。
- 主な内訳は、FedEx請求書14件、サブスク/サービス系請求書・領収書14件、配送/通関/納品ラベル系5件、CSV/Excelの配送・返送・フルフィルメント系6件、振込明細3件、Refund/CreditNote 1件、画像ノイズ候補1件、ZIP 1件、その他5件。
- 年月別では2022年16件、2024年31件、2025年1件、2026年2件。古い未分類が多い。
- スクリーンショット読み取りスクリプトは `screenshot_data_extractor.gs` として存在。`extractAllScreenshots`、`extractMercariSales`、`extractMercard`、`extractAmazonPayments` などを確認。JREバンクは正本上OCR精度問題でスキップ状態。
- Google Drive内の削除、移動、リネーム、ファイル本文閲覧、GAS実行、コード変更、トリガー変更は行っていない。
- 次アクション: マスク済みの移動予定リストを作る。実移動は三神さん確認後。

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
