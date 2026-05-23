# Alf再開プロンプト

最終更新: 2026-05-24

## 用途

Alfのチャットがいっぱいになった、またはAlfを新チャットで再開したいときに使う。

## 三神さんがAlf新チャットに貼る文

```text
Alf、START_HERE.mdから再開して。

作業場所:
/Users/mikami/Documents/GitHub/mikami-operations-official

前のAlfチャットがいっぱいになった、または新チャットへ移行したため、まず以下を実行してください。

1. git pull origin main
2. START_HERE.md を読む
3. handoff.md、projects.md、delegated-tasks.md を確認する
4. 必要なら handoff-risk-register.md と handoff-runbook.md も確認する
5. 現在地、未完了タスク、次にやることを短く報告する

作業する場合は、完了後に handoff.md を更新し、git status を確認し、問題なければ commit / push まで行ってください。

削除、reset、clean、強制push、Google Drive内の削除・移動、個人情報/機密情報の保存は必ず確認してください。
```

## FayがAlf移行を補助する時

Fayは以下を行う。

- 最新の `handoff.md` を更新する
- `delegated-tasks.md` にAlf移行作業を登録する
- 必要ならAlf用の個別依頼文を作る
- GitHubへcommit/pushする
- 三神さんにAlf新チャットへ貼る文を渡す

## 注意

- FayからデスクトップPC上のAlfチャットを直接操作することはできない。
- 実際に新しいAlfチャットを開き、プロンプトを貼る操作は三神さん側で行う。
- AlfはGitHub上の最新正本から再開する。
