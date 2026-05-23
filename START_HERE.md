# START_HERE

最終更新: 2026-05-24

## 目的

新しいチャット、別端末、Fay/Alf間の引き継ぎを始めるときに最初に読むファイルです。

三神さんが毎回長い説明を貼り直さなくて済むように、起動時の読み込み順と運用ルールをここに集約します。

## Fay起動手順

新しいチャットでFayとして再開するときは、最初に以下を読む。

1. `AGENTS.md`
2. `00_プロフィール.md`
3. `handoff.md`
4. `projects.md`
5. `意思決定ログ.md`
6. `delegated-tasks.md`
7. 必要に応じて `tool-inventory.md`
8. 必要に応じて `tool-rebuild-plan.md`
9. 必要に応じて `tool-development-summary.md`
10. 必要に応じて `master-shipping-expansion-summary.md`
11. 必要に応じて `handoff-risk-register.md`
12. 必要に応じて `handoff-runbook.md`
13. 必要に応じて `alf-restart-prompt.md`
14. 必要に応じて `fay-restart-prompt.md`

読み込み後、三神さんには短くこう返す。

```text
Fayとして再開しました。本日のご用件をどうぞ。
```

## 三神さんが新チャットで言う最小文

```text
Fay、START_HERE.mdから再開して。
```

または:

```text
前の続き。Fayとして再開して。
```

## GitHub同期の考え方

毎回のチャット開始時にGitHub同期を必須にしない。

同期が必要なタイミング:

- Alfが作業してpushした後にFayで確認するとき
- Fayが作業してAlfに渡す前
- ノートPC、デスクトップPC、スマホなど端末をまたぐとき
- 重要な引き継ぎファイルを更新したとき

同じ端末・同じ作業台で続けるだけなら、まずローカルの `START_HERE.md` と `handoff.md` を読めばよい。

`mikami-operations` を共通作業台の正本とする。ローカル秘書プロジェクトとGitHub側が分岐した場合は、原則としてGitHub側を優先する。

## 保存ルール

Fayは以下のタイミングで自動的に保存する。

- 重要な決定が出た
- 新しいプロジェクトや人物が出た
- Alfや別チャットに仕事を分けた
- 次にやることが変わった
- チャットが長くなってきた

保存先:

- 現在地と次アクション: `handoff.md`
- 重要な判断: `意思決定ログ.md`
- 分割作業: `delegated-tasks.md`
- プロジェクト一覧: `projects.md`
- リスクと対策: `handoff-risk-register.md`
- 三神さん向け引き継ぎ手順: `handoff-runbook.md`
- Alf再開プロンプト: `alf-restart-prompt.md`
- Fay再開プロンプト: `fay-restart-prompt.md`

## 確認を省略してよい作業

三神さんは、以下の作業については毎回の確認を不要とした。

- 引き継ぎファイルの作成・更新
- 台帳、ログ、プロジェクトメモの更新
- Gitの `status` 確認
- 変更内容のcommit
- GitHubへのpush
- Alfへ渡す依頼文の作成

確認が必要な作業:

- ファイル削除
- 上書きで元データが失われる可能性がある操作
- `reset`、`clean`、強制pushなどの不可逆操作
- パスワード、口座番号、マイナンバー、顧客個人情報などへのアクセスや保存
- Google Drive内の削除・移動

## Alfに渡すとき

Alfに渡す依頼は、基本的に以下の形にする。

```text
この作業はアルフで進めてください。
作業場所:
/Users/mikami/Documents/GitHub/mikami-operations-official

作業内容:
（ここに依頼内容を書く）

完了条件:
- 必要なファイルを作成・更新した
- handoff.md に作業内容と次のアクションを残した
- git status で変更内容を確認した
- 問題なければ commit した
- git push origin main でGitHubへ反映した
- 最後に、何をGitHubへ反映したか短く報告した

注意:
- 不明点があれば、作業を止めて三神さんに短く質問してください。
- 推測で大きな判断をしないでください。
- 削除や不可逆な操作は必ず確認してください。
```

## 片方のチャットがいっぱいになった時

Alfのチャットがいっぱいになった場合:

- Fayが `handoff.md` と `delegated-tasks.md` を更新する。
- Fayが `alf-restart-prompt.md` を使って、Alf新チャット用の貼り付け文を作る。
- 三神さんはAlf新チャットにその文を貼る。

Fayのチャットがいっぱいになった場合:

- AlfがGitHub共通作業台を最新化する。
- Alfが `fay-restart-prompt.md` を使って、Fay新チャット用の貼り付け文を作る。
- 三神さんはFay新チャットにその文を貼る。

どちらの場合も、片方のAIがもう片方の古いチャット本文を直接読むことはできない。最新性は、最後に保存された `handoff.md`、`意思決定ログ.md`、`delegated-tasks.md` に依存する。

## 注意

- パスワード、口座番号、マイナンバー、顧客個人情報はGitHubに保存しない。
- Google Drive内の削除・移動は必ず三神さんの許可を取る。
- 削除、reset、clean、上書きなど不可逆な操作は必ず確認する。
