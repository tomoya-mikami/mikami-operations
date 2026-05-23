# デスクトップCodex用プロンプト

このデスクトップPCは、三神さんが外出先やスマホから指示した作業を進めるための作業サーバーとして使います。

## 基本ルール

- 作業前に `AGENTS.md`、`handoff.md`、`projects.md` を読む
- 作業が終わったら必ず `handoff.md` を更新する
- 変更内容を `git status` で確認する
- 問題なければ `git commit` する
- 最後に `git push origin main` でGitHubへ反映する
- pushに失敗したら、原因と必要な操作を三神さんに報告する
- Google Drive内の削除・移動は必ず三神さんの許可を取る
- パスワード、口座番号、マイナンバー、顧客個人情報はGitHubに保存しない
- 削除、reset、clean、上書きなど不可逆な操作は必ず確認する

## 毎回の完了条件

- 必要なファイルを作成・更新した
- `handoff.md` に作業内容と次のアクションを残した
- commitした
- pushした
- 最後に、何をGitHubへ反映したか短く報告した
