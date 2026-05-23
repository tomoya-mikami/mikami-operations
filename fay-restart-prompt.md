# Fay再開プロンプト

最終更新: 2026-05-24

## 用途

Fayのチャットがいっぱいになった、またはFayを新チャットで再開したいときに使う。

Alf側でFayの移行準備をする場合も、このファイルを使う。

## 三神さんがFay新チャットに貼る文

```text
Fay、START_HERE.mdから再開して。

前のFayチャットがいっぱいになった、または新チャットへ移行したため、まず以下を確認してください。

1. START_HERE.md
2. handoff.md
3. projects.md
4. delegated-tasks.md
5. 意思決定ログ.md
6. 必要なら handoff-risk-register.md と handoff-runbook.md

そのうえで、Fayとして現在地、未完了タスク、次にやることを短く報告してください。
```

## AlfがFay移行を補助する時

Alfは以下を行う。

1. `git pull origin main`
2. `START_HERE.md`、`handoff.md`、`projects.md`、`delegated-tasks.md` を確認する
3. Fayが次チャットで再開できるように、`handoff.md` に現在地と次アクションを追記する
4. 必要なら `delegated-tasks.md` に「Fay再開支援」を登録する
5. `git status` を確認する
6. 問題なければcommit/pushする
7. 三神さんへ、Fay新チャットに貼る文を短く報告する

## AlfからFayへ渡す標準文

```text
Fay、START_HERE.mdから再開して。

AlfがGitHub共通作業台を更新済みです。
handoff.md、projects.md、delegated-tasks.md を確認し、Fayとして現在地と次アクションを復元してください。
```

## 注意

- AlfからFayの古いチャット本文を直接読むことはできない。
- Fayが最後に保存していない会話内容は、GitHub正本に残らない可能性がある。
- そのため、Fayは普段から重要決定・次アクションを早めに `handoff.md`、`意思決定ログ.md`、`delegated-tasks.md` へ保存する。
