# handoff

## 現在の目的

スマホ・ノートPC・デスクトップPC・Codex・Claude間で、作業内容を迷子にせず引き継げる状態を作る。

## 現在の状態

- GitHubリポジトリ `mikami-operations` を作成済み
- まずは無料プラン・Privateリポジトリで運用開始
- Google Driveは資料保管、GitHubは作業ログと引き継ぎ台帳として使う
- ノートPCにGitHub Desktopを導入し、`mikami-operations` をクローン済み
- ローカル保存先: `/Users/tomoya/Documents/GitHub/mikami-operations`

## 次にやること

- デスクトップPC側のCodexで `desktop-codex-prompt.md` を読み込ませる
- デスクトップPC側Codexに、作業完了後の `commit` と `push` まで任せる運用をテストする
- ノートPC側では、作業前にGitHub Desktopで `Fetch origin` → 必要なら `Pull origin` を実行して成果物を受け取る
- Codexモバイル連携、またはChrome Remote DesktopでスマホからデスクトップPCへ指示する方法を設定する

## 注意点

- 口座番号、パスワード、マイナンバー、顧客個人情報などはGitHubに入れない
- Google Drive内の削除・移動は必ず三神さんの許可を取る
- 出張中にデスクトップPCへ作業させるには、デスクトップPC側Codexが `git commit` と `git push` まで実行できる状態にする必要がある
