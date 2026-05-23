# handoff

## 現在の目的

スマホ・ノートPC・デスクトップPC・Codex・Claude間で、作業内容を迷子にせず引き継げる状態を作る。

## 現在の状態

- GitHubリポジトリ `mikami-operations` を作成済み
- まずは無料プラン・Privateリポジトリで運用開始
- Google Driveは資料保管、GitHubは作業ログと引き継ぎ台帳として使う
- 今後はこのリポジトリを、ノートPC・デスクトップPC・スマホ・Codex・Claude間の共通作業台として使う
- デスクトップPC正式作業台は `/Users/mikami/Documents/GitHub/mikami-operations-official`
- 三神さんが「アルフでやって」「Alfで進めて」と言った場合は、デスクトップPC側Codexがこの正式作業台で作業する
- 2026-05-23: GitHub CLI認証後、Codexから `git push origin main` が成功。以後、アルフ運用でcommit/pushまで実行可能
- ノートPCにGitHub Desktopを導入し、`mikami-operations` をクローン済み
- ローカル保存先: `/Users/tomoya/Documents/GitHub/mikami-operations`
- 端末ニックネームを設定
  - デスクトップPC: Alf / アルフ / Alfred / アルフレッド
  - ノートPC: Fay / フェイ / Friday
- Alfでは作業後に `handoff.md` 更新、commit、可能ならpushまで行う運用を標準化
- 三神さんは基本的にFayへ依頼する。Fayが内容を見て、長時間作業・重いファイル作業・調査・commit/pushが必要な場合は、Alfに依頼することを提案する
- Fayは秘書チャットを司令塔として使う。大きな仕事は必要に応じてAlfや専用スレッド/エージェントに分け、結果・決定・次アクションだけを `handoff.md` やプロジェクトファイルへ集約する

## 次にやること

- デスクトップPC側のCodexで `desktop-codex-prompt.md` を読み込ませる
- デスクトップPC側Codexに、作業完了後の `commit` と `push` まで任せる運用をテストする
- ノートPC側では、作業前にGitHub Desktopで `Fetch origin` → 必要なら `Pull origin` を実行して成果物を受け取る
- Codexモバイル連携、またはChrome Remote DesktopでスマホからデスクトップPCへ指示する方法を設定する

## 注意点

- 口座番号、パスワード、マイナンバー、顧客個人情報などはGitHubに入れない
- Google Drive内の削除・移動は必ず三神さんの許可を取る
- 出張中にデスクトップPCへ作業させるには、デスクトップPC側Codexが `git commit` と `git push` まで実行できる状態にする必要がある
